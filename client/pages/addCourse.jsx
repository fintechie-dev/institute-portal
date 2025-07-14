import { useState } from "react";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    subCourses: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      courseName: formData.courseName,
      subCourses: formData.subCourses.split(',').map((course) => course.trim())
    };

    fetch("http://localhost:5000/api/courses/addcourses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Course added:", data);
        alert("Course submitted successfully!");
        setFormData({ courseName: "", subCourses: "" });
      })
      .catch((err) => {
        console.error("Error in adding course details", err);
        alert("Something went wrong!");
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold mb-6 text-center">Add New Course</h2>

        <input
          type="text"
          required
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="Enter Course Category"
          className="w-full p-3 mb-4 border rounded"
        />

        <input
          type="text"
          required
          name="subCourses"
          value={formData.subCourses}
          onChange={handleChange}
          placeholder="Enter Subcourses (comma separated)"
          className="w-full p-3 mb-4 border rounded"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
