// import { useEffect, useState } from "react";
// import { Search, Users, Filter, Eye, EyeOff } from "lucide-react";
// import getAllUser from "../../../../api/adminApiFunctions/getAllUsersApi/getAllusers";
// import {
//   blockUser,
//   unblockUser,
// } from "../../../../api/adminApiFunctions/getAllUsersApi/getAllusers";
// import "./ManageAllUsers.css";

// function ManageAllUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoading, setActionLoading] = useState(null); 
  

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllUser();
//       if (response?.data) {
//         setUsers(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleBlock = async (id) => {
//     try {
//       setActionLoading(id);
//       const res = await blockUser(id);
//       console.log("Block response:", res?.data);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error blocking user:", error.response?.data || error.message);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleUnblock = async (id) => {
//     try {
//       setActionLoading(id);
//       const res = await unblockUser(id);
//       console.log("Unblock response:", res?.data);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error unblocking user:", error.response?.data || error.message);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString();
//   };

  


//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-center">Manage All Users</h2>

//       {loading ? (
//         <p className="text-center">Loading users...</p>
//       ) : (
//         <table className="table table-striped table-bordered text-center">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>User Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Registered At</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.length > 0 ? (
//               users.map((user, index) => (
//                 <tr key={user._id}>
//                   <td>{index + 1}</td>
//                   <td>{user.name}</td>
//                   <td>{user.email}</td>
//                   <td>{user.roll}</td>
//                   <td>{formatDate(user.createdAt)}</td>
//                   <td>
//                     {user.isDeleted ? (
//                       <span className="badge bg-danger">Blocked</span>
//                     ) : (
//                       <span className="badge bg-success">Active</span>
//                     )}
//                   </td>
//                   <td>
//                     {user.isDeleted ? (
//                       <button
//                         className="btn btn-sm btn-success"
//                         onClick={() => handleUnblock(user._id)}
//                         disabled={actionLoading === user._id}
//                       >
//                         {actionLoading === user._id ? "Unblocking..." : "Unblock"}
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleBlock(user._id)}
//                         disabled={actionLoading === user._id}
//                       >
//                         {actionLoading === user._id ? "Blocking..." : "Block"}
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No users found.</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default ManageAllUsers;



















/////////////////////////////////////////////////////////////////////

// import { useEffect, useState } from "react";
// import { Search } from "lucide-react";
// import getAllUser, { blockUser, unblockUser } from "../../../../api/adminApiFunctions/getAllUsersApi/getAllusers";
// import "./ManageAllUsers.css";

// function ManageAllUsers() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [actionLoading, setActionLoading] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await getAllUser();
//       if (response?.data) {
//         setUsers(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleBlock = async (id) => {
//     try {
//       setActionLoading(id);
//       await blockUser(id);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error blocking user:", error.response?.data || error.message);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const handleUnblock = async (id) => {
//     try {
//       setActionLoading(id);
//       await unblockUser(id);
//       fetchUsers();
//     } catch (error) {
//       console.error("Error unblocking user:", error.response?.data || error.message);
//     } finally {
//       setActionLoading(null);
//     }
//   };

//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString();
//   };

//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="user-container">
//       <h2 className="user-title">Manage All Users</h2>

//       <div className="search-bar3">
//         {/* <Search size={4} /> */}
//         <input
//           type="text"
//           placeholder="Search by name or email..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {loading ? (
//         <p className="loading-text">Loading users...</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="user-table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>User Name</th>
//                 <th>Email</th>
//                 <th>Role</th>
//                 <th>Registered At</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>{user.name}</td>
//                     <td>{user.email}</td>
//                     <td>{user.roll}</td>
//                     <td>{formatDate(user.createdAt)}</td>
//                     <td>
//                       {user.isDeleted ? (
//                         <span className="badge danger">Blocked</span>
//                       ) : (
//                         <span className="badge success">Active</span>
//                       )}
//                     </td>
//                     <td>
//                       {user.isDeleted ? (
//                         <button
//                           className="action-button unblock"
//                           onClick={() => handleUnblock(user._id)}
//                           disabled={actionLoading === user._id}
//                         >
//                           {actionLoading === user._id ? "Unblocking..." : "Unblock"}
//                         </button>
//                       ) : (
//                         <button
//                           className="action-button block"
//                           onClick={() => handleBlock(user._id)}
//                           disabled={actionLoading === user._id}
//                         >
//                           {actionLoading === user._id ? "Blocking..." : "Block"}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No users found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ManageAllUsers;







import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import getAllUser, { blockUser, unblockUser } from "../../../../api/adminApiFunctions/getAllUsersApi/getAllusers";
import "./ManageAllUsers.css";

function ManageAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUser();
      if (response?.data) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlock = async (id) => {
    try {
      setActionLoading(id);
      await blockUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error blocking user:", error.response?.data || error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnblock = async (id) => {
    try {
      setActionLoading(id);
      await unblockUser(id);
      fetchUsers();
    } catch (error) {
      console.error("Error unblocking user:", error.response?.data || error.message);
    } finally {
      setActionLoading(null);
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  // Check if user is admin
  const isAdmin = (user) => {
    return user.roll?.toLowerCase() === 'admin';
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-container">
      <h2 className="user-title">Manage All Users</h2>

      <div className="search-bar3">
        {/* <Search size={4} /> */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <p className="loading-text">Loading users...</p>
      ) : (
        <div className="table-responsive">
          <table className="user-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Registered At</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.roll}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      {user.isDeleted ? (
                        <span className="badge danger">Blocked</span>
                      ) : (
                        <span className="badge success">Active</span>
                      )}
                    </td>
                    <td>
                      {isAdmin(user) ? (
                        <span className="admin-protected">Protected</span>
                      ) : user.isDeleted ? (
                        <button
                          className="action-button unblock"
                          onClick={() => handleUnblock(user._id)}
                          disabled={actionLoading === user._id}
                        >
                          {actionLoading === user._id ? "Unblocking..." : "Unblock"}
                        </button>
                      ) : (
                        <button
                          className="action-button block"
                          onClick={() => handleBlock(user._id)}
                          disabled={actionLoading === user._id}
                        >
                          {actionLoading === user._id ? "Blocking..." : "Block"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageAllUsers;