import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [sifre2, setSifre2] = useState("");
  const [error, setError] = useState(false);

  const isimCek = localStorage.getItem("isim");
  const mailCek = localStorage.getItem("mail");

  console.log(mailCek);

  const handleLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !sifre) {
        return;
      }

      signInWithEmailAndPassword(auth, email, sifre)
        .then(() => {})
        .catch(() => {
          setError(true);
        });
    },
    [email, sifre]
  );

  const storageLogin = useCallback(
    (e) => {
      e.preventDefault();
      if (!sifre2) {
        return;
      }

      signInWithEmailAndPassword(auth, mailCek, sifre2)
        .then(() => {})
        .catch(() => {
          setError(true);
        });
    },
    [mailCek, sifre2]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-6">
        {isimCek ? (
          <>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              <p className="text-2xl font-extralight">Tekrardan hoş geldin,</p>
              {isimCek}
            </h2>
            <form onSubmit={storageLogin}>
              <div>
                <input
                  id="sifre"
                  name="sifre"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={sifre2}
                  onChange={(e) => setSifre2(e.currentTarget.value)}
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Şifre"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="group mt-6 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Giriş Yap
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              BMTAL <br />
              YEMEKHANE
            </h2>

            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    E-Mail
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="E-Mail"
                  />
                </div>
                <div>
                  <label htmlFor="sifre" className="sr-only">
                    Şifre
                  </label>
                  <input
                    id="sifre"
                    name="sifre"
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
                  Giriş Yap
                </button>
              </div>
            </form>
            <div className="flex flex-col items-center justify-center mt-4">
              <Link
                to="/kayit-ol"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Hesabınız yok mu? Kayıt olun
              </Link>
              <p>Veya</p>
              <Link
                to="/sifremi-unuttum"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Şifremi Unuttum?
              </Link>
            </div>
          </>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-600 mt-2 text-center"
          >
            E-posta veya Şifre hatalı.
          </motion.div>
        )}
        <Footer />
      </div>
    </motion.div>
  );
};

export default Login;
