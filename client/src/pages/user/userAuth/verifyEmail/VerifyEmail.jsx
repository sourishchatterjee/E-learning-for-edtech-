import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./VerifyEmail.css";
import { toast } from "react-toastify";
import { verifyEmail } from "../../../../api/userApiFunctions/userApis";


const VerifyEmail = () => {
    const [success, setSuccess] = useState(false);

    const verify_Email = async () => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        if (!token) {
            setSuccess(false);
            toast.error(" Token not found.Please try again.");
            console.error("Token not found in URL parameters.");
            return;
        }
        const response = await verifyEmail(token);
        if (response?.status === 200) {
            setSuccess(true);
        }
        else {
            setSuccess(false);
        }

    }

    useEffect(() => {
        verify_Email();
    }, [])
    return (
        <>
            {
                (success) &&  <div className="email-verify-page">
                <div className="container verify-email-container text-center py-5">
                    <svg viewBox="0 0 120 120" width="100" height="100">
                        <circle className="circle-bg" cx="60" cy="60" r="55" fill="none" stroke="#e0e0e0" strokeWidth="10" />
                        <polyline
                            className="check"
                            points="40,65 55,80 85,45"
                            fill="none"
                            stroke="#4CAF50"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="message pb-2 h4 mt-4">Email Verification Successful</div>
                    <div className="verified_btn">
                            <Link to='/login' className="btn btn-primary btn-lg px-5 py-2 w-auto">Log In</Link>
                    </div>
                </div>
            </div>
                   
            }
        </>
    );
};

export default VerifyEmail;

