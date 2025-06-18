import React, { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [color, setColor] = useState("red");
  const [showPurple, setShowPurple] = useState(false);
  const [isCycling, setIsCycling] = useState(false);

  const cycleColors = showPurple
    ? ["red", "green", "yellow", "purple"]
    : ["red", "green", "yellow"];

  useEffect(() => {
    let intervalId;
    if (isCycling) {
      intervalId = setInterval(() => {
        setColor(prev => {
          const index = cycleColors.indexOf(prev);
          return cycleColors[(index + 1) % cycleColors.length];
        });
      }, 500);
    }
    return () => clearInterval(intervalId);
  }, [isCycling, cycleColors]);

  return (
    <div className="traffic-light-wrapper">
      <div className="traffic-light">
        <div
          className={`light red ${color === "red" ? "glow" : ""}`}
          onClick={() => setColor("red")}
        ></div>
        <div
          className={`light yellow ${color === "yellow" ? "glow" : ""}`}
          onClick={() => setColor("yellow")}
        ></div>
        <div
          className={`light green ${color === "green" ? "glow" : ""}`}
          onClick={() => setColor("green")}
        ></div>
        {showPurple && (
          <div
            className={`light purple ${color === "purple" ? "glow" : ""}`}
            onClick={() => setColor("purple")}
          ></div>
        )}
      </div>

      <div className="traffic-controls">
        <button onClick={() => setIsCycling(!isCycling)}>
          {isCycling ? "⏹ Stop" : "🔁 Cycle"}
        </button>
        {!showPurple && (
          <button onClick={() => setShowPurple(true)}>➕ Add Purple</button>
        )}
      </div>
    </div>
  );
}
