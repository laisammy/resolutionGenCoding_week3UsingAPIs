import { useState, useEffect } from "react";

export default function WordResult({ data }) {
    const { word, phonetics, meanings } = data;

    const audio = phonetics?.find(p => p.audio)?.audio;

    const [gifUrl, setGifUrl] = useState("");

    useEffect(() => {
        async function fetchGif() {
        const apiKey = import.meta.env.VITE_GIPHY_KEY;
        const query = word;
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&limit=1`;

        try {
            const response = await fetch(url);
            const json = await response.json();

            if (json.data.length > 0) {
            setGifUrl(json.data[0].images.original.url);
            } else {
            setGifUrl("");
            }
        } catch (err) {
            console.error("GIF error:", err);
        }
        }

        fetchGif();
    }, [word]); 

    window.onload = function () {
    getBackground().then(function (imageUrl) {
        if (!imageUrl) return;

        console.log(imageUrl);

        if (background) {
        background.style["background-image"] = `url('${imageUrl}')`;
        }
    });
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between">
                <h2 className="text-4xl font-bold">{word}</h2>
                {audio && (
                <audio controls src={audio} className="h-8">
                    Your browser does not support audio.
                </audio>
                )}
            </div>

            {phonetics?.[0]?.text && (
                <p className="text-gray-500 mt-1">{phonetics[0].text}</p>
            )}

            {gifUrl && (
            <div className="mt-6 flex">
                <img src={gifUrl} alt={`${word} gif`} className="rounded-lg shadow" />
            </div>
            )}

            <div className="mt-6 space-y-6">
                {meanings.map((m, i) => (
                <div key={i}>
                    <h3 className="text-xl font-semibold capitalize">{m.partOfSpeech}</h3>
                    <ul className="list-disc ml-6 mt-2 space-y-2">
                    {m.definitions.map((d, j) => (
                        <li key={j}>
                        <p>{d.definition}</p>
                        {d.example && (
                            <p className="text-gray-500 italic mt-1">“{d.example}”</p>
                        )}
                        </li>
                    ))}
                    </ul>
                </div>
                ))}
            </div>
        </div>
    );
    }

    