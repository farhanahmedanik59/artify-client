import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

const BlogsSection = () => {
  const [activeBlog, setActiveBlog] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState(1);
  const sectionRef = useRef(null);

  const blogs = [
    {
      id: 1,
      title: "Mastering Digital Art Techniques",
      author: "Alex Chen",
      authorRole: "Digital Artist",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=6366f1",
      category: "Tutorial",
      readTime: "8 min read",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      excerpt: "Discover advanced digital painting techniques used by professional artists to create stunning visual effects and realistic textures in your artwork.",
      content:
        "In this comprehensive guide, we explore the latest digital art techniques that can elevate your artwork to professional levels. Learn about layer management, brush customization, and color theory applications...",
      tags: ["Digital Art", "Painting", "Tutorial"],
      stats: { likes: 245, comments: 42, shares: 89 },
    },
    {
      id: 2,
      title: "The Future of AI in Art Creation",
      author: "Maya Rodriguez",
      authorRole: "AI Art Researcher",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=8b5cf6",
      category: "Technology",
      readTime: "12 min read",
      date: "2024-01-12",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      excerpt: "Explore how artificial intelligence is revolutionizing the art world and what it means for traditional artists in the digital age.",
      content:
        "Artificial intelligence is transforming creative industries at an unprecedented pace. This article examines the ethical considerations, creative possibilities, and future implications of AI-generated art...",
      tags: ["AI", "Technology", "Future"],
      stats: { likes: 312, comments: 67, shares: 124 },
    },
    {
      id: 3,
      title: "Color Psychology in Modern Design",
      author: "David Park",
      authorRole: "Design Director",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David&backgroundColor=ec4899",
      category: "Design Theory",
      readTime: "6 min read",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      excerpt: "Understanding how colors influence emotions and perceptions can dramatically improve your design work and artistic compositions.",
      content:
        "Color is one of the most powerful tools in an artist's arsenal. This guide breaks down color psychology and its practical applications in various art forms, from digital design to traditional painting...",
      tags: ["Color Theory", "Psychology", "Design"],
      stats: { likes: 189, comments: 31, shares: 56 },
    },
    {
      id: 4,
      title: "Building Your First Art Portfolio",
      author: "Sarah Johnson",
      authorRole: "Career Coach",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=0ea5e9",
      category: "Career",
      readTime: "10 min read",
      date: "2024-01-08",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      excerpt: "A step-by-step guide to creating a compelling art portfolio that attracts clients and opens doors to professional opportunities.",
      content:
        "Your portfolio is your visual resume. Learn how to curate, organize, and present your artwork effectively to stand out in today's competitive creative market. Includes tips for both digital and physical portfolios...",
      tags: ["Portfolio", "Career", "Guide"],
      stats: { likes: 278, comments: 45, shares: 92 },
    },
    {
      id: 5,
      title: "Sustainable Art Practices",
      author: "Eco Artists Collective",
      authorRole: "Environmental Artists",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Eco&backgroundColor=10b981",
      category: "Sustainability",
      readTime: "7 min read",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      excerpt: "How artists are embracing eco-friendly materials and practices to create beautiful art while protecting our planet.",
      content:
        "Sustainability meets creativity in this exploration of eco-friendly art practices. Discover alternative materials, energy-efficient studios, and how artists worldwide are reducing their environmental impact...",
      tags: ["Sustainability", "Eco", "Practice"],
      stats: { likes: 156, comments: 28, shares: 41 },
    },
    {
      id: 6,
      title: "Abstract Art: Finding Meaning in Chaos",
      author: "Marcus Lee",
      authorRole: "Abstract Artist",
      authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus&backgroundColor=f59e0b",
      category: "Art Theory",
      readTime: "9 min read",
      date: "2024-01-03",
      image: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      excerpt: "Understanding abstract art and learning how to appreciate the beauty in seemingly chaotic compositions.",
      content:
        "Abstract art challenges traditional perspectives and invites viewers to find their own meaning. This article explores the history, techniques, and interpretation of abstract art in the modern context...",
      tags: ["Abstract", "Theory", "Modern"],
      stats: { likes: 223, comments: 39, shares: 78 },
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
      setActiveBlog((prev) => (prev + 1) % blogs.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  const handleNavigation = (index) => {
    setDirection(index > activeBlog ? 1 : -1);
    setActiveBlog(index);
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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-gradient-to-br from-base-200 to-base-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-base-content mb-6">
            <TypewriterText text="Art & Creativity Blog" />
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            <TypewriterText text="Insights, tutorials, and inspiration from the creative world" />
          </p>
        </motion.div>

        {/* Featured Blog Carousel */}
        <div className="relative min-h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={activeBlog} custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-full">
                <img src={blogs[activeBlog].image} alt={blogs[activeBlog].title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  {/* Category Badge */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-4 py-2 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-full text-sm font-semibold mb-4"
                  >
                    {blogs[activeBlog].category}
                  </motion.span>

                  {/* Title */}
                  <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-3xl md:text-4xl font-bold mb-4">
                    {blogs[activeBlog].title}
                  </motion.h3>

                  {/* Excerpt */}
                  <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg opacity-90 mb-6 max-w-3xl">
                    {blogs[activeBlog].excerpt}
                  </motion.p>

                  {/* Author & Meta Info */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center">
                      <div className="avatar mr-4">
                        <div className="w-12 h-12 rounded-full ring-2 ring-primary/30 ring-offset-base-200 ring-offset-2">
                          <img src={blogs[activeBlog].authorAvatar} alt={blogs[activeBlog].author} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-white">{blogs[activeBlog].author}</h4>
                        <p className="text-sm opacity-80">{blogs[activeBlog].authorRole}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-xl font-bold">{blogs[activeBlog].stats.likes}</div>
                        <div className="text-sm opacity-80">Likes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">{blogs[activeBlog].stats.comments}</div>
                        <div className="text-sm opacity-80">Comments</div>
                      </div>
                      <div className="text-sm opacity-80">
                        {blogs[activeBlog].readTime} • {formatDate(blogs[activeBlog].date)}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeBlog ? "bg-primary scale-125" : "bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <Fade>
          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {blogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 17 },
                }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden"
              >
                {/* Image */}
                <figure className="relative overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary badge-lg">{blog.category}</span>
                  </div>
                </figure>

                {/* Content */}
                <div className="card-body p-6">
                  {/* Meta Info */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className="avatar mr-3">
                        <div className="w-8 h-8 rounded-full">
                          <img src={blog.authorAvatar} alt={blog.author} />
                        </div>
                      </div>
                      <span className="text-sm text-base-content/70">{blog.author}</span>
                    </div>
                    <span className="text-sm text-base-content/70">{blog.readTime}</span>
                  </div>

                  {/* Title */}
                  <h3 className="card-title text-base-content group-hover:text-primary transition-colors mb-3">{blog.title}</h3>

                  {/* Excerpt */}
                  <p className="text-base-content/70 mb-4 line-clamp-2">{blog.excerpt}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="badge badge-outline badge-sm text-base-content/60 hover:badge-primary transition-all">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Stats & Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-base-300">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-base-content/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>
                        <span>{blog.stats.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-base-content/70">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          />
                        </svg>
                        <span>{blog.stats.comments}</span>
                      </div>
                    </div>
                    <span className="text-sm text-base-content/70">{formatDate(blog.date)}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Fade>

        {/* Blog Categories */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 0.8, duration: 0.6 }} className="mb-16">
          <h3 className="text-3xl font-bold text-base-content mb-8 text-center">Browse by Category</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["Tutorial", "Technology", "Design Theory", "Career", "Sustainability", "Art Theory", "Inspiration", "Tools"].map((category) => (
              <button key={category} className="btn btn-outline hover:btn-primary transition-all duration-300">
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }} transition={{ delay: 1, duration: 0.6 }} className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
            <h3 className="text-2xl md:text-3xl font-bold text-base-content mb-4">Share Your Creative Journey</h3>
            <p className="text-base-content/70 mb-6 max-w-2xl mx-auto">Want to contribute to our blog? Share your experiences, techniques, and insights with our creative community.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn btn-primary btn-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Write an Article
              </button>
              <button className="btn btn-outline btn-lg">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
                View All Blogs
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsSection;
