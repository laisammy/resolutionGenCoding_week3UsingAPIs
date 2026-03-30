import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
  };

  return (
	<div className="min-h-screen flex flex-col items-center justify-center">
		<h1 className="text-4xl font-bold mb-6">Dictionary</h1>
		<form onSubmit={handleSubmit} className="flex gap-3 w-full max-w-xl mx-auto">
		<input
			type="text"
			placeholder="Search a word..."
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
		/>
		<button
			type="submit"
			className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition"
		>
			Search
		</button>
		</form>
	</div>
  );
}