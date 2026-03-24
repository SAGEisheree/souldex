import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FriendForm = () => {
  const navigate = useNavigate();

  // --- 1. QUIZ DATA ---
const quizData = [
  { 
    id: 1, 
    question: "Do they say good things about you even when you are not there?", 
    options: ["Yes", "No"]
  },
  { 
    id: 2, 
    question: "Are they truly happy for you when something good happens to you?", 
    options: ["Yes", "No"]
  },
  { 
    id: 3, 
    question: "Can you tell them your mistakes without them using it against you later?", 
    options: ["Yes", "No"]
  },
  { 
    id: 4, 
    question: "Do they actually do the things they promise to do?", 
    options: ["Yes", "No"]
  },
  { 
    id: 5, 
    question: "When there is a problem, do they try to fix it instead of getting angry?", 
    options: ["Yes", "No"]
  },
  { 
    id: 6, 
    question: "Can you say 'no' to them without feeling bad or guilty?", 
    options: ["Yes", "No"]
  },
  { 
    id: 7, 
    question: "Do both of you put the same amount of work into the friendship?", 
    options: ["Yes", "No"]
  },
  { 
    id: 8, 
    question: "Do they remember the small things that are important to you?", 
    options: ["Yes", "No"]
  },
  { 
    id: 9, 
    question: "Do they support you when you want to change or improve your life?", 
    options: ["Yes", "No"]
  },
  { 
    id: 10, 
    question: "Do you feel happy and full of energy after you spend time with them?", 
    options: ["Yes", "No"]
  }
];
  // --- 2. STATE ---
  // Ensure this is exactly "naming" so it starts on the first screen
  const [step, setStep] = useState("naming"); 
  const [friendName, setFriendName] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);

  const current = quizData[currentIndex];
  const isLastQuestion = currentIndex === quizData.length - 1;

  // --- 3. HANDLERS ---
  const handleStartQuiz = () => {
    if (friendName.trim().length > 0) {
      setStep("quiz"); // This switches the UI to the questions
    }
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const currentAnswer = {
      id: current.id,
      question: current.question,
      answer: selectedAnswer
    };

    const updatedAnswers = [...allAnswers, currentAnswer];

    if (isLastQuestion) {
      navigate('/friendsubmit', { 
        state: { 
          friendName: friendName, 
          results: updatedAnswers 
        } 
      });
    } else {
      setAllAnswers(updatedAnswers);
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer("");
    }
  };

  // --- 4. RENDER ---
  return (
    <div className="flex justify-center p-4 md:p-8">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          
          {/* STEP 1: NAME INPUT */}
          {step === "naming" && (
            <div className="space-y-4">
              <h2 className="card-title text-2xl font-bold">New Analysis</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">What is the name of your friend?</span>
                </label>
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Enter name..." 
                  className="input input-bordered input-primary w-full" 
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStartQuiz()}
                />
              </div>
              <button 
                className="btn btn-primary btn-block mt-4"
                disabled={!friendName.trim()} 
                onClick={handleStartQuiz}
              >
                Start Quiz
              </button>
            </div>
          )}

          {/* STEP 2: THE QUIZ */}
          {step === "quiz" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="badge badge-outline">{currentIndex + 1} / {quizData.length}</span>
                <span className="text-xs opacity-60">Analyzing: <b>{friendName}</b></span>
              </div>

              <h2 className="card-title text-lg min-h-[60px]">{current.question}</h2>

              <div className="space-y-2">
                {current.options.map((option, idx) => (
                  <label key={idx} className={`label cursor-pointer p-4 border rounded-xl transition-all ${selectedAnswer === option ? "bg-primary/10 border-primary" : "border-base-300"}`}>
                    <span className="label-text font-medium">{option}</span>
                    <input 
                      type="radio" 
                      className="radio radio-primary" 
                      checked={selectedAnswer === option}
                      onChange={() => setSelectedAnswer(option)} 
                    />
                  </label>
                ))}
              </div>

              <button 
                className={`btn btn-block ${isLastQuestion ? "btn-success" : "btn-primary"}`}
                disabled={!selectedAnswer}
                onClick={handleNext}
              >
                {isLastQuestion ? "Finish" : "Next"}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FriendForm;