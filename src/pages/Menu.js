import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    async function fetchMenu() {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const q = query(
        collection(db, "yemekler"),
        where("tarih", "==", formatDate(nextDay))
      );

      const querySnapshot = await getDocs(q);

      const items = [];
      querySnapshot.forEach((doc2) => {
        items.push(doc2.data());
      });

      setMenuItems(items);
      setIsLoadingMenu(false);
    }

    fetchMenu();
  }, [selectedDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleKatilButtonClick = async () => {
    const isAddedToList = localStorage.getItem("isAddedToList");

    if (isAddedToList) {
      setShowError(true);
    } else {
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      try {
        const q = query(
          collection(db, "yemekler"),
          where("tarih", "==", formatDate(nextDay))
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(async (doc2) => {
          const docId = doc2.id;
          const docRef = doc(db, "yemekler", docId);
          await updateDoc(docRef, {
            katilanlar: arrayUnion("example@example.com"),
          });
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            localStorage.setItem("isAddedToList", "true");
          }, 2000);
        });
      } catch (error) {
        console.error("Hata:", error);
      }
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
        Battalgazi MTAL
      </header>
      <div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-lg  p-4 mb-4 border border-gray-400  w-full max-w-md"
      >
        <h2 className="text-center text-lg text-gray-900 font-extrabold mb-2">
          Yarının Menüsü
        </h2>
        {isLoadingMenu ? (
          <p className="text-gray-500 text-center">Yükleniyor...</p>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-500 text-center">Menü eklenmemiş.</p>
        ) : (
          <motion.ol
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="list-disc font-extrabold text-gray-900 list-inside ml-4"
          >
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.Yemek1 && <li>{item.Yemek1}</li>}
                {item.Yemek2 && <li>{item.Yemek2}</li>}
                {item.Yemek3 && <li>{item.Yemek3}</li>}
                {item.Yemek4 && <li>{item.Yemek4}</li>}
              </div>
            ))}
          </motion.ol>
        )}
      </div>
      <motion.button
        onClick={handleKatilButtonClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-72 lg:w-96 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Beni listeye ekle
      </motion.button>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link
          to="/anasayfa"
          whilehover={{ scale: 1.05 }}
          whiletap={{ scale: 0.95 }}
          className="mt-3 w-72 lg:w-96 flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Anasayfaya Dön
        </Link>
      </motion.div>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-green-600 mt-2"
        >
          Başarıyla listeye eklendi!
        </motion.div>
      )}
      {showError && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-red-600 mt-2"
        >
          Zaten listede adınız var.
        </motion.div>
      )}
      <Footer />
    </motion.div>
  );
};

export default Menu;
