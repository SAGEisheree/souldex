import React from 'react'
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";


const MentalForm = () => {
const quizData = [
    {
      id: 1,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      
    },
    {
      id: 2,
      question: "What is the capital of France?",
      options: ["Berlin", "London", "Paris", "Madrid"],
    },
    {
      id: 3,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen"],
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
      console.log(updatedAnswers);
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
                className={`label cursor-pointer p-3 md:p-4 rounded-lg border border-base-300 transition-colors hover:bg-base-200 ${
                  selectedAnswer === option ? "bg-base-200 border-primary shadow-inner" : ""
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
              className={`btn btn-block shadow-md ${
                isLastQuestion ? "btn-success" : "btn-primary"
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