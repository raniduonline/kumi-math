'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock concept data
const conceptData = {
  'numbers': { name: 'Number Recognition & Counting', description: 'Counting, number sequence, and number recognition from 0-100' },
  'addition': { name: 'Addition', description: 'Adding numbers within 20' },
  'subtraction': { name: 'Subtraction', description: 'Subtracting numbers within 20' },
  'place': { name: 'Place Value', description: 'Understanding tens and ones' },
  'measurement': { name: 'Measurement', description: 'Measuring length, weight, and capacity' },
  'time': { name: 'Time', description: 'Telling time to the hour and half-hour' },
  'fractions': { name: 'Basic Fractions', description: 'Understanding halves and quarters' },
  'geometry': { name: 'Geometry', description: 'Recognizing 2D and 3D shapes' },
  'data': { name: 'Data & Graphs', description: 'Reading and creating simple graphs' },
};

interface Result {
  questionId: string;
  concept: string;
  correct: boolean;
}

interface ConceptResult {
  concept: string;
  name: string;
  description: string;
  score: number;
  totalQuestions: number;
  correctQuestions: number;
  mastery: 'mastered' | 'developing' | 'needs-work';
}

export default function AssessmentResults() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [conceptResults, setConceptResults] = useState<ConceptResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Get results from localStorage
    const storedResults = localStorage.getItem('assessmentResults');
    if (!storedResults) {
      router.push('/dashboard');
      return;
    }

    const parsedResults: Result[] = JSON.parse(storedResults);
    setResults(parsedResults);

    // Calculate scores by concept
    const conceptsSet = new Set(parsedResults.map(r => r.concept));
    const concepts = Array.from(conceptsSet);
    
    const calculatedConceptResults = concepts.map(concept => {
      const conceptQuestions = parsedResults.filter(r => r.concept === concept);
      const correctQuestions = conceptQuestions.filter(q => q.correct).length;
      const score = (correctQuestions / conceptQuestions.length) * 100;
      
      let mastery: 'mastered' | 'developing' | 'needs-work';
      if (score >= 80) mastery = 'mastered';
      else if (score >= 50) mastery = 'developing';
      else mastery = 'needs-work';
      
      return {
        concept,
        name: conceptData[concept as keyof typeof conceptData]?.name || concept,
        description: conceptData[concept as keyof typeof conceptData]?.description || '',
        score,
        totalQuestions: conceptQuestions.length,
        correctQuestions,
        mastery,
      };
    });
    
    setConceptResults(calculatedConceptResults);
    
    // Calculate overall score
    const totalCorrect = parsedResults.filter(r => r.correct).length;
    setOverallScore((totalCorrect / parsedResults.length) * 100);
    
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-display font-bold text-primary-600">
              Assessment Results
            </h1>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Results Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Overall Score Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold mb-2">Overall Score</h2>
            <div className="flex items-center justify-center">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={overallScore >= 80 ? '#10B981' : overallScore >= 50 ? '#F59E0B' : '#EF4444'}
                    strokeWidth="3"
                    strokeDasharray={`${overallScore}, 100`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{Math.round(overallScore)}%</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <h3 className="text-lg font-bold mb-2">Recommendations</h3>
            <p className="text-gray-600">
              Based on the assessment results, we've created a personalized learning path to help address any gaps.
            </p>
            <div className="mt-4">
              <Link href="/learning-path" className="btn-primary">
                View Learning Path
              </Link>
            </div>
          </div>
        </div>

        {/* Concept Results */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Concept Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptResults.map(concept => (
              <div key={concept.concept} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                      concept.mastery === 'mastered' 
                        ? 'bg-green-100 text-green-700' 
                        : concept.mastery === 'developing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {concept.mastery === 'mastered' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {concept.mastery === 'developing' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                    {concept.mastery === 'needs-work' && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold">{concept.name}</h3>
                    <p className="text-sm text-gray-500">{concept.description}</p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Score: {Math.round(concept.score)}%</span>
                    <span>{concept.correctQuestions}/{concept.totalQuestions} correct</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        concept.mastery === 'mastered' 
                          ? 'bg-green-500' 
                          : concept.mastery === 'developing'
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                      }`} 
                      style={{ width: `${concept.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      concept.mastery === 'mastered' 
                        ? 'bg-green-100 text-green-800' 
                        : concept.mastery === 'developing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {concept.mastery === 'mastered' && 'Mastered'}
                    {concept.mastery === 'developing' && 'Developing'}
                    {concept.mastery === 'needs-work' && 'Needs Work'}
                  </span>
                </div>
                
                <div className="mt-4">
                  <Link href={`/resources/${concept.concept}`} className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View Resources →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/assessment" className="btn-secondary">
            Take Assessment Again
          </Link>
          <Link href="/print-report" className="btn-primary">
            Print Full Report
          </Link>
        </div>
      </div>
    </div>
  );
} 