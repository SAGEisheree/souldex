import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import ReactMarkdown from 'react-markdown';
import { Link } from "react-router-dom";


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
    <div>

              <div className="-z-10 absolute opacity-50 inset-0 bg-[linear-gradient(to_right,#ffffff99_1px,transparent_1px),linear-gradient(to_bottom,#ffffff99_1px,transparent_1px)] bg-[size:60px_60px]">
          </div>
    {/* Navbar - Kept transparent to let the blue shine through */}
    <nav className="navbar mx-auto max-w-5xl px-4 py-6">
      <div className="flex-1">
        <span className="text-4xl font-black tracking-tighter uppercase drop-shadow-sm">Souldex</span>
      </div>
      <div className="flex-none gap-4">
        <button className="btn btn-ghost btn-sm normal-case hidden md:flex text-xl hover:bg-white/10">Tests</button>
        <Link to="/about" className="btn btn-ghost btn-sm normal-case hidden md:flex text-xl hover:bg-white/10">About</Link>
        </div>
</nav>

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
    </div>
  );
};

export default MentalSubmit;