

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './UpdatePassword.css';
import CodingAmico2 from '../../../assets/forgotPassword/Coding-amico2.png';
import { updatePassword } from '../../../api/userApiFunctions/userApis';
import Layout from '../../../layout/Layout';

const UpdatePassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email || '',
      password: '',
      confirm_password: '',
    },
  });

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error('Passwords do not match!');
      return;
    }

    setIsSubmitting(true);
    const response = await updatePassword({
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    });

    setIsSubmitting(false);

    if (response?.status === 200) {
      toast.success(response.data.message);
      navigate('/login', { replace: true });
    } else {
      toast.error(response?.data?.message || 'Something went wrong');
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
                  <h2 className="text-center">Reset Password</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register('email')} />

                    <div className="mb-3 mt-1">
                      <label htmlFor="password" className="form-label">Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-lock form-icon"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="••••••••"
                          {...register('password', {
                            required: 'Password is required',
                            pattern: {
                              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                              message:
                                'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character',
                            },
                          })}
                        />
                      </div>
                      {errors.password && (
                        <p className="text-danger small">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="mb-2 mt-1">
                      <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-lock form-icon"></i>
                        </span>
                        <input
                          type="password"
                          className="form-control"
                          id="confirm_password"
                          placeholder="••••••••"
                          {...register('confirm_password', {
                            required: 'Please confirm your password',
                            validate: (value) =>
                              value === watch('password') || 'Passwords do not match',
                          })}
                        />
                      </div>
                      {errors.confirm_password && (
                        <p className="text-danger small">{errors.confirm_password.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 mb-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            style={{ width: "1rem", height: "1rem" }}
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Updating Password...
                        </span>
                      ) : (
                        'Continue'
                      )}
                    </button>

                    <div className="divider">
                      {/* <div className="divider-line"></div>
                      <div className="divider-text">Or Continue With</div>
                      <div className="divider-line"></div> */}
                    </div>

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
                      Don't Have An Account?{' '}
                      <Link to="/register" className="sign-up-link">
                        Sign Up Here
                      </Link>
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

export default UpdatePassword;
