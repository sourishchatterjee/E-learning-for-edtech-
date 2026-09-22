import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import notFound from '../assets/page-not-found.svg'

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      }}
    >
      <motion.div
        className="text-center p-4 bg-white rounded-4 shadow-lg"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.img 
          src={notFound} 
          alt="404 Not Found" 
          className="img-fluid mb-4"
          style={{ maxWidth: '400px' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <h1 className="display-4 fw-bold text-primary">Page Not Found</h1>
        <p className="lead text-muted mb-4">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <motion.button
          className="btn btn-outline-primary btn-lg"
          onClick={handleBackHome}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
};

export default NotFound;
