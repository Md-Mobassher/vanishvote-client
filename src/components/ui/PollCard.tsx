"use client";
import { Poll } from "@/types";
import { FC } from "react";

const PollCard: FC<Poll> = ({
  question,
  expiresAt,
  reactions,
  options,
  comments,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all">
      {/* Question */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {question}
      </h3>

      {/* Expiry Time */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
        ⏳ Expires in: {expiresAt}
      </p>

      {/* Options */}
      <div className="md:mt-8 mt-5 space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            // onClick={() => onVote(option.choice)}
            className="w-full flex justify-between items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg transition hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
          >
            <span className="text-gray-900 dark:text-gray-200">
              {option.choice}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {option.votes} votes
            </span>
          </button>
        ))}
      </div>

      {/* Reactions */}
      <div className="flex items-center justify-between md:mt-8 mt-5">
        <div className="flex space-x-3 text-gray-600 dark:text-gray-300 gap-5">
          <p className="flex items-end text-3xl hover:cursor-pointer">
            🔥 <span className="text-lg ml-1">{reactions.fire}</span>
          </p>
          <p className="flex items-end text-3xl  hover:cursor-pointer">
            👍 <span className="text-lg ml-1">{reactions.like}</span>
          </p>
        </div>
        <div className="flex space-x-3 text-gray-600 dark:text-gray-300 gap-5">
          <p className="flex items-end text-lg hover:cursor-pointer">
            Comments<span className="text-lg ml-3">{comments.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PollCard;
