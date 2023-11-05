import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Panel = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            Yönetim Paneli
          </h2>
        </div>
        <div className="flex justify-center">
          <Link
            to="/kart/islem"
            className="mt-3 w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Kart işlemleri
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/menu/duzenle"
            className="mt-3 w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Menü işlemleri
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/menu/menuler"
            className="mt-3 w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Menüler
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/ucret/duzenle"
            className="mt-3 w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Üçretleri Düzenle
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/anasayfa"
            className="mt-3 w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Anasayfaya Dön
          </Link>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Panel;
