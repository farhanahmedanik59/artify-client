import React from "react";
import heroImage from "../assets/hero.png";
import { useLoaderData } from "react-router";
import ArtCard from "../components/ArtCard/ArtCard";
import TopArtists from "../components/TopArtists/TopArtists";

const Home = () => {
  const arts = useLoaderData();
  return (
    <div>
      <section className="bg-base-100 text-base-content transition-colors duration-300 max-w-[90%] mx-auto">
        <div className="container mx-auto py-16 flex flex-col md:flex-row items-center justify-between gap-40">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Discover and Explore <br /> Creative Art
            </h1>
            <p className="text-base-content/70 max-w-md mx-auto md:mx-0">A platform for artists to showcase their work and connect with art enthusiasts.</p>
            <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium transition-all shadow-md">Explore Artworks</button>
          </div>
          <div className=" flex h-[500px] justify-center object-cover w-full">
            <img src={heroImage} alt="Artist painting illustration" className="w-full object-cover  rounded-lg shadow-lg" />
          </div>
        </div>
      </section>
      <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center underline">Recent ArtWork</h1>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[80%] mx-auto py-10">
        {arts.map((art) => (
          <ArtCard key={art.id} artwork={art} />
        ))}
      </div>
      <TopArtists></TopArtists>
    </div>
  );
};

export default Home;
