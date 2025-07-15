import React from "react";

const Header: React.FC = () => {
  return (
    <header className="relative py-16 overflow-hidden text-white bg-gradient-to-br from-corporate-black to-corporate-black-light">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 transform scale-150 -skew-y-12 bg-gradient-to-r from-transparent via-corporate-yellow to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-6xl px-6 mx-auto text-center">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo-bpg.png"
            alt="Barokah Perkasa Group Logo"
            className="object-contain w-auto h-16 md:h-20"
          />
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
          <span className="text-corporate-yellow">Barokah</span> Guest Book
        </h1>
        <p className="text-xl font-light md:text-2xl text-corporate-yellow-light">
          Welcome to our corporate facility. Please sign in below.
        </p>
        <div className="w-24 h-1 mx-auto mt-8 rounded-full bg-corporate-yellow"></div>
      </div>
    </header>
  );
};

export default Header;
