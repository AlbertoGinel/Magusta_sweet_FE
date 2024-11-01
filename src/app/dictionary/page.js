"use client"; // Add this line to indicate it's a Client Component

import { useEffect, useState } from "react";
import { isNotFoundError } from "next/dist/client/components/not-found";
import { format } from "date-fns"; // Import format function from date-fns

export default function Dictionary() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/api/words", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (isNotFoundError(response)) {
            throw new Error("Not Found");
          }
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        // Sort the data by "lastApperance" with the oldest first
        const sortedData = data.sort((a, b) => {
          const dateA = new Date(a.lastApperance);
          const dateB = new Date(b.lastApperance);
          return dateA - dateB;
        });

        setData(sortedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Dictionary</h1>
      <ul>
        {data && data.length > 0 ? (
          data.map((word) => (
            <li key={word.id}>
              <strong>{word.idString}</strong> ({word.english}) - Type:{" "}
              {word.type} - {formatDate(word.lastApperance)}
            </li>
          ))
        ) : (
          <p>No words found.</p>
        )}
      </ul>
    </div>
  );
}

// Helper function to format the date using date-fns
function formatDate(dateString) {
  return format(new Date(dateString), "dd/MM/yy HH:mm"); // Format: 20/08/24 12:00
}
