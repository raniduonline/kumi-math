'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Mock concept data
const conceptData = {
  'all': { name: 'All Concepts', description: 'Resources for all 1st grade math concepts' },
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

// Mock resources
const mockResources = [
  {
    id: 'res1',
    title: 'Counting to 100 Chart',
    type: 'Printable',
    format: 'PDF',
    concept: 'numbers',
    difficulty: 'easy',
    description: 'A colorful chart to help children learn and practice counting from 1 to 100.',
    thumbnailUrl: '/images/counting-chart.png',
    url: '/resources/counting-chart.pdf',
    estimatedTime: '15 min',
    targetSkills: ['counting', 'number recognition', 'number sequence'],
  },
  {
    id: 'res2',
    title: 'Addition with Manipulatives',
    type: 'Interactive',
    format: 'Web Activity',
    concept: 'addition',
    difficulty: 'easy',
    description: 'Practice adding numbers using virtual counters and other manipulatives.',
    thumbnailUrl: '/images/addition-manipulatives.png',
    url: '/activities/addition-manipulatives',
    estimatedTime: '20 min',
    targetSkills: ['addition within 10', 'addition within 20', 'number bonds'],
  },
  {
    id: 'res3',
    title: 'Subtraction Stories',
    type: 'Video',
    format: 'MP4',
    concept: 'subtraction',
    difficulty: 'medium',
    description: 'Watch engaging stories that demonstrate how subtraction works in real-life scenarios.',
    thumbnailUrl: '/images/subtraction-stories.png',
    url: '/videos/subtraction-stories',
    estimatedTime: '12 min',
    targetSkills: ['subtraction within 10', 'subtraction within 20', 'word problems'],
  },
  {
    id: 'res4',
    title: 'Place Value Blocks',
    type: 'Interactive',
    format: 'Web Activity',
    concept: 'place',
    difficulty: 'medium',
    description: 'Explore place value concepts with virtual base-10 blocks.',
    thumbnailUrl: '/images/place-value-blocks.png',
    url: '/activities/place-value-blocks',
    estimatedTime: '25 min',
    targetSkills: ['tens and ones', 'number composition', 'number decomposition'],
  },
  {
    id: 'res5',
    title: 'Measuring with Non-Standard Units',
    type: 'Printable',
    format: 'PDF',
    concept: 'measurement',
    difficulty: 'easy',
    description: 'Activities for measuring objects using non-standard units like paper clips and cubes.',
    thumbnailUrl: '/images/non-standard-measurement.png',
    url: '/resources/non-standard-measurement.pdf',
    estimatedTime: '30 min',
    targetSkills: ['measuring length', 'comparing lengths', 'non-standard units'],
  },
  {
    id: 'res6',
    title: 'Telling Time to the Hour',
    type: 'Interactive',
    format: 'Web Activity',
    concept: 'time',
    difficulty: 'easy',
    description: 'Practice telling time to the hour with an interactive clock.',
    thumbnailUrl: '/images/telling-time.png',
    url: '/activities/telling-time',
    estimatedTime: '15 min',
    targetSkills: ['hour hand', 'minute hand', 'reading clocks'],
  },
  {
    id: 'res7',
    title: 'Introduction to Fractions',
    type: 'Video',
    format: 'MP4',
    concept: 'fractions',
    difficulty: 'medium',
    description: 'A kid-friendly introduction to basic fraction concepts.',
    thumbnailUrl: '/images/intro-fractions.png',
    url: '/videos/intro-fractions',
    estimatedTime: '10 min',
    targetSkills: ['halves', 'quarters', 'equal parts'],
  },
  {
    id: 'res8',
    title: '2D and 3D Shapes Flashcards',
    type: 'Printable',
    format: 'PDF',
    concept: 'geometry',
    difficulty: 'easy',
    description: 'Colorful flashcards featuring 2D and 3D shapes with their names.',
    thumbnailUrl: '/images/shapes-flashcards.png',
    url: '/resources/shapes-flashcards.pdf',
    estimatedTime: '20 min',
    targetSkills: ['shape recognition', 'shape properties', 'shape names'],
  },
  {
    id: 'res9',
    title: 'Creating Simple Pictographs',
    type: 'Interactive',
    format: 'Web Activity',
    concept: 'data',
    difficulty: 'medium',
    description: 'Learn to create and interpret simple pictographs with this interactive activity.',
    thumbnailUrl: '/images/pictographs.png',
    url: '/activities/pictographs',
    estimatedTime: '25 min',
    targetSkills: ['data collection', 'data representation', 'pictograph interpretation'],
  },
];

interface Resource {
  id: string;
  title: string;
  type: string;
  format: string;
  concept: string;
  difficulty: string;
  description: string;
  thumbnailUrl: string;
  url: string;
  estimatedTime: string;
  targetSkills: string[];
}

export default function Resources() {
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [loading, setLoading] = useState(true);
  const [selectedConcept, setSelectedConcept] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/login');
      return;
    }
    
    setLoading(false);
  }, [router]);

  // Filter resources based on selected filters and search query
  const filteredResources = resources.filter(resource => {
    // Filter by concept
    if (selectedConcept !== 'all' && resource.concept !== selectedConcept) {
      return false;
    }
    
    // Filter by type
    if (selectedType !== 'all' && resource.type !== selectedType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.targetSkills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Get unique resource types for filter dropdown
  const resourceTypes = ['all', ...Array.from(new Set(resources.map(resource => resource.type)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading resources...</p>
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
              Learning Resources
            </h1>
            <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Search Input */}
            <div className="w-full md:w-1/3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Resources
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title, description, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field"
              />
            </div>
            
            {/* Concept Filter */}
            <div className="w-full md:w-1/3">
              <label htmlFor="concept" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Concept
              </label>
              <select 
                id="concept" 
                value={selectedConcept}
                onChange={(e) => setSelectedConcept(e.target.value)}
                className="input-field"
              >
                {Object.entries(conceptData).map(([key, concept]) => (
                  <option key={key} value={key}>{concept.name}</option>
                ))}
              </select>
            </div>
            
            {/* Type Filter */}
            <div className="w-full md:w-1/3">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Type
              </label>
              <select 
                id="type" 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-field"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-gray-600">
              No resources match your filters. Try adjusting your search criteria.
            </p>
            <button
              onClick={() => {
                setSelectedConcept('all');
                setSelectedType('all');
                setSearchQuery('');
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                {/* Resource Thumbnail */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">[Image: {resource.thumbnailUrl}]</span>
                </div>
                
                {/* Resource Content */}
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${
                        resource.type === 'Interactive' 
                          ? 'bg-blue-100 text-blue-800' 
                          : resource.type === 'Video'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {resource.type}
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {resource.estimatedTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1">{resource.title}</h3>
                  
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  
                  <div className="mb-3">
                    <span className="text-xs text-gray-500">
                      Concept: {conceptData[resource.concept as keyof typeof conceptData]?.name}
                    </span>
                  </div>
                  
                  <div className="mb-4 flex flex-wrap gap-1">
                    {resource.targetSkills.map((skill, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-50 text-primary-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={resource.url}
                    className="btn-primary text-sm py-2 w-full text-center block"
                  >
                    View Resource
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination (simplified) */}
        {filteredResources.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 rounded-md bg-primary-50 text-primary-600 font-medium border border-primary-200">
                1
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
} 