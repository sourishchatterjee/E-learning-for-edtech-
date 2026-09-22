

import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './VerifyOtp.css';
import CodingAmico from '../../../assets/Coding-amico 2.png';
import { verifyOtp, sendOtp } from '../../../api/userApiFunctions/userApis';
import Layout from '../../../layout/Layout';

const VerifyOtp = () => {
  const { email } = useParams();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(120);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [isResending, setIsResending] = useState(false); 

  const inputRefs = useRef([]);

  // Timer Logic
  useEffect(() => {
    if (timer === 0) {
      setResendDisabled(false);
      return;
    }
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // OTP Input Change
  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Auto submit when all 4 are filled
  useEffect(() => {
    if (otp.every(val => val !== '')) {
      handleSubmit();
    }
  }, [otp]);

  // OTP Submission
  const handleSubmit = async () => {
    const fullOtp = otp.join('');
    const response = await verifyOtp({ email, otp: fullOtp });

    if (response.status === 200) {
      toast.success(response.data.message || "OTP Verified");
      navigate(`/update-password/${email}`, { replace: true });
    } else {
      toast.error(response.data?.message || "Invalid OTP");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      setIsResending(true); //  start spinner
      const response = await sendOtp(email);

      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setTimer(120);
        setResendDisabled(true);
        setOtp(['', '', '', '']);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(response.data?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error("Something went wrong while resending OTP");
    } finally {
      setIsResending(false); // stop spinner no matter what
    }
  };

  // Block paste, context menu and shortcuts
  const preventPasteShortcuts = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <section className="main-section">
        <div className="content-container">
          <div className="row content-row">
            <div className="col-lg-6 left-side">
              <div className="illustration-container">
                <img src={CodingAmico} className="illustration-img" alt="Coding Illustration" />
              </div>
            </div>

            <div className="col-lg-6 right-side">
              <div className="form-container">
                <div className="glass-effect p-4 p-md-6">
                  <h2 className="text-center">Verify OTP</h2>
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="mb-3 d-none">
                      <input
                        type="email"
                        value={email}
                        readOnly
                        className="form-control"
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Verification Code</label>
                      <div className="d-flex justify-content-center">
                        {[0, 1, 2, 3].map((_, idx) => (
                          <input
                            key={idx}
                            type="text"
                            className="form-control otp-input mx-1 text-center"
                            maxLength="1"
                            value={otp[idx]}
                            onChange={e => handleChange(idx, e.target.value)}
                            ref={el => (inputRefs.current[idx] = el)}
                            onPaste={preventPasteShortcuts}
                            onContextMenu={preventPasteShortcuts}
                            onKeyDown={(e) => {
                              if ((e.ctrlKey || e.metaKey) && ['v', 'V'].includes(e.key)) {
                                preventPasteShortcuts(e);
                              }
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="text-center mb-2 text-white">
                      {resendDisabled ? `Resend OTP in ${timer}s` : 'Didn’t receive the code?'}
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary w-100 mb-2 d-flex align-items-center justify-content-center"
                      onClick={handleResendOtp}
                      disabled={resendDisabled || isResending}
                    >
                      {isResending ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        'Resend OTP'
                      )}
                    </button>

                    <div className="divider">
                      <div className="divider-line"></div>
                      <div className="divider-text">Or Continue With</div>
                      <div className="divider-line"></div>
                    </div>

                    <div className="social-icons text-center">
                      <Link to="#" className="social-icon facebook mx-2"><i className="fab fa-facebook-f"></i></Link>
                      <Link to="#" className="social-icon google mx-2"><i className="fab fa-google"></i></Link>
                      <Link to="#" className="social-icon twitter mx-2"><i className="fab fa-twitter"></i></Link>
                    </div>

                    <p className="text-center text-white small mt-2">
                      Don't Have An Account?{' '}
                      <Link to="/signup" className="sign-up-link">Sign Up Here</Link>
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

export default VerifyOtp;
