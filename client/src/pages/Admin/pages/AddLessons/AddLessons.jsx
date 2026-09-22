

// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import addLessons from "../../../../api/adminApiFunctions/addLessons/addLessonsApi";

// const AddLessons = () => {
//   const { courseId } = useParams(); // Get course ID from URL
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [duration, setDuration] = useState("");
//   const [video, setVideo] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("duration", duration);
//     if (video) {
//       formData.append("video", video); // Make sure backend expects 'video' field
//     }

//     try {
//       const response = await addLessons(courseId, formData);
//       console.log("Lesson added:", response.data);
//       navigate(`/admin/edit-course/${courseId}`); // Redirect back to course edit
//     } catch (error) {
//       console.error("Error adding lesson:", error?.response?.data || error.message);
//       alert("Failed to add lesson.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4 text-center">Add New Lesson</h2>
//       <form onSubmit={handleSubmit} className="row g-3 justify-content-center">
//         <div className="col-md-8">
//           <label className="form-label">Lesson Title</label>
//           <input
//             type="text"
//             className="form-control"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>

//         <div className="col-md-8">
//           <label className="form-label">Duration (e.g., 19m)</label>
//           <input
//             type="text"
//             className="form-control"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             placeholder="e.g. 19m"
//             required
//           />
//         </div>

//         <div className="col-md-8">
//           <label className="form-label">Upload Video</label>
//           <input
//             type="file"
//             className="form-control"
//             accept="video/*"
//             onChange={(e) => setVideo(e.target.files[0])}
//             required
//           />
//         </div>

//         <div className="col-md-8 d-grid">
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? "Adding..." : "Add Lesson"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddLessons;



import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  LinearProgress,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import addLessons from "../../../../api/adminApiFunctions/addLessons/addLessonsApi";
import "./addlesons.css";
const AddLessons = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    if (video) formData.append("video", video);

    try {
      const response = await addLessons(courseId, formData, (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      });

      console.log("Lesson added:", response.data);
      navigate(`/admindashboard/allcourses`);//
    } catch (error) {
      console.error("Error adding lesson:", error?.response?.data || error.message);
      alert("Failed to add lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Paper elevation={3} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        <Typography variant="h5" mb={3} textAlign="center">
          Add New Lesson
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Lesson Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Duration (e.g. 19m)"
            variant="outlined"
            margin="normal"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ my: 2 }}
          >
            {video ? video.name : "Upload Video"}
            <input
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => setVideo(e.target.files[0])}
              required
            />
          </Button>

          {loading && (
            <Box my={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Uploading: {uploadProgress}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Adding..." : "Add Lesson"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddLessons;
