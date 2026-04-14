"use client";

import { useEffect, useState } from "react";
import zxcvbn from "zxcvbn";

type PasswordStrengthMeterProps = {
  password: string;
  minLength?: number;
};

const PasswordStrengthMeter = ({
  password,
  minLength = 6,
}: PasswordStrengthMeterProps) => {
  const [strength, setStrength] = useState<{
    score: number;
    feedback: { suggestions: string[] };
  } | null>(null);

  useEffect(() => {
    if (password && password.length >= minLength) {
      const result = zxcvbn(password);
      setStrength(result);
    } else {
      setStrength(null);
    }
  }, [password, minLength]);

  if (!strength) return null;

  const { score, feedback } = strength;
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const label = labels[score];

  const colors = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];
  const color = colors[score];

  const widthPercentage = ((score + 1) / labels.length) * 100;

  return (
    <div className="mt-3">
      <div className="w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-in-out rounded-b-full"
          style={{ width: `${widthPercentage}%`, backgroundColor: color }}
        />
      </div>
      <div className="text-sm font-semibold mt-2" style={{ color }}>
        Password Strength: {label}
      </div>
      {feedback && feedback.suggestions.length > 0 && (
        <ul className="text-xs text-gray-600 mt-1 list-disc list-inside">
          {feedback.suggestions.map((suggestion: string, index: number) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;
