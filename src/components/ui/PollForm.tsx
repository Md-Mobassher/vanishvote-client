"use client";
import { useState } from "react";
import Swal from "sweetalert2";

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [expiresAt, setExpiresAt] = useState("1h");
  const [hideResults, setHideResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pollLink, setPollLink] = useState("");

  const addOption = () => setOptions([...options, ""]);

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim() || options.some((opt) => !opt.trim())) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Question and all options are required.",
      });
      return;
    }

    setLoading(true);
    setPollLink("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/polls`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
            options: options.map((opt) => ({ choice: opt, votes: 0 })),
            expiresAt,
            hideResults,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Swal.fire(
          "Created!",
          data.message || "Poll created successfully!",
          "success"
        );
        setPollLink(data.link);
        setQuestion("");
        setOptions([""]);
        setExpiresAt("1h");
        setHideResults(false);
      } else {
        Swal.fire("Error!", data.message || "Failed to create poll.", "error");
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error!", "An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (pollLink) {
      navigator.clipboard.writeText(pollLink);
      Swal.fire("Copied!", "Poll link copied to clipboard.", "success");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-5xl mx-auto ">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Create A Poll
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Poll Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />

        {/* Options */}
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />
        ))}

        <button type="button" onClick={addOption} className="text-blue-500">
          + Add Option
        </button>

        {/* Expiry Time & Hide Results */}
        <select
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="1h">1 Hour</option>
          <option value="12h">12 Hours</option>
          <option value="24h">24 Hours</option>
        </select>

        <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={hideResults}
            onChange={() => setHideResults(!hideResults)}
          />
          <span>Hide results until poll expires</span>
        </label>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Poll"}
        </button>
      </form>

      {/* Display Poll Link & Share Option */}
      {pollLink && (
        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Your poll is live!
          </p>
          <input
            type="text"
            value={pollLink}
            readOnly
            className="w-full mt-2 px-3 py-2 border rounded-md dark:bg-gray-600 dark:text-white"
          />
          <button
            onClick={handleCopyLink}
            className="mt-2 bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600"
          >
            Copy Poll Link
          </button>
        </div>
      )}
    </div>
  );
};

export default PollForm;
