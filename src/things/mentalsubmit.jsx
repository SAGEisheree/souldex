import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // 👈 Added useNavigate
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';

const MentalSubmit = () => {
  const location = useLocation();
  const navigate = useNavigate(); // 👈 1. Initialize navigate
  const quizData = location.state; 

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY
  });

  const analyzeData = async () => {
    // If quizData is already cleared or analysis is done, stop.
    if (!quizData || analysis || loading) return;
    
    setLoading(true);
    try {
      const customPrompt = `
        
        Review the following quiz results: ${JSON.stringify(quizData.results)}
        
      on the basis of this data give the name estimate the mental age of the person 

      give the response in short 

       use Markdown for formatting.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: customPrompt
      });

      if (response && response.text) {
        setAnalysis(response.text);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis("Error connecting to Gemini 3.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (quizData) {
      // 2. Run analysis
      analyzeData();

      // 3. Clear the state from browser history immediately
      // This ensures if the user reloads, location.state is null.
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [quizData]); // Only depends on quizData

  return (
    <div className="mt-4 p-8 max-w-2xl mx-auto">
      {loading ? (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-2 animate-pulse">Gemini is analyzing your quizData...</p>
        </div>
      ) : analysis ? ( // Show analysis if it exists
        <div className="prose prose-slate max-w-none bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      ) : ( // If no analysis and not loading, it means the page was reloaded
        <div className="text-center py-10">
          <p className="text-lg opacity-70">No data found. The session has expired or the page was refreshed.</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-primary mt-4"
          >
            Go Back to Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default MentalSubmit;