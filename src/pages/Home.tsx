import React from "react";
import Header from "../components/Header";
import Guestbook from "./Guestbook";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Guestbook />
    </div>
  );
};

export default Home;
