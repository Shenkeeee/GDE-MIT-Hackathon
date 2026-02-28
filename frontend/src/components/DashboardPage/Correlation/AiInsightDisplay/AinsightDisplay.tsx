import { useState, useEffect } from "react";

const AiInsightDisplay = ({ aiInsight }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (!aiInsight) {
      setDisplayText("");
      return;
    }

    let index = 0;
    setDisplayText(""); // reset for new text

    const interval = setInterval(
      () => {
        if (index >= aiInsight.length) {
          clearInterval(interval);
          return;
        }

        setDisplayText((prev) => prev + aiInsight.charAt(index));
        index++;
      },
      5 + Math.random() * 5,
    ); // ~5–10ms per char

    return () => clearInterval(interval);
  }, [aiInsight]);

  return (
    <p className="leading-relaxed text-sm whitespace-pre-wrap text-[#0f3d2e]">
      {displayText || "Analyzing food and symptom patterns..."}
    </p>
  );
};

export default AiInsightDisplay;
