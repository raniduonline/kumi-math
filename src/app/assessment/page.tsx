'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock questions for the assessment
const mockQuestions = [
  {
    id: 'q1',
    concept: 'numbers',
    text: 'Count the apples. How many are there?',
    imageUrl: '/images/counting-apples.png', // This would be a real image in a complete implementation
    options: [
      { id: 'a', text: '5' },
      { id: 'b', text: '7' },
      { id: 'c', text: '9' },
      { id: 'd', text: '11' },
    ],
    correctAnswer: 'b',
    difficulty: 'easy',
  },
  {
    id: 'q2',
    concept: 'addition',
    text: 'What is 3 + 5?',
    options: [
      { id: 'a', text: '7' },
      { id: 'b', text: '8' },
      { id: 'c', text: '9' },
      { id: 'd', text: '10' },
    ],
    correctAnswer: 'b',
    difficulty: 'easy',
  },
  {
    id: 'q3',
    concept: 'subtraction',
    text: 'What is 10 - 4?',
    options: [
      { id: 'a', text: '4' },
      { id: 'b', text: '5' },
      { id: 'c', text: '6' },
      { id: 'd', text: '7' },
    ],
    correctAnswer: 'c',
    difficulty: 'easy',
  },
  {
    id: 'q4',
    concept: 'place',
    text: 'What is the value of the underlined digit in the number 2\u00183?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '20' },
      { id: 'c', text: '8' },
      { id: 'd', text: '80' },
    ],
    correctAnswer: 'd',
    difficulty: 'medium',
  },
  {
    id: 'q5',
    concept: 'geometry',
    text: 'Which shape has 4 equal sides?',
    options: [
      { id: 'a', text: 'Rectangle' },
      { id: 'b', text: 'Square' },
      { id: 'c', text: 'Triangle' },
      { id: 'd', text: 'Circle' },
    ],
    correctAnswer: 'b',
    difficulty: 'easy',
  },
];

export default function Assessment() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes in seconds
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const currentQuestion = mockQuestions[currentQuestionIndex];
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      // Time's up - submit the assessment
      handleFinishAssessment();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused]);

  // Check for authentication
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleNextQuestion = () => {
    // Save the answer
    if (selectedOption) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: selectedOption,
      });
    }
    
    // Move to next question
    if (currentQuestionIndex < mockQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      handleFinishAssessment();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOption(answers[mockQuestions[currentQuestionIndex - 1].id] || null);
    }
  };

  const handlePauseAssessment = () => {
    setIsPaused(true);
    setShowPauseModal(true);
  };

  const handleResumeAssessment = () => {
    setIsPaused(false);
    setShowPauseModal(false);
  };

  const handleSaveAndExit = () => {
    // In a real app, we would save the current state to the server
    // For now, we'll just go back to the dashboard
    router.push('/dashboard');
  };

  const handleFinishAssessment = () => {
    // Save any remaining answers
    if (selectedOption) {
      setAnswers({
        ...answers,
        [currentQuestion.id]: selectedOption,
      });
    }
    
    // Calculate results - in a real app, this would be more sophisticated
    const results = mockQuestions.map(q => ({
      questionId: q.id,
      concept: q.concept,
      correct: answers[q.id] === q.correctAnswer,
    }));
    
    // Store results in localStorage for the results page
    localStorage.setItem('assessmentResults', JSON.stringify(results));
    
    // Navigate to results page
    router.push('/assessment-results');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-display font-bold text-primary-600">
            1st Grade Math Assessment
          </h1>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full font-medium">
              Time left: {formatTime(timeLeft)}
            </div>
            <button 
              onClick={handlePauseAssessment}
              className="btn-secondary text-sm py-1"
            >
              Pause
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${((currentQuestionIndex + 1) / mockQuestions.length) * 100}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Question {currentQuestionIndex + 1} of {mockQuestions.length}
        </div>
      </div>

      {/* Question Content */}
      <div className="container mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
          {/* Question Text */}
          <h2 className="text-xl font-bold mb-6">{currentQuestion.text}</h2>

          {/* Image if present */}
          {currentQuestion.imageUrl && (
            <div className="mb-6 flex justify-center">
              <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">[Image: {currentQuestion.imageUrl}]</span>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                  selectedOption === option.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="font-medium">{option.id.toUpperCase()}.</span> {option.text}
              </button>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
              className={`px-4 py-2 rounded-md ${
                currentQuestionIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-primary-600 hover:bg-primary-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="btn-primary"
              disabled={!selectedOption}
            >
              {currentQuestionIndex === mockQuestions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>

      {/* Pause Modal */}
      {showPauseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Assessment Paused</h3>
            <p className="text-gray-600 mb-6">
              Your progress has been saved. You can continue the assessment or save and exit.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={handleResumeAssessment}
                className="btn-primary"
              >
                Continue Assessment
              </button>
              <button
                onClick={handleSaveAndExit}
                className="text-gray-700 hover:text-primary-600"
              >
                Save and Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 