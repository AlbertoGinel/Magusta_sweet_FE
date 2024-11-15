"use client"; // Indicate it's a Client Component

import React, { useEffect, useState } from "react";
import useAuthStore from "../_lib/stores/authStore"; // Import the auth store to get the token

export default function Dictionary() {
  const [words, setWords] = useState([]);
  const { token } = useAuthStore((state) => state); // Access the token from the Zustand store

  useEffect(() => {
    // Fetch the words when the component mounts
    const fetchWords = async () => {
      if (!token) {
        console.error("No token available for authentication");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:8080/api/words/allPersonalWordsbyID",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the Bearer token in the headers
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }

        const data = await response.json();

        // Sort the words by lastAppearance (newest first)
        const sortedWords = data.sort(
          (a, b) => new Date(b.lastAppearance) - new Date(a.lastAppearance)
        );

        setWords(sortedWords); // Set the sorted words in the state
      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    fetchWords();
  }, [token]); // Only re-run the effect if the token changes

  return (
    <div>
      <h1>Dictionary</h1>
      {words.length === 0 ? (
        <p>No words found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Last Appearance</th>
              <th>Estonian</th>
              <th>Halo</th>
              <th>Level</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id}>
                <td>{new Date(word.lastAppearance).toLocaleDateString()}</td>
                <td>{word.estonian}</td>
                <td>{word.halo}</td>
                <td>{word.level}</td>
                <td>{word.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
