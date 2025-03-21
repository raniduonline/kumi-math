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

// Mock learning activities
const mockActivities = [
  {
    id: 'act1',
    concept: 'numbers',
    title: 'Counting Objects to 20',
    type: 'Interactive',
    duration: '10 min',
    description: 'Practice counting objects up to 20 with fun, interactive exercises.',
    difficulty: 'easy',
    completed: false,
    url: '/activities/counting-objects',
  },
  {
    id: 'act2',
    concept: 'addition',
    title: 'Addition with Pictures',
    type: 'Interactive',
    duration: '15 min',
    description: 'Learn to add numbers within 10 using visual aids and pictures.',
    difficulty: 'easy',
    completed: false,
    url: '/activities/addition-pictures',
  },
  {
    id: 'act3',
    concept: 'subtraction',
    title: 'Subtraction Stories',
    type: 'Video',
    duration: '8 min',
    description: 'Watch engaging stories that demonstrate subtraction concepts.',
    difficulty: 'easy',
    completed: false,
    url: '/activities/subtraction-stories',
  },
  {
    id: 'act4',
    concept: 'place',
    title: 'Tens and Ones Blocks',
    type: 'Interactive',
    duration: '12 min',
    description: 'Use virtual base-10 blocks to understand place value concepts.',
    difficulty: 'medium',
    completed: false,
    url: '/activities/place-value-blocks',
  },
  {
    id: 'act5',
    concept: 'geometry',
    title: 'Shape Hunt',
    type: 'Printable',
    duration: '20 min',
    description: 'Find and identify shapes in everyday objects with this printable activity.',
    difficulty: 'easy',
    completed: false,
    url: '/activities/shape-hunt',
  },
];

interface Result {
  questionId: string;
  concept: string;
  correct: boolean;
}

interface LearningActivity {
  id: string;
  concept: string;
  title: string;
  type: string;
  duration: string;
  description: string;
  difficulty: string;
  completed: boolean;
  url: string;
}

export default function LearningPath() {
  const router = useRouter();
  const [results, setResults] = useState<Result[]>([]);
  const [activities, setActivities] = useState<LearningActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('day1');
  const [showCompletedActivities, setShowCompletedActivities] = useState(false);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }

    // Get results from localStorage
    const storedResults = localStorage.getItem('assessmentResults');
    if (storedResults) {
      const parsedResults: Result[] = JSON.parse(storedResults);
      setResults(parsedResults);

      // Generate learning path based on assessment results
      // In a real app, this would be a more sophisticated algorithm
      const conceptsSet = new Set(parsedResults.map(r => r.concept));
      const concepts = Array.from(conceptsSet);
      
      // Filter activities for concepts that need work
      const recommendedActivities = mockActivities.filter(activity => {
        const conceptResults = parsedResults.filter(r => r.concept === activity.concept);
        const correctCount = conceptResults.filter(r => r.correct).length;
        const totalCount = conceptResults.length;
        
        if (totalCount === 0) return false;
        
        const score = (correctCount / totalCount) * 100;
        return score < 80; // Only include activities for concepts with < 80% score
      });
      
      setActivities(recommendedActivities);
    } else {
      // If no assessment results, just show all activities
      setActivities(mockActivities);
    }
    
    setLoading(false);
  }, [router]);

  const markActivityComplete = (activityId: string) => {
    setActivities(activities.map(activity => 
      activity.id === activityId 
        ? { ...activity, completed: true } 
        : activity
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your learning path...</p>
        </div>
      </div>
    );
  }

  // Group activities by day (in a real app, this would be more sophisticated)
  const day1Activities = activities.slice(0, 2);
  const day2Activities = activities.slice(2, 4);
  const day3Activities = activities.slice(4);

  const currentDayActivities = 
    selectedDay === 'day1' ? day1Activities :
    selectedDay === 'day2' ? day2Activities :
    day3Activities;

  const filteredActivities = showCompletedActivities 
    ? currentDayActivities 
    : currentDayActivities.filter(activity => !activity.completed);

  const progress = activities.length > 0 
    ? Math.round((activities.filter(a => a.completed).length / activities.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-display font-bold text-primary-600">
              Learning Path
            </h1>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Your Learning Progress</h2>
              <p className="text-gray-600">
                Complete these personalized activities to improve your math skills.
              </p>
            </div>
            <div className="w-full md:w-64">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{progress}% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-primary-500 h-4 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Day Selector */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setSelectedDay('day1')}
              className={`py-3 px-6 font-medium ${selectedDay === 'day1' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Day 1
            </button>
            <button
              onClick={() => setSelectedDay('day2')}
              className={`py-3 px-6 font-medium ${selectedDay === 'day2' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Day 2
            </button>
            <button
              onClick={() => setSelectedDay('day3')}
              className={`py-3 px-6 font-medium ${selectedDay === 'day3' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Day 3
            </button>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="mb-6 flex items-center">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={showCompletedActivities}
                onChange={() => setShowCompletedActivities(!showCompletedActivities)}
              />
              <div className={`block w-10 h-6 rounded-full ${showCompletedActivities ? 'bg-primary-500' : 'bg-gray-300'}`}></div>
              <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${showCompletedActivities ? 'transform translate-x-4' : ''}`}></div>
            </div>
            <div className="ml-3 text-gray-700">
              Show completed activities
            </div>
          </label>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <p className="text-gray-600">
                {showCompletedActivities 
                  ? "No activities scheduled for this day yet." 
                  : "You've completed all activities for this day!"
                }
              </p>
              {!showCompletedActivities && (
                <button
                  onClick={() => setShowCompletedActivities(true)}
                  className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                >
                  Show completed activities
                </button>
              )}
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className={`bg-white rounded-xl shadow-md p-6 ${activity.completed ? 'border-l-4 border-green-500' : ''}`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center mb-2">
                      <span 
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                          activity.type === 'Interactive' 
                            ? 'bg-blue-100 text-blue-800' 
                            : activity.type === 'Video'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {activity.type}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {activity.duration}
                      </span>
                      {activity.completed && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 ml-2">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold">{activity.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                    <div className="mt-2">
                      <span className="text-xs text-gray-500">
                        Concept: {conceptData[activity.concept as keyof typeof conceptData]?.name || activity.concept}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Link 
                      href={activity.url}
                      className={`btn-primary text-sm py-2 ${activity.completed ? 'opacity-50' : ''}`}
                    >
                      {activity.completed ? 'Do Again' : 'Start Activity'}
                    </Link>
                    {!activity.completed && (
                      <button
                        onClick={() => markActivityComplete(activity.id)}
                        className="text-sm text-gray-600 hover:text-primary-600"
                      >
                        Mark as Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              if (selectedDay === 'day2') setSelectedDay('day1');
              else if (selectedDay === 'day3') setSelectedDay('day2');
            }}
            className={`px-4 py-2 rounded-md ${
              selectedDay === 'day1'
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50'
            }`}
            disabled={selectedDay === 'day1'}
          >
            Previous Day
          </button>
          <button
            onClick={() => {
              if (selectedDay === 'day1') setSelectedDay('day2');
              else if (selectedDay === 'day2') setSelectedDay('day3');
            }}
            className={`px-4 py-2 rounded-md ${
              selectedDay === 'day3'
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50'
            }`}
            disabled={selectedDay === 'day3'}
          >
            Next Day
          </button>
        </div>
      </div>
    </div>
  );
} 