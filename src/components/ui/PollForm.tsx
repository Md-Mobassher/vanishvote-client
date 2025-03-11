import { useState } from "react";

const PollForm = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [expiresAt, setExpiresAt] = useState("1h");
  const [hideResults, setHideResults] = useState(false);

  const addOption = () => setOptions([...options, ""]);
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ question, options, expiresAt, hideResults });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Create a Poll
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
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default PollForm;
