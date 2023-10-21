import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResultsPage = () => {
  const [results, setResults] = useState<string[]>([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/search?q=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("There was an error fetching the search results:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div>
      <h1>Results for "{query}"</h1>
      <ul>
        {results.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage;
