'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock child data
const mockChildren = [
  {
    id: 'child1',
    name: 'Emma',
    age: 6,
    grade: '1st',
    avatar: '/images/avatar-girl.png',
    lastAssessment: '2023-06-15',
    overallScore: 78,
    completedActivities: 12,
  },
  {
    id: 'child2',
    name: 'Noah',
    age: 7,
    grade: '1st',
    avatar: '/images/avatar-boy.png',
    lastAssessment: '2023-06-10',
    overallScore: 65,
    completedActivities: 8,
  }
];

// Mock recent activities
const mockRecentActivities = [
  {
    id: 'act1',
    childId: 'child1',
    childName: 'Emma',
    type: 'Assessment',
    title: 'Math Assessment',
    date: '2023-06-15',
    score: 78,
    conceptsCovered: ['Addition', 'Subtraction', 'Place Value'],
  },
  {
    id: 'act2',
    childId: 'child1',
    childName: 'Emma',
    type: 'Practice',
    title: 'Addition with Pictures',
    date: '2023-06-14',
    score: 90,
    conceptsCovered: ['Addition'],
  },
  {
    id: 'act3',
    childId: 'child2',
    childName: 'Noah',
    type: 'Assessment',
    title: 'Math Assessment',
    date: '2023-06-10',
    score: 65,
    conceptsCovered: ['Addition', 'Subtraction', 'Place Value'],
  },
  {
    id: 'act4',
    childId: 'child2',
    childName: 'Noah',
    type: 'Learning',
    title: 'Place Value Blocks',
    date: '2023-06-08',
    score: null,
    conceptsCovered: ['Place Value'],
  },
];

// Mock gap areas by child
const mockGapAreas = {
  'child1': ['Subtraction within 20', 'Time - Half Hour', 'Basic Fractions'],
  'child2': ['Place Value', 'Geometry - 3D Shapes', 'Measurement'],
};

// Mock recommendations by child
const mockRecommendations = {
  'child1': [
    {
      id: 'rec1',
      title: 'Subtraction Practice with Manipulatives',
      type: 'Activity',
      url: '/learning-path',
    },
    {
      id: 'rec2',
      title: 'Telling Time Worksheets',
      type: 'Resource',
      url: '/resources',
    },
  ],
  'child2': [
    {
      id: 'rec3',
      title: 'Place Value Interactive Game',
      type: 'Activity',
      url: '/learning-path',
    },
    {
      id: 'rec4',
      title: '3D Shapes Video Series',
      type: 'Resource',
      url: '/resources',
    },
  ],
};

interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar: string;
  lastAssessment: string;
  overallScore: number;
  completedActivities: number;
}

interface Activity {
  id: string;
  childId: string;
  childName: string;
  type: string;
  title: string;
  date: string;
  score: number | null;
  conceptsCovered: string[];
}

interface Recommendation {
  id: string;
  title: string;
  type: string;
  url: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [children, setChildren] = useState<Child[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Load data (in a real app, this would be an API call)
    setChildren(mockChildren);
    setActivities(mockRecentActivities);
    setLoading(false);
  }, [router]);

  // Filter activities by selected child
  const filteredActivities = selectedChild === 'all'
    ? activities
    : activities.filter(activity => activity.childId === selectedChild);

  // Get gap areas for selected child
  const gapAreas = selectedChild !== 'all' 
    ? mockGapAreas[selectedChild as keyof typeof mockGapAreas] || []
    : [];

  // Get recommendations for selected child
  const recommendations = selectedChild !== 'all' 
    ? mockRecommendations[selectedChild as keyof typeof mockRecommendations] || []
    : [];

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
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
              Parent Dashboard
            </h1>
            <div className="flex space-x-4">
              <Link href="/profile" className="text-gray-600 hover:text-gray-900">
                My Profile
              </Link>
              <button 
                onClick={() => {
                  localStorage.removeItem('authToken');
                  router.push('/login');
                }}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Child Selection */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Select Child</h2>
          <div className="flex space-x-4 overflow-x-auto pb-4">
            <button
              onClick={() => setSelectedChild('all')}
              className={`flex flex-col items-center p-3 rounded-lg min-w-[100px] transition ${
                selectedChild === 'all' 
                  ? 'bg-primary-50 border-2 border-primary-500' 
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
                All
              </div>
              <span className="text-sm font-medium">All Children</span>
            </button>
            
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={`flex flex-col items-center p-3 rounded-lg min-w-[100px] transition ${
                  selectedChild === child.id 
                    ? 'bg-primary-50 border-2 border-primary-500' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
                  <span>{child.name[0]}</span>
                </div>
                <span className="text-sm font-medium">{child.name}</span>
                <span className="text-xs text-gray-500">Age {child.age}</span>
              </button>
            ))}
            
            <Link
              href="/create-profile"
              className="flex flex-col items-center p-3 rounded-lg min-w-[100px] bg-gray-50 border-2 border-dashed border-gray-300 hover:bg-gray-100 transition"
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-medium">Add Child</span>
            </Link>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/assessment" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-center">Start Assessment</span>
                </Link>
                
                <Link href="/learning-path" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-center">Learning Path</span>
                </Link>
                
                <Link href="/resources" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-center">Resources</span>
                </Link>
                
                <Link href="/assessment-results" className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-center">View Results</span>
                </Link>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">Recent Activities</h2>
                <Link href={selectedChild !== 'all' ? '/learning-path' : '#'} className={`text-sm font-medium text-primary-600 hover:text-primary-700 ${selectedChild === 'all' ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  View All
                </Link>
              </div>
              
              {filteredActivities.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No recent activities found.</p>
                  {selectedChild !== 'all' && (
                    <Link href="/assessment" className="mt-3 inline-block text-primary-600 hover:text-primary-700 font-medium">
                      Start an assessment
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredActivities.map(activity => (
                    <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                              activity.type === 'Assessment' 
                                ? 'bg-blue-100 text-blue-800' 
                                : activity.type === 'Practice'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {activity.type}
                          </span>
                          <span className="text-sm text-gray-500">{formatDate(activity.date)}</span>
                        </div>
                        {activity.score !== null && (
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              activity.score >= 80 
                                ? 'bg-green-100 text-green-800' 
                                : activity.score >= 60
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {activity.score}%
                          </span>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-md font-bold text-gray-800">{activity.title}</h3>
                          <div className="flex items-center text-xs text-gray-500 mt-1">
                            <span className="mr-1">By {activity.childName}</span>
                            •
                            <span className="ml-1">{activity.conceptsCovered.join(', ')}</span>
                          </div>
                        </div>
                        
                        <Link 
                          href={activity.type === 'Assessment' ? '/assessment-results' : '/learning-path'} 
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                        >
                          {activity.type === 'Assessment' ? 'View Details' : 'Continue'}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Children Overview */}
            {selectedChild === 'all' && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Children Overview</h2>
                {children.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No children added yet.</p>
                    <Link href="/create-profile" className="mt-3 inline-block text-primary-600 hover:text-primary-700 font-medium">
                      Add a child
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {children.map(child => (
                      <div key={child.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                            <span>{child.name[0]}</span>
                          </div>
                          <div>
                            <h3 className="text-md font-bold text-gray-800">{child.name}</h3>
                            <p className="text-xs text-gray-500">Age {child.age} • {child.grade} Grade</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-center">
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Last Assessment</p>
                            <p className={`text-sm font-medium ${
                              new Date(child.lastAssessment) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                                ? 'text-green-600'
                                : 'text-yellow-600'
                            }`}>
                              {formatDate(child.lastAssessment)}
                            </p>
                          </div>
                          
                          <div className="bg-gray-50 p-2 rounded">
                            <p className="text-xs text-gray-500">Overall Score</p>
                            <p className={`text-sm font-medium ${
                              child.overallScore >= 80 
                                ? 'text-green-600' 
                                : child.overallScore >= 60
                                  ? 'text-yellow-600'
                                  : 'text-red-600'
                            }`}>
                              {child.overallScore}%
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-right">
                          <button
                            onClick={() => setSelectedChild(child.id)}
                            className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Child Details (when a specific child is selected) */}
            {selectedChild !== 'all' && (
              <>
                {/* Learning Gaps */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Learning Gaps</h2>
                  {gapAreas.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No learning gaps identified yet.</p>
                      <Link href="/assessment" className="mt-3 inline-block text-primary-600 hover:text-primary-700 font-medium">
                        Start an assessment
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {gapAreas.map((gap, index) => (
                        <div key={index} className="flex items-center p-2 bg-red-50 rounded-lg">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-800">{gap}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Recommended Activities */}
                <div className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-800">Recommendations</h2>
                    <Link href="/learning-path" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      View All
                    </Link>
                  </div>
                  
                  {recommendations.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No recommendations available yet.</p>
                      <Link href="/assessment" className="mt-3 inline-block text-primary-600 hover:text-primary-700 font-medium">
                        Start an assessment
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {recommendations.map(rec => (
                        <div key={rec.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition">
                          <div className="flex items-center justify-between mb-1">
                            <span 
                              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                rec.type === 'Activity' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-purple-100 text-purple-800'
                              }`}
                            >
                              {rec.type}
                            </span>
                          </div>
                          
                          <h3 className="text-sm font-bold text-gray-800 mb-2">{rec.title}</h3>
                          
                          <Link 
                            href={rec.url}
                            className="text-primary-600 hover:text-primary-700 text-xs font-medium block text-right"
                          >
                            {rec.type === 'Activity' ? 'Start Activity' : 'View Resource'}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 