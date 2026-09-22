import { useState } from "react";
import { addCourse } from "../../../../api/adminApiFunctions/getAllCourseApi/getAllCourses";
import "./AddCourses.css";

function AddCourses() {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    image: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("category", formData.category);
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("image", formData.image);

    const response = await addCourse(data);
    if (response?.status === 200 || response?.status === 201) {
      setMessage("Course added successfully!");
      setFormData({
        category: "",
        title: "",
        description: "",
        price: "",
        image: null,
      });
    } else {
      setMessage("Failed to add course.");
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add New Course</h2>
      <form onSubmit={handleSubmit} className="add-course-form">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Course Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept=".jpg,.jpeg,.png"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Course</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default AddCourses;
