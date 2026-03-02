import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { toBlob } from 'html-to-image';

const MentalSubmit = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [quizData] = useState(location.state);

  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const compoRef = useRef(null);

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
  if (!compoRef.current) return;

  // Use a simple alert or toast here instead of a complex state change 
  // to keep the "User Activation" alive.
  
  try {
    // 1. Generate the Blob INSTANTLY
    const blob = await toBlob(compoRef.current, {
      pixelRatio: 1, // 1 is fastest. If this works, we can try 1.5 later.
      skipFonts: false, // Ensures your 'Press Start 2P' stays
    });

    const file = new File([blob], 'souldex.png', { type: 'image/png' });

    // 2. The critical check
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'Souldex Result',
        text: 'My Mental Age Analysis',
      });
    } else {
      // If we are here, the browser explicitly said "No" to file sharing
      throw new Error("Files not supported"); 
    }
  } catch (err) {
    console.log("Switching to download fallback...");
    triggerDownload(); // Only call this if sharing is actually impossible
  }
};

// Separate function to keep things clean
const triggerDownload = (blob) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'souldex-result.png';
  a.click();
  URL.revokeObjectURL(url);
};

// Helper function for the fallback
const downloadImage = (blob) => {
  const link = document.createElement('a');
  link.download = 'souldex-result.png';
  link.href = URL.createObjectURL(blob);
  link.click();
};
  return (
    <div className="relative min-h-screen pb-20">
      <div className="-z-10 absolute opacity-50 inset-0 bg-[linear-gradient(to_right,#ffffff99_1px,transparent_1px),linear-gradient(to_bottom,#ffffff99_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <nav className="navbar  mx-auto max-w-5xl px-4 py-6">
            <div className="flex-1">
              <span className="text-4xl font-black tracking-tighter uppercase drop-shadow-sm">Souldex</span>
            </div>
            <div className="flex-none gap-4">
              <button className="btn btn-ghost btn-sm normal-case hidden md:flex text-xl hover:bg-white/10">Tests</button>
              <Link to="/" className="btn btn-ghost btn-sm normal-case hidden md:flex text-xl hover:bg-white/10">Home</Link>
      
              {/* Mobile menu button */}
              <div className="dropdown dropdown-end md:hidden">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-2xl bg-souldex-blue border border-white/20 rounded-2xl w-52 backdrop-blur-lg">
                  <li><button className="py-3">Tests</button></li>
                  <li><Link to="/" className="py-3">home</Link></li>
                </ul>
              </div>
            </div>
          </nav>

      <div className="mt-4 p-4 max-w-2xl mx-auto">
        <div id="compo" ref={compoRef} className="bg-transparent p-2">
          {loading ? (
            <div className="flex flex-col items-center py-20">
              <span className="loading loading-spinner loading-lg text-white"></span>
              <p className="mt-4 text-white font-bold animate-pulse">Calculating your age...</p>
            </div>
          ) : analysis ? (
            <div className="prose prose-slate max-w-none bg-cyan-600/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
              <h1 className="text-2xl font-black text-primary mb-2">My Mental age by souldex- </h1>
              <div className="h-1 w-20 bg-primary mb-6 rounded-full"></div>
              <ReactMarkdown>{analysis}</ReactMarkdown>

            <div className='mt-10 border-black border-t-2 w-fill text-2xl'>Test Your Mental age at [ souldex.vercel.app ]
            </div>
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

export default MentalSubmit;