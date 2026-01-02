import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);

  const features = [
    {
      id: 1,
      title: "Secure Firebase Authentication",
      description: "Industry-standard security with Firebase Auth. Login instantly with multiple authentication methods.",
      icon: "🔐",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      details: ["Email/Password Authentication", "Social Login (Google, GitHub, Twitter)", "Email Verification", "Password Reset", "Session Management"],
      stats: { users: "10K+", security: "99.9%", uptime: "24/7" },
      badge: "⚡ Instant Login",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      title: "Social Media Integration",
      description: "Seamlessly share your artwork across platforms and connect with other artists.",
      icon: "🤝",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      details: ["Share to Instagram, Twitter, Facebook", "Embed artwork links", "Social media previews", "Cross-platform sharing", "Analytics tracking"],
      stats: { platforms: 6, shares: "50K+", reach: "1M+" },
      badge: "🌐 Connected",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      title: "Smart Artwork Management",
      description: "Organize, favorite, and manage your art collection with intuitive tools.",
      icon: "🎨",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      details: ["Add to Favorites system", "Artwork categorization", "Collections & folders", "Batch operations", "Search & filter"],
      stats: { artworks: "100K+", favorites: "1M+", organized: "95%" },
      badge: "⭐ Featured",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      title: "Community & Collaboration",
      description: "Connect with other artists, share feedback, and collaborate on projects.",
      icon: "👥",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      details: ["Artist profiles", "Follow system", "Comments & feedback", "Collaboration spaces", "Community challenges"],
      stats: { artists: "5K+", collabs: "500+", comments: "100K+" },
      badge: "🚀 Growing",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
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
      setDirection(1);
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [features.length]);

  const handleNavigation = (index) => {
    setDirection(index > activeFeature ? 1 : -1);
    setActiveFeature(index);
  };

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
      scale: 0.9,
      rotateY: direction > 0 ? 10 : -10,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
        duration: 0.6,
      },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? -10 : 10,
      transition: {
        duration: 0.4,
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
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-base-200 to-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-base-content mb-6">
            <TypewriterText text="Powerful Features for Artists" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            <TypewriterText text="Everything you need to showcase, share, and grow your artistic journey" />
          </p>
        </motion.div>

        {/* Feature Carousel */}
        <div className="relative min-h-[500px] md:h-[550px] mb-12 rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={features[activeFeature].id}
              custom={direction}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="relative h-full">
                <img src={features[activeFeature].image} alt={features[activeFeature].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  {/* Badge */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`inline-block px-4 py-2 ${features[activeFeature].bgColor} backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-4`}
                  >
                    {features[activeFeature].badge}
                  </motion.span>

                  {/* Title */}
                  <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl md:text-4xl font-bold mb-4">
                    {features[activeFeature].title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg opacity-90 mb-6 max-w-3xl">
                    {features[activeFeature].description}
                  </motion.p>

                  {/* Feature Details */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {features[activeFeature].details.map((detail, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 mr-3 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white/90">{detail}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* Stats */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex gap-8 pt-6 border-t border-white/20">
                    {Object.entries(features[activeFeature].stats).map(([key, value]) => (
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

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeFeature ? `bg-gradient-to-r ${features[index].color} scale-125` : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              className={`card shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer border-0 overflow-hidden ${index === activeFeature ? "ring-2 ring-primary/50" : ""} ${
                feature.bgColor
              }`}
              onClick={() => handleNavigation(index)}
            >
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mr-4 bg-gradient-to-r ${feature.color} text-white`}>{feature.icon}</div>
                    <div>
                      <h3 className="card-title text-base-content">{feature.title}</h3>
                      <p className="text-base-content/70 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  {index === activeFeature && <span className="badge badge-primary badge-sm">Active</span>}
                </div>

                <div className="space-y-3">
                  {feature.details.slice(0, 3).map((detail, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${feature.color}`}></div>
                      <span className="text-base-content/80 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-base-300/50">
                  <div className="text-sm text-base-content/60">Click to learn more</div>
                  <button className="btn btn-ghost btn-sm hover:btn-primary transition-all">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technical Stack */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 0.8, duration: 0.6 }} className="mb-16">
          <div className="bg-base-100 rounded-2xl p-8 border border-base-300 shadow-lg">
            <h3 className="text-2xl font-bold text-base-content mb-8 text-center">Built with Modern Technology</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Firebase */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500/10 to-yellow-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl">🔥</div>
                </div>
                <h4 className="font-bold text-base-content mb-2">Firebase Auth</h4>
                <p className="text-sm text-base-content/70">Secure authentication & database</p>
              </div>

              {/* React */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl">⚛️</div>
                </div>
                <h4 className="font-bold text-base-content mb-2">React 18</h4>
                <p className="text-sm text-base-content/70">Modern UI with hooks</p>
              </div>

              {/* Social Login */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl">🌐</div>
                </div>
                <h4 className="font-bold text-base-content mb-2">Social Login</h4>
                <p className="text-sm text-base-content/70">Google, GitHub, Twitter</p>
              </div>

              {/* Real-time */}
              <div className="text-center group">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl">⚡</div>
                </div>
                <h4 className="font-bold text-base-content mb-2">Real-time Sync</h4>
                <p className="text-sm text-base-content/70">Instant updates & sharing</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 1, duration: 0.6 }} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">Ready to Experience These Features?</h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">
              Join thousands of artists who are already using Artify to showcase their work, connect with others, and grow their artistic presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <button className="btn btn-primary btn-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Start Free Trial
                </button>
              </Link>
              <Link to="/features">
                <button className="btn btn-outline btn-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View All Features
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
