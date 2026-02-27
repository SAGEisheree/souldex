import React from 'react'
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from 'react-router-dom';

const MentalForm = () => {

  const navigate = useNavigate();
  const quizData = [
  {
    id: 1,
    question: "When someone criticizes your work, how do you typically respond?",
    options: ["Get defensive", "Ignore it", "Reflect on it", "Ask for tips"]
  },
  {
    id: 2,
    question: "Do you find it easy to delay a small reward now for a much bigger one later?",
    options: ["Yes", "No"]
  },
  {
    id: 3,
    question: "How do you react when a plan you were excited about is suddenly canceled?",
    options: ["Get angry", "Feel sad", "Accept it", "Find an alternative"]
  },
  {
    id: 4,
    question: "Do you often find yourself blaming 'bad luck' or others for your mistakes?",
    options: ["Yes", "No"]
  },
  {
    id: 5,
    question: "When in a heated argument, do you try to understand the other person’s view?",
    options: ["Yes", "No"]
  },
  {
    id: 6,
    question: "How do you handle a boring but necessary task like chores or paperwork?",
    options: ["Avoid it", "Complain", "Do it fast", "Schedule it"]
  },
  {
    id: 7,
    question: "Do you make major life decisions based on your current mood?",
    options: ["Yes", "No"]
  },
  {
    id: 8,
    question: "How much do you rely on the approval of others to feel good about yourself?",
    options: ["Always", "Often", "Rarely", "Never"]
  },
  {
    id: 9,
    question: "Can you admit you are wrong even if no one else noticed the mistake?",
    options: ["Yes", "No"]
  },
  {
    id: 10,
    question: "When facing a crisis, what is your first instinct?",
    options: ["Panic", "Ask for help", "Think first", "Take action"]
  }
];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [allAnswers, setAllAnswers] = useState([]);
  const isLastQuestion = currentIndex === quizData.length - 1;
  const current = quizData[currentIndex];

  const handleNext = () => {

    const currentAnswer = [
      {
        id: current.id,
        question: current.question,
        answer: selectedAnswer
      }
    ];

    const updatedAnswers = [...allAnswers, currentAnswer]

    if (isLastQuestion) {
      console.log("Final Submission");
      navigate('/mentalsubmit', { state: { results: updatedAnswers } });
    } else {
      setAllAnswers(updatedAnswers)
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer("");

    }
  };

  return (
    <div className="flex justify-center  p-4 md:p-8">
      {/* DaisyUI Card Component */}
      <div className="card  bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">

          {/* Progress badge */}
          <div className="flex justify-between items-center mb-4">
            <span className="badge badge-primary badge-outline font-mono">
              {currentIndex + 1} / {quizData.length}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="card-title text-lg md:text-xl mb-6">{current.question}</h2>

          {/* Options List */}
          <div className="form-control space-y-2">
            {current.options.map((option, idx) => (
              <label
                key={idx}
                className={`label cursor-pointer p-3 md:p-4 rounded-lg border border-base-300 transition-colors hover:bg-base-200 ${selectedAnswer === option ? "bg-base-200 border-primary shadow-inner" : ""
                  }`}
              >
                <span className="label-text text-sm md:text-base font-medium">{option}</span>
                <input
                  type="radio"
                  name="quiz-option"
                  className="radio radio-primary"
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                />
              </label>
            ))}
          </div>

          {/* Action Button */}
          <div className="card-actions mt-8">

            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`btn btn-block shadow-md ${isLastQuestion ? "btn-success" : "btn-primary"
                }`}
            >
              {isLastQuestion ? "Submit Answer" : "Next Question"}
            </button>

          </div>

        </div>
      </div>
    </div>
  );


}

export default MentalForm