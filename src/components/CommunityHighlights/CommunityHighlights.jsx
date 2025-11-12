import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

const CommunityHighlights = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const highlights = [
    {
      id: 1,
      title: "Trending Artist",
      name: "David",
      description: "Digital portrait specialist breaking records with her latest collection 'Urban Dreams'",
      image: "https://images.unsplash.com/photo-1628359355624-855775b5c9c4?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
      stats: { followers: "12.4K", sales: 89, rating: 4.9 },
      badge: "🔥 Trending",
    },
    {
      id: 2,
      title: "Artwork of the Week",
      name: "Ocean Serenity",
      description: "A mesmerizing seascape that captured the hearts of thousands with its vibrant colors and emotional depth",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: { likes: "2.3K", shares: 456, comments: 189 },
      badge: "⭐ Featured",
    },
    {
      id: 3,
      title: "Community Choice",
      name: "Street Art Collective",
      description: "Local artists transforming urban spaces with breathtaking murals and interactive installations",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: { members: "3.2K", projects: 24, cities: 8 },
      badge: "🏆 Winner",
    },
    {
      id: 4,
      title: "Rising Star",
      name: "Alex Rodriguez",
      description: "Young sculptor making waves with innovative mixed-media installations that challenge perceptions",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      stats: { followers: "8.7K", exhibitions: 6, awards: 3 },
      badge: "🚀 Rising",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [highlights.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    }),
  };

  const TypewriterText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 50 + delay);
        return () => clearTimeout(timeout);
      }
    }, [currentIndex, text, delay]);

    return <span>{displayText}</span>;
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-base-content mb-6">
            <TypewriterText text="Community Highlights" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            <TypewriterText text="Discover the most inspiring artists and artworks from our creative community" />
          </p>
        </motion.div>

        <div className="relative min-h-[400px] sm:min-h-[450px] md:h-[500px] mb-12 rounded-3xl ">
          <AnimatePresence mode="wait" custom={activeIndex}>
            <motion.div key={activeIndex} custom={activeIndex} variants={cardVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-full">
                <img src={highlights[activeIndex].image} alt={highlights[activeIndex].name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-4 py-2 bg-primary text-primary-content rounded-full text-sm font-semibold mb-4"
                  >
                    {highlights[activeIndex].badge}
                  </motion.span>

                  <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl md:text-4xl font-bold mb-2">
                    {highlights[activeIndex].title}
                  </motion.h3>

                  <motion.h4 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-2xl md:text-3xl font-light mb-4 text-primary">
                    {highlights[activeIndex].name}
                  </motion.h4>

                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-lg opacity-90 mb-6 max-w-2xl">
                    {highlights[activeIndex].description}
                  </motion.p>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-6">
                    {Object.entries(highlights[activeIndex].stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="text-sm opacity-80 capitalize">{key}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {highlights.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>

        <Fade>
          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => setActiveIndex(index)}
              >
                <figure className="relative overflow-hidden">
                  <img src={highlight.image} alt={highlight.name} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4">
                    <span className="badge badge-primary badge-lg">{highlight.badge}</span>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-base-content group-hover:text-primary transition-colors">{highlight.name}</h3>
                  <p className="text-base-content/70 line-clamp-2">{highlight.description}</p>
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="flex gap-4 text-sm">
                      {Object.entries(highlight.stats)
                        .slice(0, 2)
                        .map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-bold text-base-content">{value}</div>
                            <div className="text-base-content/60 text-xs capitalize">{key}</div>
                          </div>
                        ))}
                    </div>
                    <button className="btn btn-ghost btn-sm group-hover:btn-primary transition-all">View ›</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Fade>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 1, duration: 0.6 }} className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-base-content mb-4">Join Our Creative Community</h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">Share your artwork, connect with fellow artists, and get featured in our community highlights</p>
            <div className="flex gap-4 justify-center">
              <Link to={"/add-artwork"}>
                <button className="btn btn-primary btn-lg">Share Your Art</button>
              </Link>
              <Link to={"/explore"}>
                <button className="btn btn-outline btn-lg">Explore Gallery</button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityHighlights;
