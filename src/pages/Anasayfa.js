import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";

const HomePage = () => {
  const [user, isLoading] = useAuthState(auth);

  const handleSignOut = useCallback(() => {
    signOut(auth);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <div
          className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Yükleniyor...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            Hoş geldin, <p className="font-semibold">{user.displayName}</p>
          </h2>
        </div>
        <div className="flex justify-center">
          <Link
            to="/kartim"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Kartım
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/gunun-menusu"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Günün Menüsü
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/gecmis"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Katılım Geçmişi
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/yonetici/panel"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Yetkili Paneli
          </Link>
        </div>
        <div className="flex justify-center">
          <Link
            to="/ucretler"
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Ücretler
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Çıkış Yap
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
