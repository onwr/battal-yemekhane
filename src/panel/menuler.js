import React, { useState, useEffect } from "react";
import { query, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Menuler = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    async function fetchMenus() {
      const q = query(collection(db, "yemekler"));

      const querySnapshot = await getDocs(q);

      const items = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const tarih = data.tarih;
        const katilanlarSayisi = data.katilanlar.length;

        items.push({ tarih, katilanlarSayisi });
      });

      setMenuItems(items);
    }

    fetchMenus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8"
    >
      <header className="text-3xl font-extrabold text-gray-900 mb-4">
        Battalgazi MTAL
      </header>
      <div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <motion.ol
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {menuItems.map((item, index) => (
            <div
              className="bg-white rounded-lg p-4 mb-4 border border-gray-400  w-full max-w-md"
              key={index}
            >
              <li>
                <p className="font-extrabold">{item.tarih} Tarihinde,</p>
                {item.katilanlarSayisi} kişi yemekhaneye katılacak.
              </li>
            </div>
          ))}
        </motion.ol>
      </div>
      <Link
        to="/anasayfa"
        className="mt-3 w-72 lg:w-96 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Anasayfaya Dön
      </Link>
      <Footer />
    </motion.div>
  );
};

export default Menuler;
