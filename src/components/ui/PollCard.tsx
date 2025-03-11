import { FC } from "react";

interface PollCardProps {
  question: string;
  expiresAt: string;
  reactions: { fire: number; like: number };
  onVote: () => void;
}

const PollCard: FC<PollCardProps> = ({
  question,
  expiresAt,
  reactions,
  onVote,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-5 hover:shadow-xl transition">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        {question}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Expires in: {expiresAt}
      </p>

      {/* Reactions */}
      <div className="flex items-center justify-between mt-3">
        <button
          onClick={onVote}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Vote Now
        </button>
        <div className="flex space-x-4">
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            🔥 {reactions.fire}
          </span>
          <span className="flex items-center text-gray-600 dark:text-gray-300">
            👍 {reactions.like}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
