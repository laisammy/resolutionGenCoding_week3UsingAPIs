import { useState } from "react";
import SearchBar from "./components/SearchBar";

export default function App() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    const fetchWord = async (word) => {
        setError("");
        setData(null);

        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            if (!res.ok) throw new Error("Word not found");
            const json = await res.json();
            setData(json[0]);
        } catch (err) {
        setError(err.message);
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-center mb-8">Dictionary</h1>
            <SearchBar onSearch={fetchWord} />
            {error && <p className="text-center text-red-500 mt-6">{error}</p>}
            {data && <WordResult data={data} />}
        </div>
    );
}

