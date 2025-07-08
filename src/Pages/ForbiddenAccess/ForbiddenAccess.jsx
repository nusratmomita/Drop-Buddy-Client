/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const ForbiddenAccess = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mt-5 min-h-screen flex items-center justify-center  px-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
        <img
          src="https://media.giphy.com/media/jQqU9dG4zEMjyz0Gyy/giphy.gif"
          alt="Access Denied"
          className="w-48 h-48 mx-auto mb-6 rounded-lg shadow"
        />

        <h1 className="text-4xl font-bold text-red-500 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6 text-2xl">
          Sorry, you don’t have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#CAEB66] text-2xl text-black px-5 py-2 rounded-xl  transition duration-300"
        >
          <FaArrowLeft />
          Back to Home
        </Link>
      </div>
    </motion.div>
  );
};

export default ForbiddenAccess;
