import React, { useEffect, useState } from "react";
import "./Snowflakes.css";

const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    // Create 50 snowflakes
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 10 + Math.random() * 20, // 10-30 seconds
      animationDelay: Math.random() * 5,
      opacity: 0.3 + Math.random() * 0.7, // 0.3-1.0
      size: 5 + Math.random() * 10, // 5-15px
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="snowflakes-container">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${flake.animationDelay}s`,
            opacity: flake.opacity,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Snowflakes;
