import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Engel from "../components/ErisimEngeli";

const Panel = () => {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Yükleniyor...
          </span>
        </div>
      </div>
    );
  }

  const mailCek = localStorage.getItem("mail");

  if (user && mailCek !== "onur@gmail.com") {
    return <Engel />;
  }

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
