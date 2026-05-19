import { GoogleGenAI, Type } from "@google/genai";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env variable: ${name} is not defined`);
  return value;
}

const GEMINI_API_KEY = requireEnv("GEMINI_API_KEY");
const GEMINI_MODEL = requireEnv("GEMINI_MODEL");

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { jobTitle, seniority, category } = body;

    const prompt = `You are an expert technical interviewer and hiring assistant.

Your first task is to validate the job title provided.

Before validating, try to interpret the job title intelligently:
- Expand common abbreviations (e.g., "eng" → "Engineer", "dev" → "Developer", "mgr" → "Manager")
- Fix obvious typos or shorthand (e.g., "frontent" → "Frontend", "bakend" → "Backend")
- Treat partial titles as valid if the intent is clear (e.g., "frontend eng" → "Frontend Engineer")

Only return an error if the job title is completely unrecognizable, gibberish, a person's name, or random characters (e.g., "asdfgh", "John", "abc123", "hello", "idk").

If it cannot be interpreted as any real job title, return ONLY this JSON error object and nothing else:

{
  "error": true,
  "message": "The job title '${jobTitle}' is not a valid or recognized job title. Please provide a real job title like 'Frontend Developer', 'Product Manager', 'Data Scientist', etc."
}

If the job title IS valid or can be reasonably interpreted, generate exactly 10 interview questions based on the following inputs:

Job Title: ${jobTitle}
Seniority Level: ${seniority}
Question Type: ${category}

Rules:
- Tailor the questions to the provided seniority level
- Keep questions concise and practical
- Avoid duplicate or repetitive questions
- Questions should feel realistic for actual interviews
- Assign a difficulty level to each question
- Difficulty levels must only be: "Easy", "Medium", or "Hard"
- Return ONLY valid JSON
- Do not include markdown formatting or explanations

Return the response in the following format:

[
  {
    "question": "Explain the virtual DOM and how React uses it.",
    "difficulty": "Medium"
  },
  {
    "question": "How would you optimize a large-scale Next.js application?",
    "difficulty": "Hard"
  }
]`;
    const result = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            // error case
            error: { type: Type.BOOLEAN },
            message: { type: Type.STRING },
            // success case
            data: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                },
                required: ["question", "difficulty"],
              },
            },
          },
        },
      },
    });
    const data = JSON.parse(result.text ?? "{}");

    if (data?.error === true) {
      return Response.json(
        { success: false, message: data.message },
        { status: 422 },
      );
    }

    if (!Array.isArray(data?.data) || data.data.length === 0) {
      return Response.json(
        { success: false, message: "Gemini returned an unexpected response" },
        { status: 502 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Dataset generated successfully",
        data: data.data,
      },
      { status: 200 },
    );
  } catch (error: any) {
    const status = error?.status ?? 500;
    const raw = error?.message ?? "Error generating dataset";
    const match = raw.match(/"message"\s*:\s*"([^"]+)"/);
    const message = match ? match[1] : raw;

    return Response.json({ success: false, message }, { status });
  }
}
