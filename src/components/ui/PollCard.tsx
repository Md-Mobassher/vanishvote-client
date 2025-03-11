"use client";
import { Poll } from "@/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { FC, useState } from "react";
import Swal from "sweetalert2";

const PollCard: FC<Poll> = ({
  _id,
  question,
  expiresAt,
  reactions,
  options,
  comments,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // API URL
  const API_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/polls`;

  // Handle Delete
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this poll!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API_URL}/${_id}`, { method: "DELETE" });
          const data = await res.json();

          if (res.ok) {
            Swal.fire("Deleted!", data.message, "success");
            window.location.reload();
          } else {
            Swal.fire(
              "Error!",
              data.message || "Failed to delete poll.",
              "error"
            );
          }
        } catch (error) {
          console.log(error);
          Swal.fire("Error!", "Something went wrong!", "error");
        }
      }
    });
  };

  // Handle Share
  const handleShare = () => {
    const pollLink = `https://vanishvote-frontend-tau.vercel.app/polls/${_id}`;
    navigator.clipboard.writeText(pollLink);
    Swal.fire("Copied!", "Poll link copied to clipboard.", "success");
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all relative">
      {/* Question */}
      <div className="flex justify-between items-start gap-5">
        <Link href={`/polls/${_id}`}>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {question}
          </h3>
        </Link>

        {/* Ellipsis Button */}
        <div className="relative">
          <button
            className="hover:bg-gray-500 rounded-full p-2 hover:cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Ellipsis />
          </button>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-600 shadow-md rounded-lg z-10 border border-gray-500">
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-600 dark:hover:bg-gray-800 rounded-lg hover:cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={handleShare}
                className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100 dark:hover:bg-gray-800 hover:cursor-pointer rounded-lg"
              >
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Expiry Time */}
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
        ⏳ Expires in: {expiresAt}
      </p>

      {/* Options */}
      <div className="md:mt-8 mt-5 space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
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
          <p className="flex items-end text-3xl hover:cursor-pointer">
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
