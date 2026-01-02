import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const faqs = [
    {
      id: 1,
      question: "How do I upload my artwork to Artify?",
      answer:
        "To upload your artwork, navigate to the 'Add Artwork' section in your dashboard. Click the upload button, select your image files (we support JPG, PNG, and SVG formats up to 20MB), add relevant tags and descriptions, and submit. Your artwork will be visible in your collection immediately.",
      category: "upload",
      tags: ["upload", "artwork", "beginner"],
      featured: true,
    },
    {
      id: 2,
      question: "How can I mark artworks as favorites?",
      answer:
        "Click the heart icon on any artwork thumbnail to mark it as a favorite. You can also batch select multiple artworks from your collection page and use the 'Add to Favorites' option in the actions menu. Favorite artworks appear in a dedicated section for easy access.",
      category: "favorites",
      tags: ["favorites", "collection", "organize"],
      featured: true,
    },
    {
      id: 3,
      question: "What statistics are available for my art collection?",
      answer:
        "Artify provides comprehensive statistics including total artwork count, favorite percentage, upload trends over time, most used tags, and engagement metrics. You can view these in the Statistics section, which updates in real-time as you add more artworks.",
      category: "statistics",
      tags: ["statistics", "analytics", "insights"],
      featured: true,
    },
    {
      id: 4,
      question: "Is there a limit to how many artworks I can upload?",
      answer:
        "Free accounts can upload up to 100 artworks. Pro accounts have unlimited storage. Each artwork file must be under 20MB. We recommend optimizing images before upload for best performance.",
      category: "limits",
      tags: ["limits", "storage", "account"],
      featured: false,
    },
    {
      id: 5,
      question: "How do I organize my artwork into collections?",
      answer:
        "Create collections by going to 'My Collections' and clicking 'New Collection'. You can drag and drop artworks into collections or use batch selection. Collections can be organized by theme, medium, date, or any custom criteria you prefer.",
      category: "organization",
      tags: ["collections", "organize", "categorize"],
      featured: false,
    },
    {
      id: 6,
      question: "Can I download my artwork data?",
      answer:
        "Yes, you can export your entire collection including metadata, tags, and statistics as a JSON or CSV file. Go to Settings > Data Management > Export Data. This feature is available for all account types.",
      category: "data",
      tags: ["export", "download", "backup"],
      featured: false,
    },
    {
      id: 7,
      question: "How does the community highlights section work?",
      answer:
        "Community highlights showcase trending and exceptional artwork from our user base. Artworks are selected based on engagement, quality, and community feedback. You can submit your artwork for consideration in the Community section.",
      category: "community",
      tags: ["community", "highlights", "featured"],
      featured: true,
    },
    {
      id: 8,
      question: "What image formats are supported?",
      answer:
        "Artify supports JPG, PNG, SVG, WebP, and GIF formats. For best results, we recommend using high-quality JPG or PNG files. SVG files retain vector quality and can be scaled without loss of resolution.",
      category: "technical",
      tags: ["formats", "technical", "images"],
      featured: false,
    },
    {
      id: 9,
      question: "How do I edit artwork details after upload?",
      answer:
        "Navigate to the artwork's detail page and click the edit icon (pencil). You can update the title, description, tags, and category. Changes are saved automatically and sync across all views of your collection.",
      category: "editing",
      tags: ["edit", "update", "details"],
      featured: false,
    },
    {
      id: 10,
      question: "Is my artwork private or public?",
      answer:
        "By default, artworks are private and visible only to you. You can make specific artworks public by toggling the visibility setting on the artwork detail page. Public artworks may appear in community sections.",
      category: "privacy",
      tags: ["privacy", "visibility", "sharing"],
      featured: true,
    },
    {
      id: 11,
      question: "How do I delete artwork from my collection?",
      answer:
        "Go to the artwork's detail page and click the delete icon (trash can). You'll be asked to confirm the deletion. Deleted artworks are moved to trash for 30 days before permanent deletion, giving you time to restore if needed.",
      category: "management",
      tags: ["delete", "remove", "management"],
      featured: false,
    },
    {
      id: 12,
      question: "Can I collaborate with other artists on Artify?",
      answer:
        "Yes! Artify offers collaboration features. You can create shared collections, invite other artists to contribute, and work together on projects. Collaborators can upload, edit, and organize artworks in shared spaces.",
      category: "collaboration",
      tags: ["collaborate", "share", "team"],
      featured: true,
    },
  ];

  const categories = [
    { id: "all", name: "All Questions", count: faqs.length },
    { id: "upload", name: "Uploading", count: faqs.filter((f) => f.category === "upload").length },
    { id: "organization", name: "Organization", count: faqs.filter((f) => f.category === "organization").length },
    { id: "statistics", name: "Statistics", count: faqs.filter((f) => f.category === "statistics").length },
    { id: "community", name: "Community", count: faqs.filter((f) => f.category === "community").length },
    { id: "technical", name: "Technical", count: faqs.filter((f) => f.category === "technical").length },
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

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredFAQs = faqs.filter((faq) => faq.featured);
  const regularFAQs = filteredFAQs.filter((faq) => !faq.featured);

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
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
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

  const toggleFAQ = (id) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-base-200 to-base-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-base-content mb-6">
            <TypewriterText text="Frequently Asked Questions" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            <TypewriterText text="Find answers to common questions about Artify and its features" />
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.3, duration: 0.6 }} className="mb-10">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full pl-12 bg-base-100 border-base-300 text-base-content placeholder:text-base-content/50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <svg className="w-5 h-5 text-base-content/50 hover:text-base-content" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.4, duration: 0.6 }} className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === category.id ? "bg-gradient-to-r from-primary to-secondary text-primary-content" : "bg-base-100 text-base-content hover:bg-base-300"
                }`}
              >
                <span>{category.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${activeCategory === category.id ? "bg-primary-content/20 text-primary-content" : "bg-base-300 text-base-content/70"}`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search Results Info */}
        {searchQuery && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 text-center">
            <p className="text-base-content/70">
              Found <span className="font-bold text-primary">{filteredFAQs.length}</span> results for "<span className="font-bold">{searchQuery}</span>"
            </p>
          </motion.div>
        )}

        {/* Featured FAQs */}
        {featuredFAQs.length > 0 && activeCategory === "all" && !searchQuery && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.5, duration: 0.6 }} className="mb-12">
            <h3 className="text-2xl font-bold text-base-content mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Most Popular Questions
            </h3>
            <div className="space-y-4">
              {featuredFAQs.map((faq) => (
                <motion.div key={faq.id} variants={itemVariants} className="card bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
                  <div className="card-body p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="badge badge-primary badge-sm">Featured</span>
                          <span className="badge badge-outline badge-sm capitalize">{faq.category}</span>
                        </div>
                        <h4 className="card-title text-base-content mb-2">{faq.question}</h4>
                        <p className="text-base-content/70">{faq.answer}</p>
                      </div>
                      <button onClick={() => toggleFAQ(faq.id)} className="btn btn-circle btn-sm btn-ghost ml-4 flex-shrink-0">
                        <svg
                          className={`w-5 h-5 transform transition-transform ${openIndex === faq.id ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                    <AnimatePresence>
                      {openIndex === faq.id && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                          <div className="pt-4 mt-4 border-t border-primary/20">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {faq.tags.map((tag) => (
                                <span key={tag} className="badge badge-outline badge-sm">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            <div className="bg-base-100 rounded-lg p-4">
                              <p className="text-base-content/80">{faq.answer}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All FAQs Accordion */}
        <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="space-y-4">
          {regularFAQs.map((faq) => (
            <motion.div key={faq.id} variants={itemVariants} className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="card-body p-6">
                <div className="flex items-start justify-between cursor-pointer" onClick={() => toggleFAQ(faq.id)}>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge badge-outline badge-sm capitalize">{faq.category}</span>
                      {faq.featured && <span className="badge badge-primary badge-sm">Featured</span>}
                    </div>
                    <h4 className="card-title text-base-content group-hover:text-primary transition-colors">{faq.question}</h4>
                  </div>
                  <button className="btn btn-circle btn-sm btn-ghost ml-4 flex-shrink-0">
                    <svg
                      className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === faq.id ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <AnimatePresence>
                  {openIndex === faq.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="pt-4 mt-4 border-t border-base-300">
                        <p className="text-base-content/70 mb-4">{faq.answer}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.map((tag) => (
                              <span key={tag} className="badge badge-outline badge-sm text-base-content/60">
                                #{tag}
                              </span>
                            ))}
                          </div>
                          <button className="btn btn-ghost btn-sm text-primary">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                              />
                            </svg>
                            Helpful
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 mx-auto text-base-content/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-base-content mb-2">No results found</h3>
              <p className="text-base-content/70 mb-6">We couldn't find any questions matching "{searchQuery}". Try different keywords or browse all categories.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="btn btn-primary"
              >
                View All Questions
              </button>
            </div>
          </motion.div>
        )}

        {/* Contact Support CTA */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 1, duration: 0.6 }} className="mt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">Still have questions?</h3>
                <p className="text-base-content/70 max-w-2xl">Can't find the answer you're looking for? Our support team is here to help you with any questions about Artify.</p>
              </div>
              <div className="flex  sm:flex-row gap-4">
                <button className="btn btn-primary btn-lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ delay: 0.8, duration: 0.6 }} className="mt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-base-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-primary">{faqs.length}</div>
              <div className="text-base-content/70 mt-2">Total Questions</div>
            </div>
            <div className="bg-base-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-secondary">{categories.length}</div>
              <div className="text-base-content/70 mt-2">Categories</div>
            </div>
            <div className="bg-base-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-accent">{featuredFAQs.length}</div>
              <div className="text-base-content/70 mt-2">Featured FAQs</div>
            </div>
            <div className="bg-base-100 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-info">24/7</div>
              <div className="text-base-content/70 mt-2">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
