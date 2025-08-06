import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

function AddCourses() {
  const [allCourses, setAllCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Fetch courses on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/courses/registration')
      .then(res => res.json())
      .then(data => setAllCourses(data))
      .catch(err => console.error('Server error', err));

    fetch('http://localhost:5000/api/student/courses', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.courses) {
          setSelectedCourses(data.courses);
        }
      })
      .catch(err => console.error('Failed to load selected courses'));
  }, []);

  const handleAddCourse = (course) => {
    setSelectedCourses(prev => prev.includes(course) ? prev : [...prev, course]);
  };

  const removeCourse = (courseToRemove) => {
    setSelectedCourses(prev => prev.filter(course => course !== courseToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/student/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ selectedCourses }),
      });

      const data = await res.json();
      if (data.success) {
        alert('Courses updated successfully');
      } else {
        alert('Failed to update courses');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="ml-64 mx-auto p-10 bg-white rounded-lg shadow-lg">
      <Sidebar />
      {/* Selected Courses Section */}
      {selectedCourses.length > 0 && (
        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Selected Courses</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {selectedCourses.map((course, index) => (
                <div
                key={index}
                className="relative bg-white border border-blue-300 rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition"
                >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 text-blue-600 text-xl font-bold">
                    📘
                </div>
                <h4 className="text-gray-800 font-semibold text-lg mb-2">{course}</h4>

                <button
                    onClick={() => removeCourse(course)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl "
                    aria-label={`Remove ${course}`}
                >
                    ✖
                </button>
                </div>
            ))}
            </div>
        </div>
    )}

      {/* Available Courses Section */}
      <div className="mb-1">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Courses</h3>
        {/* <h2 className="text-2xl font-semibold mb-6 text-blue-700">Add Courses</h2> */}
        <div className="flex flex-wrap gap-2">
            {allCourses.map((c) =>
            c.subCourses.map((sub, idx) => {
                const fullName = `${c.courseName} - ${sub}`;
                const isSelected = selectedCourses.includes(fullName);

                return (
                <div
                    key={`${c.courseName}-${idx}`}
                    onClick={() => !isSelected && handleAddCourse(fullName)}
                    className={`w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.66rem)] cursor-pointer p-4 rounded-lg shadow-md border transition text-center  ${
                    isSelected
                        ? 'bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white hover:bg-blue-50 border-blue-300 text-gray-800'
                    }`}
                >
                    <div className="text-lg font-medium">{sub}</div>
                    <div className="text-sm text-gray-500">{c.courseName}</div>
                </div>
                );
            })
            )}
        </div>
        </div>

      <button
        onClick={handleSubmit}
        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition"
        type="button"
      >
        Save
      </button>
    </div>
  );
}

export default AddCourses;
