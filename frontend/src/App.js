import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import DrawingCanvas from "./components/DrawingCanvas";
import PredictionDisplay from "./components/PredictionDisplay";
import axios from "axios";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [confidenceScores, setConfidenceScores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const handleClearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      setPrediction(null);
      setConfidenceScores([]);
      setError(null);
    }
  };

  const handlePredict = async (imageData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/predict", {
        image: imageData,
      });

      setPrediction(response.data.predicted_digit);
      setConfidenceScores(response.data.confidence_scores);
    } catch (err) {
      console.error("Error predicting digit:", err);
      setError("Failed to get prediction. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Handwritten Digit Recognition</h1>
        <p>Draw a digit (0-9) in the canvas below</p>
      </header>

      <main className="App-main">
        <div className="canvas-container">
          <DrawingCanvas ref={canvasRef} onPredict={handlePredict} />
          <div className="canvas-controls">
            <button onClick={handleClearCanvas} className="clear-button">
              Clear Canvas
            </button>
            <button
              onClick={() =>
                canvasRef.current && canvasRef.current.getImageData()
              }
              className="predict-button"
              disabled={isLoading}
            >
              {isLoading ? "Predicting..." : "Predict"}
            </button>
          </div>
        </div>

        <div className="prediction-container">
          {error && <div className="error-message">{error}</div>}
          {prediction !== null && (
            <PredictionDisplay
              prediction={prediction}
              confidenceScores={confidenceScores}
            />
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Powered by TensorFlow and React</p>
      </footer>
    </div>
  );
}

export default App;
