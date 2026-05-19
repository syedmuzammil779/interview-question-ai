const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: "bg-green-100 text-green-700 border border-green-200",
  Medium: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Hard: "bg-red-100 text-red-700 border border-red-200",
};

interface QuestionCardProps {
  index: number;
  question: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const QuestionCard = (prop: QuestionCardProps) => {
  const { index, question, difficulty } = prop;
  return (
    <div className="bg-white border border-gray-200 rounded-sm p-5 flex gap-4">
      <span className="text-2xl font-bold text-gray-200 leading-none select-none w-8 shrink-0">
        {String(index).padStart(2, "0")}
      </span>
      <div className="flex flex-col gap-3 min-w-0">
        <p className="text-sm font-medium text-gray-800 leading-relaxed">
          {question}
        </p>
        <span
          className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide ${DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.Medium}`}
        >
          {difficulty}
        </span>
      </div>
    </div>
  );
};

export default QuestionCard;
