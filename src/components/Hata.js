import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <h1 className="text-4xl text-center font-extrabold mb-4">
        Sayfa Bulunamadı.
      </h1>
      <p className="text-lg text-gray-600 mb-8">Böyle bir sayfa yok.</p>
      <Link
        to="/"
        className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300"
      >
        Anasayfaya Dön
      </Link>
      <Footer />
    </motion.div>
  );
};

export default NotFound;
