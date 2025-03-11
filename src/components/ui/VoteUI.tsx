import { useState } from "react";

interface VoteUIProps {
  question: string;
  options: { choice: string; votes: number }[];
  onVote: (choice: string) => void;
}

const VoteUI: React.FC<VoteUIProps> = ({ question, options, onVote }) => {
  const [selectedOption, setSelectedOption] = useState("");

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {question}
      </h2>

      <div className="space-y-3 mt-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedOption(option.choice)}
            className={`w-full py-2 px-4 border rounded-md text-left ${
              selectedOption === option.choice
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {option.choice}
          </button>
        ))}
      </div>

      <button
        onClick={() => onVote(selectedOption)}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={!selectedOption}
      >
        Submit Vote
      </button>
    </div>
  );
};

export default VoteUI;
