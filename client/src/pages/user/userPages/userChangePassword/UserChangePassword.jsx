// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
// import CodingAmico2 from '../../../../assets/forgotPassword/Coding-amico2.png';
// import Layout from '../../../../layout/Layout';
// import { useAuth } from '../../../../context/AuthProvider';
// import { userChangePassword } from '../../../../api/userApiFunctions/userApis';


// const UserChangePassword = () => {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [token] = useState(() => localStorage.getItem("token"));

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors }
//   } = useForm({
//     defaultValues: {
//       currentPassword: '',
//       newPassword: '',
//       confirm_Newpassword: ''
//     }
//   });

//   const onSubmit = async (data) => {
//     if (!token) {
//       toast.error("To change the password, login first.");
//       return;
//     }

//     if (data.newPassword !== data.confirm_Newpassword) {
//       toast.error("New passwords do not match!");
//       return;
//     }

//     setIsSubmitting(true);

//     const response = await userChangePassword({
//       currentPassword: data.currentPassword,
//       newPassword: data.newPassword,
//       confirm_Newpassword: data.confirm_Newpassword
//     }, token);

//     setIsSubmitting(false);

//     if (response?.status === 200) {
//       toast.success(response.data.message);
//       localStorage.removeItem("auth");
//       localStorage.removeItem("token");
//       setAuth({
//         existUser: null,
//         token: "",
//       });
//       navigate("/login",{ replace: true });
//     } else {
//       toast.error(response?.data?.message || "Login to change password.");
//     }
//   };

//   return (
//     <Layout>
//       <section className="main-section">
//         <div className="content-container">
//           <div className="row content-row">
//             <div className="col-lg-6 left-side">
//               <div className="illustration-container">
//                 <img src={CodingAmico2} className="illustration-img" alt="Coding Illustration" />
//               </div>
//             </div>

//             <div className="col-lg-6 right-side">
//               <div className="form-container">
//                 <div className="glass-effect p-4 p-md-5">
//                   <h2 className="text-center">Change Password</h2>
//                   <form onSubmit={handleSubmit(onSubmit)}>
//                     <div className="mb-3">
//                       <label htmlFor="currentPassword" className="form-label">Current Password</label>
//                       <div className="input-group">
//                         <span className="input-group-text"><i className="fas fa-lock form-icon"></i></span>
//                         <input
//                           type="password"
//                           className="form-control"
//                           id="currentPassword"
//                           placeholder="Enter current password"
//                           {...register('currentPassword', { required: 'Current password is required' })}
//                         />
//                       </div>
//                       {errors.currentPassword && <p className="text-danger small">{errors.currentPassword.message}</p>}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="newPassword" className="form-label">New Password</label>
//                       <div className="input-group">
//                         <span className="input-group-text"><i className="fas fa-lock form-icon"></i></span>
//                         <input
//                           type="password"
//                           className="form-control"
//                           id="newPassword"
//                           placeholder="Enter new password"
//                           {...register('newPassword', { required: 'New password is required' })}
//                         />
//                       </div>
//                       {errors.newPassword && <p className="text-danger small">{errors.newPassword.message}</p>}
//                     </div>

//                     <div className="mb-3">
//                       <label htmlFor="confirm_Newpassword" className="form-label">Confirm New Password</label>
//                       <div className="input-group">
//                         <span className="input-group-text"><i className="fas fa-lock form-icon"></i></span>
//                         <input
//                           type="password"
//                           className="form-control"
//                           id="confirm_Newpassword"
//                           placeholder="Confirm new password"
//                           {...register('confirm_Newpassword', {
//                             required: 'Please confirm new password',
//                             validate: value => value === watch('newPassword') || 'Passwords do not match'
//                           })}
//                         />
//                       </div>
//                       {errors.confirm_Newpassword && <p className="text-danger small">{errors.confirm_Newpassword.message}</p>}
//                     </div>

//                     <button type="submit" className="btn btn-primary w-100 mb-2" disabled={isSubmitting}>
//                       {isSubmitting ? (
//                         <span>
//                           <span className="spinner-border spinner-border-sm me-2" style={{ width: "1rem", height: "1rem" }} role="status" aria-hidden="true"></span>
//                           Changing Password...
//                         </span>
//                       ) : 'Change Password'}
//                     </button>


//                     <div className="social-icons">
//                       <Link to="#" className="social-icon facebook">
//                         <i className="fab fa-facebook-f"></i>
//                       </Link>
//                       <Link to="#" className="social-icon google">
//                         <i className="fab fa-google"></i>
//                       </Link>
//                       <Link to="#" className="social-icon twitter">
//                         <i className="fab fa-twitter"></i>
//                       </Link>
//                     </div>

//                     <p className="text-center text-white small mt-2">
//                       Don't Have An Account? <Link to="#" className="sign-up-link">Sign Up Here</Link>
//                     </p>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default UserChangePassword;
















import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import CodingAmico2 from '../../../../assets/forgotPassword/Coding-amico2.png';
import Layout from '../../../../layout/Layout';
import { useAuth } from '../../../../context/AuthProvider';
import { userChangePassword } from '../../../../api/userApiFunctions/userApis';

const UserChangePassword = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token] = useState(() => localStorage.getItem("token"));

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirm_Newpassword: ''
    }
  });

  const onSubmit = async (data) => {
    if (!token) {
      toast.error("To change the password, login first.");
      return;
    }

    if (data.newPassword !== data.confirm_Newpassword) {
      toast.error("New passwords do not match!");
      return;
    }

    setIsSubmitting(true);

    const response = await userChangePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      confirm_Newpassword: data.confirm_Newpassword
    }, token);

    setIsSubmitting(false);

    if (response?.status === 200) {
      toast.success(response.data.message);
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      setAuth({
        existUser: null,
        token: "",
      });
      navigate("/login", { replace: true });
    } else {
      toast.error(response?.data?.message || "Login to change password.");
    }
  };

  return (
    <Layout>
      <section className="main-section">
        <div className="content-container">
          <div className="row content-row">
            <div className="col-lg-6 left-side">
              <div className="illustration-container">
                <img src={CodingAmico2} className="illustration-img" alt="Coding Illustration" />
              </div>
            </div>

            <div className="col-lg-6 right-side">
              <div className="form-container">
                <div className="glass-effect p-4 p-md-5">
                  <h2 className="text-center">Change Password</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label">Current Password</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-lock form-icon"></i></span>
                        <input
                          type="password"
                          className="form-control"
                          id="currentPassword"
                          placeholder="Enter current password"
                          {...register('currentPassword', { required: 'Current password is required' })}
                        />
                      </div>
                      {errors.currentPassword && <p className="text-danger small">{errors.currentPassword.message}</p>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label">New Password</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-lock form-icon"></i></span>
                        <input
                          type="password"
                          className="form-control"
                          id="newPassword"
                          placeholder="Enter new password"
                          {...register('newPassword', {
                            required: 'New password is required',
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                              message: 'Password must be at least 8 characters, include upper & lower case letters, a number and a special character',
                            },
                          })}
                        />
                      </div>
                      {errors.newPassword && <p className="text-danger small">{errors.newPassword.message}</p>}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirm_Newpassword" className="form-label">Confirm New Password</label>
                      <div className="input-group">
                        <span className="input-group-text"><i className="fas fa-lock form-icon"></i></span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm_Newpassword"
                          placeholder="Confirm new password"
                          {...register('confirm_Newpassword', {
                            required: 'Please confirm new password',
                            validate: value => value === watch('newPassword') || 'Passwords do not match'
                          })}
                        />
                      </div>
                      {errors.confirm_Newpassword && <p className="text-danger small">{errors.confirm_Newpassword.message}</p>}
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-2" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span>
                          <span className="spinner-border spinner-border-sm me-2" style={{ width: "1rem", height: "1rem" }} role="status" aria-hidden="true"></span>
                          Changing Password...
                        </span>
                      ) : 'Change Password'}
                    </button>

                    <div className="social-icons">
                      <Link to="#" className="social-icon facebook">
                        <i className="fab fa-facebook-f"></i>
                      </Link>
                      <Link to="#" className="social-icon google">
                        <i className="fab fa-google"></i>
                      </Link>
                      <Link to="#" className="social-icon twitter">
                        <i className="fab fa-twitter"></i>
                      </Link>
                    </div>

                    <p className="text-center text-white small mt-2">
                      Don't Have An Account? <Link to="#" className="sign-up-link">Sign Up Here</Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UserChangePassword;
