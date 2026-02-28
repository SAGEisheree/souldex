import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import ReactMarkdown from 'react-markdown';

const MentalSubmit = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const quizData = location.state; 

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeData = async () => {
    if (!quizData || analysis || loading) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizData: quizData })
      });

      const data = await response.json();

      if (data.text) {
        setAnalysis(data.text);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis("Error: Could not reach the analysis server.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (quizData) {
      analyzeData();
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [quizData]);

  return (
    <div className="mt-4 p-8 max-w-2xl mx-auto">
      {loading ? (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-2 animate-pulse">Estimating your age ... </p>
        </div>
      ) : analysis ? ( 
        <div className="prose prose-slate max-w-none bg-base-100 p-6 rounded-xl shadow-md border border-base-300">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      ) : ( 
        <div className="text-center py-10">
          <p className="text-lg opacity-70">No data found. The session has expired or the page was refreshed.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-4">
            Go Back to Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default MentalSubmit;