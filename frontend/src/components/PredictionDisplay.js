import React from "react";
import "./PredictionDisplay.css";

const PredictionDisplay = ({ prediction, confidenceScores }) => {
  // Format confidence scores as percentages
  const formatConfidence = (score) => {
    return (score * 100).toFixed(2) + "%";
  };

  return (
    <div className="prediction-display">
      <div className="prediction-result">
        <h2>Prediction Result</h2>
        <div className="predicted-digit">{prediction}</div>
        <p className="confidence-text">
          Confidence: {formatConfidence(confidenceScores[prediction])}
        </p>
      </div>

      <div className="confidence-scores">
        <h3>Confidence Scores</h3>
        <div className="scores-container">
          {confidenceScores.map((score, index) => (
            <div
              key={index}
              className={`score-bar ${
                index === prediction ? "highlighted" : ""
              }`}
            >
              <div className="digit-label">{index}</div>
              <div className="bar-container">
                <div className="bar" style={{ width: `${score * 100}%` }}></div>
              </div>
              <div className="score-value">{formatConfidence(score)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionDisplay;
