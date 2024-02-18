import React, { useState, useEffect } from "react";

const DuyuruModal = ({ title, content, tarih }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const isModalShownPreviously = localStorage.getItem("isModalShown");
    if (isModalShownPreviously) {
      const lastShownDate = new Date(isModalShownPreviously);
      const currentDate = new Date();
      const differenceInDays =
        (currentDate - lastShownDate) / (1000 * 60 * 60 * 24);
      if (differenceInDays < 1) {
        setIsOpen(false);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("isModalShown", new Date().toISOString());
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 md:max-w-2xl w-96 text-center md:w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold p-2 bg-gray-100 rounded">
                {title}
              </h2>
              <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="text-black p-2 bg-gray-100 rounded font-semibold text-lg">
              {content}
            </p>
            <p className="p-2 text-black rounded bg-slate-300 mt-2">{tarih}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default DuyuruModal;
