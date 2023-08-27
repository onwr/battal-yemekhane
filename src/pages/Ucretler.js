import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";

const Ucretler = () => {
  const [fiyat, setFiyat] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const veriCek = async () => {
      try {
        const docRef = doc(db, "fiyatlar", "keAJMqIVtjtQ06aPhTz9");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFiyat(docSnap.data());
        } else {
          console.log("Belirtilen belge bulunamadı.");
        }

        setIsLoading(false); // Veri çekme tamamlandı, yükleme durumu kapatılıyor
      } catch (error) {
        console.error("Veri çekme hatası:", error);
        setIsLoading(false); // Hata durumunda da yükleme durumu kapatılıyor
      }
    };

    veriCek();
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
      {isLoading ? (
        <p className="text-center text-gray-500">Yükleniyor...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white rounded-lg  p-4 mb-4 border border-gray-400  w-full max-w-md"
        >
          <h2 className="text-center text-lg text-gray-900 font-extrabold mb-2">
            Ücretlendirme
          </h2>
          <ol className="list-disc font-extrabold text-gray-900 list-inside ml-4">
            <li>Öğrenci: {fiyat.ogrenci}</li>
            <li>Öğretmen: {fiyat.ogretmen}</li>
            <li>Misafir: {fiyat.misafir}</li>
          </ol>
        </motion.div>
      )}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/anasayfa"
          className="w-72 lg:w-96 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Anasayfaya Dön
        </Link>
      </motion.div>
      <Footer />
    </motion.div>
  );
};

export default Ucretler;
