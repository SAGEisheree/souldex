import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Navbar from "../navbar";


const FriendSubmit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [quizData] = useState(location.state);
  const friendName = quizData?.friendName || "friend";

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeData = async () => {
    if (!quizData || analysis || loading) return;

    setLoading(true);
    try {
      const response = await fetch('/api/friendapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizData: quizData })
      });

      const data = await response.json();

      if (data.text) {
        setAnalysis(data.text);

        navigate(location.pathname, { replace: true, state: null });
      } else {
        throw new Error(data.error || "Daily limit reached on server.");
      }
    } catch (error) {
      console.error("Analysis failed:", error);
      setAnalysis(`### ⚠️ Analysis Failed\n${error.message}. Please try again tomorrow.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quizData) {
      analyzeData();
    }
  }, [quizData]);


  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Souldex Result',
          text: `About my friend ${friendName}:\n\n${analysis}\n\nTest your friend at [souldex.vercel.app]`,
        });
      } else {
        console.log("Web Share API not supported");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };
  return (
    <div className="relative min-h-screen pb-20">
      <div className="-z-10 absolute opacity-50 inset-0 bg-[linear-gradient(to_right,#ffffff99_1px,transparent_1px),linear-gradient(to_bottom,#ffffff99_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <Navbar />

      <div className="mt-4 p-4 max-w-2xl mx-auto">
        <div id="compo" className="bg-transparent p-2">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <span className="loading loading-spinner loading-lg text-white"></span>
              <p className="mt-4 text-white font-bold animate-pulse">Analyzing data...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-slate max-w-none bg-cyan-600/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
              <h1 className="text-2xl font-black text-primary mb-2">About {friendName} </h1>
              <div className="h-1 w-20 bg-primary mb-6 rounded-full"></div>
              <ReactMarkdown>{analysis}</ReactMarkdown>


            </div>
          ) : (
            <div className="text-center py-10 bg-white/20 rounded-3xl backdrop-blur-md">
              <p className="text-lg text-white font-medium">Session expired or no data found.</p>
              <button onClick={() => navigate('/')} className="btn btn-primary mt-4">Start New Quiz</button>
            </div>
          )}
        </div>

        {analysis && !loading && (
          <div className="mt-8 flex justify-center">
            <button onClick={handleShare} className="btn btn-black btn-wide rounded-full shadow-xl gap-3 text-lg py-4 bg-cyan-600/20 h-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
              Share Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendSubmit;