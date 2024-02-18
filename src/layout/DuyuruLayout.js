import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import gif from "../images/cumhuriyet.gif";
import DuyuruModal from "../components/DuyuruModal";
import { Outlet } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

const DuyuruLayout = () => {
  const [yukleniyor, setYukleniyor] = useState(true);
  const [duyuru, setDuyuru] = useState(true);
  const [duyuruBilgi, setDuyuruBilgi] = useState({});
  const [tarih, setTarih] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    const duyuruCek = async () => {
      const q = query(
        collection(db, "duyurular"),
        where("tarih", "==", formatDate(tarih))
      );

      const gelenSnap = await getDocs(q);

      if (!gelenSnap.empty) {
        setDuyuru(true);
        const data = gelenSnap.docs[0].data();
        setDuyuruBilgi(data);
      } else {
        setDuyuru(false);
      }
    };
    duyuruCek();
  }, [tarih]);

  useEffect(() => {
    setTimeout(() => {
      setYukleniyor(false);
    }, 1000);
  });

  if (yukleniyor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <img src={gif} />;
      </div>
    );
  }

  if (duyuru) {
    return (
      <>
        <DuyuruModal
          content={duyuruBilgi.metin}
          title={duyuruBilgi.baslik}
          tarih={duyuruBilgi.tarih}
        />
        <Outlet />
      </>
    );
  }

  return <Outlet />;
};

export default DuyuruLayout;
