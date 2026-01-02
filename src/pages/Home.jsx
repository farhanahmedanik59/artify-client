import React from "react";
import heroImage from "../assets/hero.png";
import { Link, useLoaderData } from "react-router";
import ArtCard from "../components/ArtCard/ArtCard";
import TopArtists from "../components/TopArtists/TopArtists";
import { ToastContainer } from "react-toastify";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";
import CommunityHighlights from "../components/CommunityHighlights/CommunityHighlights";
import StatisticsSection from "../components/statistics/Statistics";
import TestimonialsSection from "../components/Testimonial/Testimonial";
import BlogsSection from "../components/Blogs/Blogs";
import FAQSection from "../components/Faq/Faq";
import CTASection from "../components/Cta/Cta";
import FeaturesSection from "../components/Features/Features";
import ServicesSection from "../components/ServicesCompnent/Services";

const Home = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const arts = useLoaderData();
  return (
    <div>
      <section className="bg-base-100 text-base-content transition-colors duration-300 max-w-[90%] md:max-w-[75%] mx-auto">
        <div className="container mx-auto py-16 flex flex-col md:flex-row items-center justify-between gap-20 md:gap-40">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <Fade>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <Typewriter words={["Discover and Explore Creative Art"]} cursor cursorStyle="_" typeSpeed={70} deleteSpeed={50} delaySpeed={1000} />
              </h1>

              <p className="text-base-content/70 max-w-md mx-auto md:mx-0">
                {" "}
                <Typewriter words={["A platform for artists to showcase their work and connect with art enthusiasts."]} cursor cursorStyle="_" typeSpeed={20} deleteSpeed={50} delaySpeed={1000} />
              </p>
            </Fade>
            <Link to={"/explore"}>
              <button className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md font-medium transition-all shadow-md">Explore Artworks</button>
            </Link>
          </div>
          <Fade className=" flex h-[500px] justify-center object-cover w-full">
            <div className=" flex h-[500px] justify-center object-cover w-full">
              <img src={heroImage} alt="Artist painting illustration" className="w-full object-cover  rounded-lg shadow-lg" />
            </div>
          </Fade>
        </div>
      </section>
      <Fade>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center underline">Recent ArtWork</h1>
      </Fade>
      <Fade>
        <div className="mt-3.5 shadow-lg rounded-xl mb-3.5  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-6 md:p-10 gap-6  md:max-w-[80%]  mx-auto py-10 bg-base-200">
          {arts.map((art) => (
            <ArtCard key={art.id} artwork={art} />
          ))}
        </div>
      </Fade>
      <TopArtists></TopArtists>
      <CommunityHighlights></CommunityHighlights>
      <StatisticsSection></StatisticsSection>
      <TestimonialsSection></TestimonialsSection>
      <BlogsSection></BlogsSection>
      <FAQSection></FAQSection>
      <CTASection></CTASection>
      <FeaturesSection></FeaturesSection>
      <ServicesSection></ServicesSection>
    </div>
  );
};

export default Home;
