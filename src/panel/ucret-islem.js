import React, { useState } from "react";
import { motion } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const PriceEdit = () => {
  const [ogrenciUcreti, setOgrenciUcreti] = useState("");
  const [ogretmenUcreti, setOgretmenUcreti] = useState("");
  const [misafirUcreti, setMisafirUcreti] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [updateOgrenci, setUpdateOgrenci] = useState(false);
  const [updateOgretmen, setUpdateOgretmen] = useState(false);
  const [updateMisafir, setUpdateMisafir] = useState(false);

  const handlePriceSubmit = async () => {
    try {
      const docRef = doc(db, "fiyatlar", "keAJMqIVtjtQ06aPhTz9");

      const updatedData = {};

      if (updateOgrenci) {
        updatedData.ogrenci = parseFloat(ogrenciUcreti);
      }

      if (updateOgretmen) {
        updatedData.ogretmen = parseFloat(ogretmenUcreti);
      }

      if (updateMisafir) {
        updatedData.misafir = parseFloat(misafirUcreti);
      }

      await updateDoc(docRef, updatedData);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Hata:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-8"
    >
      <header className="text-3xl font-extrabold text-gray-900 mb-4">
        Ücret Düzenleme
      </header>
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-400 w-full max-w-md">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={updateOgrenci}
            onChange={() => setUpdateOgrenci(!updateOgrenci)}
          />
          <input
            type="text"
            placeholder="Öğrenci Ücreti"
            value={ogrenciUcreti}
            onChange={(e) => setOgrenciUcreti(e.target.value)}
            className="block w-full p-2 border rounded-md"
            disabled={!updateOgrenci}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={updateOgretmen}
            onChange={() => setUpdateOgretmen(!updateOgretmen)}
          />
          <input
            type="text"
            placeholder="Öğretmen Ücreti"
            value={ogretmenUcreti}
            onChange={(e) => setOgretmenUcreti(e.target.value)}
            className="block w-full p-2 border rounded-md"
            disabled={!updateOgretmen}
          />
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={updateMisafir}
            onChange={() => setUpdateMisafir(!updateMisafir)}
          />
          <input
            type="text"
            placeholder="Misafir Ücreti"
            value={misafirUcreti}
            onChange={(e) => setMisafirUcreti(e.target.value)}
            className="block w-full p-2 border rounded-md"
            disabled={!updateMisafir}
          />
        </div>
        <button
          onClick={handlePriceSubmit}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
        >
          Ücretleri Güncelle
        </button>
        <div className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold text-center">
          <Link to="/yonetici/panel">Panele Dön</Link>
        </div>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-green-600 mt-2"
          >
            Ücretler başarıyla güncellendi!
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-600 mt-2"
          >
            Bir hata oluştu, lütfen tekrar deneyin.
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default PriceEdit;
