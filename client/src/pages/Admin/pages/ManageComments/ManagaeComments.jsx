
// import React, { useEffect, useState } from "react";
// import getAllComments, {
//   enableComment,
//   disableComment,
// } from "../../../../api/adminApiFunctions/getAllUsersComment/getAllComments";
// import './ManageComments.css';

// const ManageComments = () => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await getAllComments();
//         if (response?.data?.courseComment) {
//           const commentsWithStatus = response.data.courseComment.map((comment) => ({
//             ...comment,
//             approved: comment.isDelete === false, // true if not deleted
//           }));
//           setComments(commentsWithStatus);
//         } else {
//           setError("No comments found");
//         }
//       } catch (err) {
//         setError("Failed to load comments");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchComments();
//   }, []);

//   const renderStars = (rating) => {
//     const stars = [];
//     const totalStars = 5;
//     for (let i = 1; i <= totalStars; i++) {
//       stars.push(
//         <span key={i} className={i <= rating ? "text-warning" : "text-muted"}>
//           {i <= rating ? "★" : "☆"}
//         </span>
//       );
//     }
//     return stars;
//   };

//   const toggleApproval = async (id, isCurrentlyApproved) => {
//     try {
//       if (isCurrentlyApproved) {
//         await disableComment(id);
//       } else {
//         await enableComment(id);
//       }

//       setComments((prev) =>
//         prev.map((comment) =>
//           comment._id === id ? { ...comment, approved: !isCurrentlyApproved } : comment
//         )
//       );
//     } catch (err) {
//       console.error("Failed to update comment status:", err);
//       alert("Failed to update comment status.");
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-5">Loading comments...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-5 text-danger">{error}</div>;
//   }

//   return (
//     <div className="container py-5">
//       <h2 className="mb-4">Manage Course Comments</h2>
//       <div className="table-responsive">
//         <table className="table table-hover align-middle shadow-sm rounded overflow-hidden">
//           <thead className="bg-primary text-white">
//             <tr>
//               <th>User Info</th>
//               <th>Comment</th>
//               <th>Rating</th>
//               <th>Category</th>
//               <th>Course Title</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {comments.map((comment) => (
//               <tr key={comment._id}>
//                 <td>
//                   <strong>{comment.userDetails?.name || "Anonymous"}</strong>
//                   <br />
//                   <small className="text-muted">{comment.userDetails?.email || "No email"}</small>
//                 </td>
//                 <td className="text-truncate" style={{ maxWidth: "300px" }}>
//                   {comment.comment}
//                 </td>
//                 <td>
//                   <div className="d-flex align-items-center">
//                     {renderStars(comment.rating)}
//                     <span className="ms-2 fw-bold">{comment.rating}</span>
//                   </div>
//                 </td>
//                 <td>
//                   <span className="badge bg-info text-dark">
//                     {comment.courseCategory?.category || "N/A"}
//                   </span>
//                 </td>
//                 <td>
//                   <span className="badge bg-secondary text-light">
//                     {comment.courseCategory?.title.slice(0, 20) || "N/A"}
//                   </span>
//                 </td>
//                 <td>
//                   <div className="form-check form-switch d-flex align-items-center">
//                     <input
//                       className="form-check-input"
//                       type="checkbox"
//                       role="switch"
//                       checked={comment.approved}
//                       onChange={() => toggleApproval(comment._id, comment.approved)}
//                     />
//                     <label className="form-check-label ms-2">
//                       {comment.approved ? "Approved" : "Pending"}
//                     </label>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageComments;




import React, { useEffect, useState } from "react";
import getAllComments, {
  enableComment,
  disableComment,
} from "../../../../api/adminApiFunctions/getAllUsersComment/getAllComments";
import './ManageComments.css';

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getAllComments();
        if (response?.data?.courseComment) {
          const commentsWithStatus = response.data.courseComment.map((comment) => ({
            ...comment,
            approved: comment.isDelete === false,
          }));
          setComments(commentsWithStatus);
        } else {
          setError("No comments found");
        }
      } catch (err) {
        setError("Failed to load comments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const totalStars = 5;
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "manage-comments-text-warning" : "manage-comments-text-muted"}>
          {i <= rating ? "★" : "☆"}
        </span>
      );
    }
    return stars;
  };

  const toggleApproval = async (id, isCurrentlyApproved) => {
    try {
      if (isCurrentlyApproved) {
        await disableComment(id);
      } else {
        await enableComment(id);
      }

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? { ...comment, approved: !isCurrentlyApproved } : comment
        )
      );
    } catch (err) {
      console.error("Failed to update comment status:", err);
      alert("Failed to update comment status.");
    }
  };

  if (loading) {
    return <div className="manage-comments-text-center manage-comments-py-5">Loading comments...</div>;
  }

  if (error) {
    return <div className="manage-comments-text-center manage-comments-py-5 manage-comments-text-danger">{error}</div>;
  }

  return (
    <div className="manage-comments-container">
      <h2 className="manage-comments-title">Manage Course Comments</h2>
      <div className="manage-comments-table-responsive">
        <table className="manage-comments-table">
          <thead className="manage-comments-thead">
            <tr>
              <th>User Info</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Course Title</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment._id}>
                <td>
                  <strong>{comment.userDetails?.name || "Anonymous"}</strong>
                  <br />
                  <small className="manage-comments-text-muted">{comment.userDetails?.email || "No email"}</small>
                </td>
                <td className="manage-comments-text-truncate" style={{ maxWidth: "300px" }}>
                  {comment.comment.slice(0, 10)}
                </td>
                <td>
                  <div className="manage-comments-stars">
                    {renderStars(comment.rating)}
                    <span className="manage-comments-rating-value">{comment.rating}</span>
                  </div>
                </td>
                <td>
                  <span className="manage-comments-badge-info">
                    {comment.courseCategory?.category || "N/A"}
                  </span>
                </td>
                <td>
                  <span className="manage-comments-badge-secondary">
                    {comment.courseCategory?.title.slice(0, 20) || "N/A"}
                  </span>
                </td>
                <td>
                  <div className="manage-comments-form-switch">
                    <input
                      className="manage-comments-form-check-input"
                      type="checkbox"
                      checked={comment.approved}
                      onChange={() => toggleApproval(comment._id, comment.approved)}
                    />
                    <label className="manage-comments-form-check-label">
                      {comment.approved ? "Approved" : "Pending"}
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageComments;
