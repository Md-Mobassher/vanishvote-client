import { FC } from "react";

interface ResultsUIProps {
  question: string;
  options: { choice: string; votes: number }[];
}

const ResultsUI: FC<ResultsUIProps> = ({ question, options }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {question}
      </h2>

      <div className="space-y-3 mt-4">
        {options.map((option, index) => (
          <div
            key={index}
            className="w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden"
          >
            <div
              className="bg-blue-500 text-white text-center text-sm py-1"
              style={{ width: `${option.votes}%` }}
            >
              {option.choice} - {option.votes} Votes
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsUI;
