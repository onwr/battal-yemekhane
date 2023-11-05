import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import Modal from "react-modal";
import { motion } from "framer-motion";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "400px",
    padding: "20px",
  },
};

const Kartim = () => {
  const [user] = useAuthState(auth);
  const userId = user.uid;
  const [kart, setKart] = useState(null);
  const [kartNo, setKartNo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "kartlar"), where("userId", "==", userId));

    const getKartlar = async () => {
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Kart bulunamadı.");
      } else {
        const kartDoc = querySnapshot.docs[0];
        setKart(kartDoc.data());
      }
      setLoading(false);
    };

    getKartlar();
  }, [userId]);

  const handleKartEkle = async () => {
    const kartlarRef = collection(db, "kartlar");
    const kartSorgu = query(kartlarRef, where("kartNo", "==", kartNo));
    const kartSorguSnapshot = await getDocs(kartSorgu);

    if (kartSorguSnapshot.empty) {
      alert("Kart bulunamadı.");
    } else {
      const kartDoc = kartSorguSnapshot.docs[0];
      const kartId = kartDoc.id;
      await updateDoc(doc(db, "kartlar", kartId), {
        userId: userId,
      });

      closeModal();

      window.location.reload();
    }
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen justify-center items-center">
      <div className="max-w-md mx-auto p-4">
        <div>
          {kart ? (
            <div className="flex flex-col gap-2">
              <div className="bg-indigo-50 rounded-md shadow-md w-96 h-44 border p-2">
                <div className="text-gray-800 font-extrabold">
                  <p className="text-xl mb-1">Kart Bilgileri:</p>
                  <p className="text-xl">{kart.kalanGun} Gün Kaldı!</p>
                  <p className="text-xl">Kart Numarası: {kart.kartNo}</p>
                  {kart.durum === false ? (
                    <div className="bg-white border rounded-md mt-2 p-1">
                      <p className="text-base font-extrabold">
                        Kart Pasif Durumda, Lütfen idareye gidip yeniletiniz.
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="bg-indigo-50 rounded-md border shadow-xl p-4 w-96 h-auto">
                <p className="mb-3 text-xl font-extrabold text-gray-800">
                  Kart işlemleri:
                </p>
                <div className="flex flex-col gap-2">
                  {kart.gecmis.map((gecmis, index) => (
                    <div
                      key={index}
                      className="text-gray-800 p-3 border rounded-md"
                    >
                      <p className="text-xl font-extrabold">{gecmis}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="font-extrabold text-gray-800 text-2xl">
              <p className="mb-5">Lütfen kartınızı ekleyin.</p>
              <button
                className="max-w-md w-full bg-indigo-100 p-4 border rounded-md hover:bg-indigo-300"
                onClick={openModal}
              >
                Kart Ekle
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center my-4">
          <div className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col font-extrabold text-gray-800">
            <input
              type="text"
              value={kartNo}
              onChange={(e) => setKartNo(e.target.value)}
              className="bg-white border w-full rounded-md p-3"
              placeholder="Kart Numarası"
            />
            <button
              className="max-w-md w-full mt-3 bg-indigo-100 p-4 border rounded-md hover:bg-indigo-300"
              onClick={handleKartEkle}
            >
              Kart Ekle
            </button>
          </div>
        </motion.div>
      </Modal>
    </div>
  );
};

export default Kartim;
