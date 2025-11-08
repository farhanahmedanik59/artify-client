import React from "react";
import heroImage from "../assets/hero.png"; // adjust path if needed

const Home = () => {
  return (
    <section className="bg-base-100 text-base-content transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-16 flex flex-col md:flex-row items-center justify-between">
        
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Discover and Explore <br /> Creative Art
          </h1>

          <p className="text-base-content/70 max-w-md mx-auto md:mx-0">A platform for artists to showcase their work and connect with art enthusiasts.</p>

          <div>
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium transition-all shadow-md">Explore Artworks</button>
          </div>
        </div>

        
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img src={heroImage} alt="Artist painting illustration" className="w-80 md:w-[420px] object-contain rounded-lg shadow-md" />
        </div>
      </div>
    </section>
  );
};

export default Home;
