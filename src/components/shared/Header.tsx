"use client";
import Link from "next/link";
import { ThemeToggleButton } from "../common/ThemeToggleButton";

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4 px-6 ">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-800 dark:text-white"
        >
          VanishVote
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/create-poll"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            Create Poll
          </Link>
          <Link
            href="/polls"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            View Polls
          </Link>
        </nav>
        <ThemeToggleButton />
      </div>
    </header>
  );
};

export default Header;
