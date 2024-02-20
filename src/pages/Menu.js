import { useState, useEffect } from "react";
import {
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import logo from "../images/siluet.png";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [fiyat, setFiyat] = useState({});
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ipAddress, setIpAddress] = useState("");

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        setIpAddress(data.ip);
      })
      .catch((error) => {
        console.error("IP alınamadı:", error);
      });
  }, []);

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

  useEffect(() => {
    const veriCek = async () => {
      try {
        const docRef = doc(db, "fiyatlar", "W8E5XtdTNTZ8c6HRA2XV");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFiyat(docSnap.data());
        } else {
          console.log("Belirtilen belge bulunamadı.");
        }
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    veriCek();
  }, []);
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
      className="min-h-screen flex flex-col items-center"
    >
      <header className="text-3xl font-extrabold text-gray-900">
        <img src={logo} className="w-32 md:w-60" />
      </header>
      <div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="md:bg-white rounded-sm p-4 mb-4 md:border md:border-gray-400 bg-gray-200 w-full max-w-sm"
      >
        <h2 className="ml-4 text-lg text-gray-900 font-extrabold mb-2">
          YARININ MENÜSÜ
        </h2>
        {isLoadingMenu ? (
          <p className="text-gray-500 ml-4">Yükleniyor...</p>
        ) : menuItems.length === 0 ? (
          <p className="text-gray-500 ml-4">MENÜ EKLENMEMİŞ.</p>
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
        disabled={menuItems.length === 0}
        whileTap={{ scale: 0.95 }}
        className="w-80 lg:w-96 flex mb-2 items-center disabled:opacity-0 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        BENİ LİSTEYE EKLE
      </motion.button>
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
      <div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="md:bg-white rounded-sm p-4 mb-4 md:border md:border-gray-400 bg-gray-200 w-full max-w-sm"
      >
        <h2 className="ml-4 text-lg text-gray-900 font-extrabold mb-2">
          ÜCRETLER
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="font-extrabold text-gray-900 ml-4"
        >
          {fiyat.ogrenci && <li>ÖĞRENCİ: {fiyat.ogrenci} TL</li>}
          {fiyat.ogretmen && <li>ÖĞRETMEN: {fiyat.ogretmen} TL</li>}
          {fiyat.misafir && <li>MİSAFİR: {fiyat.misafir} TL</li>}
        </motion.div>
      </div>
      <p className="p-1 rounded shadow-xl border bg-gradient-to-l from-gray-600 via-gray-700 to-gray-800 text-white text-lg w-80 lg:w-96 text-center font-semibold">
        {ipAddress}
      </p>
      <Footer />
    </motion.div>
  );
};

export default Menu;
