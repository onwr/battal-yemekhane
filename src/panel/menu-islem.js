import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Engel from "../components/ErisimEngeli";

const MenuEkle = () => {
  const [menuItems, setMenuItems] = useState([{ name: "", id: 1 }]);
  const [manualDate, setManualDate] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [user] = useAuthState(auth);
  const userId = user.uid;
  const [durum, setDurum] = useState("");

  useEffect(() => {
    const veriCek = async () => {
      try {
        const ref = collection(db, "yetkiler");
        const yetkiliQuery = query(ref, where("userId", "==", userId));
        const querySnap = await getDocs(yetkiliQuery);

        if (!querySnap.empty) {
          const yetkiliDoc = querySnap.docs[0];
          const yetkiliData = yetkiliDoc.data();
          const durumCek = yetkiliData.durum;
          setDurum(durumCek);
        }
      } catch {
        console.log("hata");
      }
    };
    veriCek();
  });

  if (durum != "Yetkili") {
    return <Engel />;
  }

  const handleAddItem = () => {
    setMenuItems((prevItems) => [
      ...prevItems,
      { name: "", id: prevItems.length + 1 },
    ]);
  };

  const handleRemoveItem = (id) => {
    setMenuItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleItemChange = (id, value) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
  };

  const handleMenuSubmit = async () => {
    try {
      const menuData = menuItems.reduce(
        (acc, item, index) => {
          acc[`Yemek${index + 1}`] = item.name;
          return acc;
        },
        { tarih: manualDate, katilanlar: [] }
      );

      const docRef = await addDoc(collection(db, "yemekler"), menuData);

      setShowSuccess(true);
      setShowError(false);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
    } catch (error) {
      setShowError(true);
      setShowSuccess(false);
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
        Menü Ekle
      </header>
      <div className="bg-white rounded-lg p-4 mb-4 border border-gray-400 w-full max-w-md">
        <input
          type="text"
          placeholder="Tarih (Örn: 12 Ağustos 2023)"
          value={manualDate}
          onChange={(e) => setManualDate(e.target.value)}
          className="block w-full p-2 border rounded-md mb-4"
        />
        {menuItems.map((item) => (
          <div key={item.id} className="flex mb-2">
            <input
              type="text"
              placeholder={`Yemek ${item.id}`}
              value={item.name}
              onChange={(e) => handleItemChange(item.id, e.target.value)}
              className="block w-full p-2 border rounded-md"
            />
            {menuItems.length > 1 && (
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-2 text-red-600 hover:text-red-800 font-medium transition duration-300"
              >
                Sil
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleAddItem}
          className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300"
        >
          + Yemek Ekle
        </button>
        <button
          onClick={handleMenuSubmit}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
        >
          Menüyü Ekle
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
            Menü başarıyla eklendi!
          </motion.div>
        )}
        {showError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-red-600 mt-2"
          >
            Menü eklenirken bir hata oluştu.
          </motion.div>
        )}
      </div>
      <Footer />
    </motion.div>
  );
};

export default MenuEkle;
