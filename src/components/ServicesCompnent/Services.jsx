import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const sectionRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Artwork Hosting & Storage",
      description: "Secure cloud storage for all your artwork with unlimited bandwidth and fast global CDN delivery.",
      icon: "☁️",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-500/10 to-cyan-500/10",
      features: ["Unlimited artwork storage", "High-resolution support", "Automatic optimization", "Secure backup", "Global CDN delivery"],
      pricing: { free: "100GB", pro: "Unlimited", enterprise: "Custom" },
      badge: "⚡ High Performance",
      stats: { storage: "10TB+", users: "50K+", uptime: "99.9%" },
    },
    {
      id: 2,
      title: "Portfolio Website Builder",
      description: "Create stunning artist portfolios with customizable templates and no coding required.",
      icon: "🎨",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-purple-500/10 to-pink-500/10",
      features: ["Drag-and-drop builder", "Customizable templates", "Mobile responsive", "SEO optimized", "Analytics dashboard"],
      pricing: { free: "Basic", pro: "Advanced", enterprise: "Custom Domain" },
      badge: "🚀 Easy Setup",
      stats: { portfolios: "25K+", templates: "50+", speed: "95/100" },
    },
    {
      id: 3,
      title: "Art Community Platform",
      description: "Connect with fellow artists, share feedback, and grow your network in our vibrant community.",
      icon: "👥",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-500/10 to-orange-500/10",
      features: ["Artist networking", "Feedback & critiques", "Community challenges", "Collaboration tools", "Live events & workshops"],
      pricing: { free: "Access", pro: "Premium", enterprise: "Business" },
      badge: "💬 Active Community",
      stats: { members: "100K+", posts: "1M+", countries: "150+" },
    },
    {
      id: 4,
      title: "Art Analytics & Insights",
      description: "Track your artwork performance with detailed analytics and audience insights.",
      icon: "📊",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-gradient-to-br from-emerald-500/10 to-teal-500/10",
      features: ["View analytics", "Audience insights", "Performance tracking", "Trend analysis", "Export reports"],
      pricing: { free: "Basic", pro: "Advanced", enterprise: "Custom" },
      badge: "📈 Data Driven",
      stats: { dataPoints: "10M+", accuracy: "99%", reports: "100K+" },
    },
    {
      id: 5,
      title: "Print & Merchandise Services",
      description: "Turn your artwork into high-quality prints, merchandise, and digital products.",
      icon: "🖨️",
      color: "from-rose-500 to-red-500",
      bgColor: "bg-gradient-to-br from-rose-500/10 to-red-500/10",
      features: ["Print-on-demand", "Quality materials", "Global shipping", "Royalty management", "Store integration"],
      pricing: { free: "Commission", pro: "Wholesale", enterprise: "Bulk" },
      badge: "💰 Monetize Art",
      stats: { products: "500+", artists: "10K+", orders: "1M+" },
    },
    {
      id: 6,
      title: "Artwork Protection & Copyright",
      description: "Protect your intellectual property with advanced copyright tools and watermarking.",
      icon: "🛡️",
      color: "from-indigo-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-indigo-500/10 to-violet-500/10",
      features: ["Digital watermarking", "Copyright registration", "Infringement detection", "Legal support", "Secure sharing"],
      pricing: { free: "Basic", pro: "Professional", enterprise: "Enterprise" },
      badge: "🔒 Secure",
      stats: { protected: "5M+", claims: "10K+", success: "95%" },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
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

  const TypewriterText = ({ text, delay = 0 }) => {
    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, 30 + delay);
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
            <TypewriterText text="Complete Services for Artists" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            <TypewriterText text="Everything you need to create, share, protect, and monetize your artwork" />
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 17 },
              }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className={`card shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border-0 ${hoveredService === index ? "ring-2 ring-primary/30" : ""} ${
                service.bgColor
              }`}
              onClick={() => setActiveService(index)}
            >
              <div className="card-body p-6">
                {/* Service Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-4 bg-gradient-to-r ${service.color} text-white shadow-lg`}>{service.icon}</div>
                    <div>
                      <h3 className="card-title text-base-content">{service.title}</h3>
                      <span className="badge badge-sm mt-1 bg-gradient-to-r from-base-300 to-base-300/50 text-base-content/70">{service.badge}</span>
                    </div>
                  </div>
                  {activeService === index && <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>}
                </div>

                {/* Description */}
                <p className="text-base-content/70 mb-4">{service.description}</p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-sm text-base-content/80">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-base-content/60 mt-2">+{service.features.length - 3} more features</div>
                </div>

                {/* Pricing Tiers */}
                <div className="mb-4">
                  <div className="text-sm font-medium text-base-content/70 mb-2">Pricing Tiers</div>
                  <div className="flex gap-2">
                    {Object.entries(service.pricing).map(([tier, value]) => (
                      <div key={tier} className="flex-1 text-center">
                        <div className="text-xs text-base-content/60 capitalize mb-1">{tier}</div>
                        <div
                          className={`text-sm font-semibold px-2 py-1 rounded ${tier === "pro" ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary" : "bg-base-300 text-base-content/70"}`}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between text-xs text-base-content/60 pt-4 border-t border-base-300/50">
                  {Object.entries(service.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-semibold">{value}</div>
                      <div className="capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <button className="btn btn-sm btn-block btn-outline hover:btn-primary transition-all">
                    Learn More
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Service Comparison */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 0.6, duration: 0.8 }} className="mb-16">
          <div className="bg-base-100 rounded-2xl p-8 border border-base-300 shadow-lg">
            <h3 className="text-2xl font-bold text-base-content mb-8 text-center">Service Plans Comparison</h3>

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="bg-base-200">
                    <th className="text-base-content font-bold">Service</th>
                    <th className="text-base-content font-bold text-center">Free</th>
                    <th className="text-base-content font-bold text-center">Pro</th>
                    <th className="text-base-content font-bold text-center">Enterprise</th>
                    <th className="text-base-content font-bold text-center">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-base-200/50">
                      <td className="font-medium text-base-content">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-lg mr-3 flex items-center justify-center bg-gradient-to-r ${service.color} text-white`}>{service.icon}</div>
                          {service.title}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className="badge badge-outline badge-sm">{service.pricing.free}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge badge-primary badge-sm">{service.pricing.pro}</span>
                      </td>
                      <td className="text-center">
                        <span className="badge badge-secondary badge-sm">{service.pricing.enterprise}</span>
                      </td>
                      <td className="text-center text-sm text-base-content/70">
                        {service.id === 1 && "All Artists"}
                        {service.id === 2 && "Professional Portfolios"}
                        {service.id === 3 && "Networking Artists"}
                        {service.id === 4 && "Data-Driven Artists"}
                        {service.id === 5 && "Selling Artists"}
                        {service.id === 6 && "Commercial Artists"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 0.8, duration: 0.6 }} className="mb-16">
          <h3 className="text-2xl font-bold text-base-content mb-8 text-center">How Our Services Work</h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold">1</div>
              <h4 className="font-bold text-base-content mb-2">Sign Up</h4>
              <p className="text-sm text-base-content/70">Create your free account in seconds</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">2</div>
              <h4 className="font-bold text-base-content mb-2">Upload Art</h4>
              <p className="text-sm text-base-content/70">Add your artwork to our secure platform</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl font-bold">3</div>
              <h4 className="font-bold text-base-content mb-2">Choose Services</h4>
              <p className="text-sm text-base-content/70">Select the services you need</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">4</div>
              <h4 className="font-bold text-base-content mb-2">Grow & Monetize</h4>
              <p className="text-sm text-base-content/70">Showcase and sell your artwork</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 1, duration: 0.6 }} className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-base-content mb-8 text-center">What Artists Say About Our Services</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">M</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">Maria Chen</h4>
                      <p className="text-sm text-base-content/70">Digital Artist</p>
                    </div>
                  </div>
                  <p className="text-base-content/70 italic mb-4">"The portfolio builder transformed my online presence. I got my first commission within a week!"</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">D</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">David Park</h4>
                      <p className="text-sm text-base-content/70">Illustrator</p>
                    </div>
                  </div>
                  <p className="text-base-content/70 italic mb-4">"The print service helped me turn my art into income. Professional quality and great customer support."</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card bg-base-100 shadow-lg">
                <div className="card-body">
                  <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white">S</div>
                    </div>
                    <div>
                      <h4 className="font-bold text-base-content">Sarah Johnson</h4>
                      <p className="text-sm text-base-content/70">Art Teacher</p>
                    </div>
                  </div>
                  <p className="text-base-content/70 italic mb-4">"The community platform connected me with amazing artists worldwide. Truly transformative!"</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 1.2, duration: 0.6 }} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">Ready to Elevate Your Art Career?</h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">Join thousands of successful artists who have transformed their careers with our comprehensive services.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <button className="btn btn-primary btn-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Explore All Services
                </button>
              </Link>
              <Link to="/contact">
                <button className="btn btn-outline btn-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
