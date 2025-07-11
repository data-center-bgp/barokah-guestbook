import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative bg-gradient-to-br from-corporate-black to-corporate-black-light text-white py-16 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-corporate-yellow to-transparent transform -skew-y-12 scale-150"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="text-corporate-yellow">Barokah</span> Guest Book
        </h1>
        <p className="text-xl md:text-2xl text-corporate-yellow-light font-light">
          Welcome to our corporate facility. Please sign in below.
        </p>
        <div className="mt-8 w-24 h-1 bg-corporate-yellow mx-auto rounded-full"></div>
      </div>
    </header>
  );
};

export default Header;
