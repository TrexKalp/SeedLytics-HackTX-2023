// src/components/Predictor.tsx
import React, { useState } from "react";
import axios from "axios";

const Predictor: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handlePredictClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await axios.post(
          "http://127.0.0.1:5000/api/predict",
          formData
        );
        setPrediction(response.data.predicted_class);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handlePredictClick}>Predict</button>
      {prediction && <div>Predicted Class: {prediction}</div>}
    </div>
  );
};

export default Predictor;
