import React, { useState } from "react";
import GuestbookForm from "../components/GuestbookForm";

const Guestbook: React.FC = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleEntryAdded = () => {
    setShowSuccessPopup(true);
    // Auto-hide popup after 4 seconds
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 4000);
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="max-w-4xl px-6 py-12 mx-auto">
      {/* Success Popup Modal */}
      {showSuccessPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          {/* Backdrop - More subtle background */}
          <div
            className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-40 backdrop-blur-sm"
            onClick={closePopup}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-md p-8 mx-4 transition-all duration-300 transform scale-100 bg-white shadow-2xl rounded-2xl fade-in">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute text-gray-400 transition-colors top-4 right-4 hover:text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Success Icon */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                Registration Successful!
              </h3>
              <p className="mb-6 text-gray-600">
                Thank you for signing in. Your visit has been recorded
                successfully.
              </p>

              {/* Action Button */}
              <button
                onClick={closePopup}
                className="w-full px-6 py-3 font-semibold transition-all duration-300 rounded-lg bg-corporate-yellow hover:bg-corporate-yellow-light text-corporate-black hover:shadow-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Section */}
      <div>
        <GuestbookForm onEntryAdded={handleEntryAdded} />
      </div>
    </div>
  );
};

export default Guestbook;
