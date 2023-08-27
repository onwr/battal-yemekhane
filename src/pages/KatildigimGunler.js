import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ref = collection(db, "yemekler");

const KatilimGecmisi = () => {
  const [gecmis, setGecmis] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    async function fetchGecmis() {
      const querySnapshot = await getDocs(ref);

      const gecmisTarihler = [];
      querySnapshot.forEach((doc) => {
        const katilanlar = doc.data().katilanlar;
        if (katilanlar.includes(user?.email)) {
          gecmisTarihler.push({
            tarih: doc.data().tarih,
          });
        }
      });

      setGecmis(gecmisTarihler);
    }

    fetchGecmis();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
    >
      <div className="py-3">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Yemekhane <br />
          Katılım Geçmişi
        </h2>
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {gecmis.length === 0 ? (
              <>
                <div className=" bg-red-200 m-12 rounded-md ">
                  <p className="text-gray-600 text-2xl font-semibold text-center py-4">
                    Gösterilecek katılım bulunamadı.
                  </p>
                  <Link
                    to="/anasayfa"
                    className="flex justify-center py-2 border border-transparent text-lg  font-medium rounded-b-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Anasayfaya Dön
                  </Link>
                </div>
              </>
            ) : (
              <ol className="flex flex-col items-center justify-center">
                {gecmis.map((gecmis, sayi) => (
                  <li
                    className="p-3 text-center w-72 lg:w-96 bg-white rounded-md m-5 font-medium"
                    key={sayi}
                  >
                    <p>{gecmis.tarih}</p>
                  </li>
                ))}
              </ol>
            )}
          </motion.div>
        </div>
        <div className="flex justify-center items-center text-center">
          <Link
            to="/anasayfa"
            whilehover={{ scale: 0.55 }}
            whiletap={{ scale: 0.55 }}
            className="mt-3 w-72 lg:w-96 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Anasayfaya Dön
          </Link>
        </div>
        <Footer />
      </div>
    </motion.div>
  );
};

export default KatilimGecmisi;
