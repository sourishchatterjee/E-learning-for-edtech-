// import React from 'react'

// import  CertificateCard  from '../../../../components/certificate/CertificateCard';
// import { getCertificates } from '../../../../api/userApiFunctions/certificateApi/CertificateApi';
// const UserCertificates = () => {
//     const user = "John Doe";
//     const passedCourses = [
//         {
//             courseId: "1",
//             course: "React for Beginners",
//             date: "May 10, 2025",
//             certificateId:"123456",
//         },
//         {
//             courseId: "2",
//             course: "Node.js Essentials",
//             date: "May 15, 2025",
//             certificateId:"123457"
//         },
//         {
//             courseId: "3",
//             course: "MongoDB Masterclass",
//             date: "May 18, 2025",
//             certificateId:"123457"
//         },
//     ];
//     return (
//         <div className="content-wrapper col-8 col-lg-10">
//             <div className="certificates-page container my-5">
//                 <h2 className="text-center mb-4">Your Certificates</h2>
//                 {passedCourses.map((Course) => (
//                     <CertificateCard
//                         key={Course.courseId}
//                         userName={user}
//                         courseName={Course.course}
//                         completionDate={Course.date}
//                         certificateId={Course.certificateId}
//                     />
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default UserCertificates;




















import React, { useEffect, useState } from 'react';
import CertificateCard from '../../../../components/certificate/CertificateCard';
import { getCertificates } from '../../../../api/userApiFunctions/certificateApi/CertificateApi';
import { useAuth } from '../../../../context/AuthProvider';

const UserCertificates = () => {
    const [auth] = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const [noCertificates, setNoCertificates] = useState(false);

    useEffect(() => {
        if (!auth.token) return;
        const fetchCertificates = async () => {
            try {
                const res = await getCertificates(auth.token);
                if (res?.status === 200 && res.data?.certificates?.length > 0) {
                    setCertificates(res.data.certificates);
                    setUserName(res.data.user);
                } else {
                    setNoCertificates(true);
                }
            } catch (error) {
                console.error("Error fetching certificates:", error);
                setNoCertificates(true);
            } finally {
                setLoading(false);
            }
        };

        fetchCertificates();
    }, [auth.token]);

    return (
        <div className="content-wrapper col-8 col-lg-10">
            <div className="certificates-page container my-5">
                <h2 className="text-center mb-4">Your Certificates</h2>

                {loading ? (
                    <div className="text-center">Loading certificates...</div>
                ) : noCertificates ? (
                    <div className="text-center text-muted">No certificates found.</div>
                ) : (
                    certificates.map((Course) => (
                        <CertificateCard
                            key={Course.courseId}
                            userName={userName}
                            courseName={Course.course}
                            completionDate={new Date(Course.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }).replace(/,/g, "")}
                            certificateId={Course.certificateId}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default UserCertificates;
