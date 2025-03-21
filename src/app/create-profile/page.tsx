'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateProfile() {
  const router = useRouter();
  const [childName, setChildName] = useState('');
  const [age, setAge] = useState('6');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // TODO: Implement actual profile creation with API
      console.log('Creating profile with:', { childName, age });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create profile. Please try again.');
      console.error('Profile creation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-display font-bold text-gray-900">
          Create your child's profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We'll use this information to personalize their learning experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
                Child's name
              </label>
              <div className="mt-1">
                <input
                  id="childName"
                  name="childName"
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="mt-1">
                <select
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-field"
                >
                  <option value="5">5 years old</option>
                  <option value="6">6 years old</option>
                  <option value="7">7 years old</option>
                  <option value="8">8 years old</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grade level
              </label>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg p-4 hover:border-primary-500 cursor-pointer bg-primary-50 border-primary-500">
                  <input
                    id="first-grade"
                    name="grade"
                    type="radio"
                    defaultChecked
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                  />
                  <label htmlFor="first-grade" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
                    1st Grade
                    <p className="text-xs text-gray-500 mt-1">
                      For children typically 6-7 years old
                    </p>
                  </label>
                </div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Currently, we only support 1st grade assessment and resources
              </p>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating profile...' : 'Create profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-sm text-gray-600 hover:text-primary-500"
        >
          Skip this step
        </button>
      </div>
    </div>
  );
} 