import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// 1. Notice the new import name
import { GoogleGenAI } from "@google/genai";

const MentalSubmit = () => {
  const location = useLocation();
  const quizData = location.state;
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // 2. Initialize with the new 2026 syntax
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  });

  const analyzeData = async () => {
    if (!quizData || analysis) return;
    setLoading(true);

    try {
      // 3. Use the new models.generateContent syntax
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview", // The 2026 high-speed model
        contents: `Analyze these quiz results: ${JSON.stringify(quizData.results)}`
      });

      setAnalysis(response.text); // In the new SDK, it's just .text (not a function)
    } catch (error) {
      console.error("New SDK Error:", error);
      setAnalysis("The new Gemini 3 model is currently busy. Try again in a moment.");
    }
    setLoading(false);
  };

  useEffect(() => {
    analyzeData();
  }, [quizData]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Gemini 3 Analysis</h1>
      {loading ? <p>Thinking with Gemini 3...</p> : <div className="mt-4">{analysis}</div>}
    </div>
  );
};

export default MentalSubmit;