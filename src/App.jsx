import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const App = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    batch: "",
  });

  // State to manage form errors
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Validate the form
    const errors = validateForm(formData);
    setFormErrors(errors);

    // If there are validation errors, stop the submission
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      // Send a POST request to your backend API
      const response = await axios.post(
        import.meta.env.VITE_ENDPOINT,
        formData
      );
      toast.success(response.data.message);
      setFormData({ name: "", email: "", age: "", batch: "" });
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // Function to validate the form data
  const validateForm = (data) => {
    const errors = {};

    // Simple validation example, you can add more complex validation logic
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    }

    if (!data.age || isNaN(data.age) || data.age < 18 || data.age > 65) {
      errors.age = "Age must be between 18 and 65";
    }

    if (!data.batch) {
      errors.batch = "Batch selection is required";
    }

    return errors;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 shadow-lg bg-gray-100 rounded-md">
      <h2 className="text-xl font-bold mb-4">Yoga Class Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.name ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.email ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-600"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.age ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {formErrors.age && (
            <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="batch"
            className="block text-sm font-medium text-gray-600"
          >
            Batch
          </label>
          <select
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleInputChange}
            className={`mt-1 p-2 w-full border ${
              formErrors.batch ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          >
            <option value="">Select Batch</option>
            <option value="1">6 AM - 7 AM</option>
            <option value="2">7 AM - 8 AM</option>
            <option value="3">8 AM - 9 AM</option>
            <option value="4">5 PM - 6 PM</option>
          </select>
          {formErrors.batch && (
            <p className="text-red-500 text-sm mt-1">{formErrors.batch}</p>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
