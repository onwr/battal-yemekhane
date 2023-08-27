import React, { useCallback, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SifremiUnuttum = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email) {
        return;
      }

      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("E-Posta adresinizi kontrol edin.");
        })
        .catch(() => {
          alert("Böyle bir e-posta adresi yok.");
        });
    },
    [email]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 py-6 px-12 flex flex-col justify-center sm:py-12"
    >
      <div className="py-3">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Şifremi Unuttum
        </h2>
        <div className="mt-8 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-posta Adresi
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-Posta"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
            />
            <div className="mt-4">
              <button
                onClick={handleSubmit}
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Şifremi Sıfırla
              </button>
            </div>
            <div className="mt-4">
              <Link
                to="/"
                className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Giriş Yap
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default SifremiUnuttum;
