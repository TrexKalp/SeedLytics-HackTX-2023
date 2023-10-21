import React, { useEffect, useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Make an HTTP request to the Flask API
    axios.get("/api/hello")
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="App">
      
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
