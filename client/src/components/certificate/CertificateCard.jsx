


import React, { useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./certificate.css";

const CertificateCard = ({ userName, courseName, completionDate,certificateId }) => {
  // useEffect(() => {
  //   AOS.init({ duration: 1000 });
  // }, []);

  const certificateRef = useRef();

  const handleDownload = async () => {
    const input = certificateRef.current;
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${courseName}_certificate.pdf`);
  };

  const handlePrint = () => {
    const printContents = certificateRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Certificate</title>
          <link rel="stylesheet" href="/styles/certificate.css" />
          <style>
            body { margin: 0; padding: 40px; }
          </style>
        </head>
        <body>${printContents}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };


  return (
    <div className="certificate-container" data-aos="fade-up">
      <div className="certificate" ref={certificateRef}>
        <div className="certificate-id-top">Certificate ID: {certificateId}</div>

        <div className="certificate-header">
          <h1>Certificate of Completion</h1>
          <p className="platform-name">
            Presented by <strong>Upskilling</strong>
          </p>
        </div>

        <div className="certificate-body">
          <p>This is to certify that</p>
          <h2 className="student-name">{userName}</h2>
          <p>has successfully completed the course</p>
          <h3 className="course-name">“{courseName}”</h3>
          <p className="completion-date">on {completionDate}</p>
        </div>

        <div className="certificate-footer">
          <div className="signature-block">
            <img
              src="/signature.png"
              alt="Signature"
              className="signature-img"
            />
            <p>Instructor</p>
          </div>
          <div className="signature-block">
            <img
              src="/seal.png"
              alt="Seal"
              className="signature-img"
            />
            <p>Upskilling</p>
          </div>
        </div>
      </div>

      <div className="download-btn-container">
        <button className="download-btn me-2" onClick={handleDownload}>
          Download PDF
        </button>
        <button className="print-btn" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;

