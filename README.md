# AI Interview Question Generator

A Next.js web application that uses **Google Gemini AI** to generate realistic, tailored interview questions based on job title, seniority level, and question category.

---

## Features

- Generate 10 interview questions per request
- Select seniority level: Junior, Mid-Level, Senior, or Lead
- Choose from 4 question categories:
  - Technical Architecture
  - Behavioral & Leadership
  - Culture & Core Values
  - System Design
- Each question is assigned a difficulty level (Easy / Medium / Hard)
- Smart job title validation and auto-correction

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A Google Gemini API key (free — see below)

---

## Step 1 — Get Your Gemini API Key

1. Go to **[https://aistudio.google.com/app/api-keys](https://aistudio.google.com/app/api-keys)**
2. Sign in with your Google account
3. Click **"Create API key"**
4. Select an existing Google Cloud project or create a new one
5. Copy the generated API key — you will need it in the next step

> For full documentation on the Gemini API key, see: [https://ai.google.dev/gemini-api/docs/api-key](https://ai.google.dev/gemini-api/docs/api-key)

---

## Step 2 — Choose a Gemini Model

The app uses the model name you set in the `.env` file. Recommended free models:

| Model Name | Notes |
|---|---|
| `gemini-2.0-flash` | Fast, free tier, recommended |
| `gemini-1.5-flash` | Stable, free tier |
| `gemini-1.5-pro` | Higher quality, lower rate limits on free tier |

You can view available models in the [Google AI Studio](https://aistudio.google.com/) sidebar or in the [Gemini API model docs](https://ai.google.dev/gemini-api/docs/models).

---

## Step 3 — Set Up Your Environment File

In the **root of the project**, create a file named `.env`:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

Replace `your_api_key_here` with the key you copied in Step 1.

> `.env` is listed in `.gitignore` — it will **not** be committed to Git, so your key stays private.

---

## Step 4 — Install Dependencies

Open a terminal in the project root and run:

```bash
npm install
```

---

## Step 5 — Run the Development Server

```bash
npm run dev
```

The app will start at **[http://localhost:3000](http://localhost:3000)**.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server (run `build` first) |

---

## Project Structure

```
next-assessment/
├── src/
│   └── app/
│       ├── api/
│       │   └── generate-response/
│       │       └── route.ts       # Gemini API integration
│       ├── page.tsx               # Main UI
│       └── layout.tsx             # Root layout
├── .env                           # Your local env vars (create this)
├── .env.example                   # Example env file for reference
└── package.json
```

---

## Troubleshooting

**`Error: GEMINI_API_KEY is not set`**
— Make sure `.env` exists in the project root with the correct key.

**`API key not valid`**
— Double-check the key was copied correctly with no extra spaces.

**`Model not found`**
— Check the model name spelling in `.env`. Use `gemini-2.0-flash` if unsure.

**Port already in use**
— Run `npm run dev -- -p 3001` to use a different port.
