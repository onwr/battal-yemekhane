import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Register = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [isim, setIsim] = useState("");
  const [showError, setShowError] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();

      createUserWithEmailAndPassword(auth, email, sifre)
        .then((auth) => {
          updateProfile(auth.user, { displayName: isim });
          setSucces(true);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setShowError(true);
          }
        });
    },
    [isim, email, sifre]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            BMTAL <br />
            YEMEKHANE
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">
                Öğrenci Adı
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={isim}
                onChange={(e) => setIsim(e.currentTarget.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Öğrenci Adı"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                E-Mail
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="E-Mail"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Şifre
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={sifre}
                onChange={(e) => setSifre(e.currentTarget.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Şifre"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Kayıt Ol
            </button>
          </div>
        </form>
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-600 mt-2 text-center"
          >
            Bu e-posta adresi zaten kullanılıyor.
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-green-600 mt-2 text-center"
          >
            Kayıt Başarılı. Yönlendiriliyorsunuz
          </motion.div>
        )}
        <div className="flex items-center justify-center mt-4">
          <Link
            to="/"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Hesabınız var mı? Giriş yapın
          </Link>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default Register;
