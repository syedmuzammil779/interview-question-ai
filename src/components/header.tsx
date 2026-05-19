import { RefreshCw } from "lucide-react";

interface HeaderProps {
  onRegenerate?: () => void;
  isLoading?: boolean;
}

const Header = ({ onRegenerate, isLoading }: HeaderProps) => {
  return (
    <div className="flex items-start justify-between sticky top-0 z-10 bg-gray-100 -mt-5 py-5">
      <h2 className="text-2xl font-bold tracking-tight uppercase font-mono">
        List of Questions
      </h2>
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Regenerate
        </button>
      )}
    </div>
  );
};

export default Header;
