"use client";
import { useState } from "react";
import LoginForm from "@/components/login-form";
import { SkeletonLoader } from "@/components/skeleton";
import QuestionCard from "@/components/question-card";
import Header from "@/components/header";

type FormData = { jobTitle: string; seniority: string; category: string };
type ItemType = { question: string; difficulty: "Easy" | "Medium" | "Hard" };

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [lastFormData, setLastFormData] = useState<FormData | null>(null);

  const handleGenerate = async (data: FormData) => {
    setLastFormData(data);

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate-response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      setResult(json);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Error generating dataset";
      setResult({ success: false, message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <aside className="w-full md:w-135 lg:shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 lg:h-screen lg:sticky lg:top-0 flex flex-col p-6 lg:p-10 bg-white overflow-y-auto">
        <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">
          LLM API resources
        </h2>
        <LoginForm isLoading={isLoading} onGenerate={handleGenerate} />
      </aside>
      <main className="flex-1 bg-gray-100 min-w-0 p-6 lg:p-10">
        {isLoading ? (
          <div>
            <Header isLoading />
            <SkeletonLoader />
          </div>
        ) : result && result.success ? (
          <div>
            <Header
              isLoading={isLoading}
              onRegenerate={
                lastFormData ? () => handleGenerate(lastFormData) : undefined
              }
            />
            <div className="flex flex-col gap-3">
              {result.data.map((item: ItemType, i: number) => {
                return (
                  <QuestionCard
                    key={item.question}
                    index={i + 1}
                    question={item.question}
                    difficulty={item.difficulty}
                  />
                );
              })}
            </div>
          </div>
        ) : result && !result.success ? (
          <div className="bg-red-50 border border-red-200 p-6 rounded-sm">
            <p className="text-red-600 font-medium">{result.message}</p>
          </div>
        ) : (
          <h2 className="text-xl text-gray-600">
            Select options and click "Generate Dataset" to see results
          </h2>
        )}
      </main>
    </div>
  );
};

export default HomePage;
