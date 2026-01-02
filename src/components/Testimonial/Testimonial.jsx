// TestimonialsSection.jsx
import React, { useState } from "react";

const TestimonialsSection = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      role: "Digital Artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      content: "Artify has completely transformed how I organize my artwork. The statistics section gives me perfect insights into my collection!",
      rating: 5,
      date: "2024-01-15",
    },
    {
      id: 2,
      name: "Samantha Lee",
      role: "Illustrator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha",
      content: "As an illustrator with hundreds of pieces, the ability to track favorites and analyze my collection is invaluable. Highly recommended!",
      rating: 4,
      date: "2024-01-10",
    },
    {
      id: 3,
      name: "Marcus Chen",
      role: "3D Artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      content: "The clean interface and detailed statistics help me understand which of my works resonate most with my audience.",
      rating: 5,
      date: "2024-01-05",
    },
    {
      id: 4,
      name: "Elena Rodriguez",
      role: "Art Curator",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
      content: "Perfect for managing gallery collections. The statistics provide clear insights for exhibition planning.",
      rating: 5,
      date: "2023-12-28",
    },
    {
      id: 5,
      name: "David Park",
      role: "Concept Artist",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      content: "Love how easy it is to track my favorite pieces. The progress visualization is particularly helpful.",
      rating: 4,
      date: "2023-12-20",
    },
    {
      id: 6,
      name: "Olivia Smith",
      role: "Art Teacher",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia",
      content: "I use this with my students to help them track their artistic journey. The statistics motivate them to create more!",
      rating: 5,
      date: "2023-12-15",
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [filter, setFilter] = useState("all"); // 'all', '5star', 'recent'

  // Filter testimonials based on selected filter
  const filteredTestimonials = testimonials.filter((testimonial) => {
    if (filter === "5star") return testimonial.rating === 5;
    if (filter === "recent") {
      const testimonialDate = new Date(testimonial.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return testimonialDate > thirtyDaysAgo;
    }
    return true;
  });

  // Function to render star ratings
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg key={index} className={`w-4 h-4 ${index < rating ? "text-warning" : "text-base-content/20"}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen py-8 md:py-12 px-4 bg-gradient-to-br from-base-200 to-base-200  md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">What Artists Say</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto text-sm md:text-base">Join thousands of artists who use Artify to manage and analyze their creative collections</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">{testimonials.length}</div>
            <div className="text-xs md:text-sm text-base-content/70 mt-1">Total Reviews</div>
          </div>
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-secondary">{testimonials.filter((t) => t.rating === 5).length}</div>
            <div className="text-xs md:text-sm text-base-content/70 mt-1">5-Star Reviews</div>
          </div>
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-accent">{Math.round((testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length) * 10) / 10}</div>
            <div className="text-xs md:text-sm text-base-content/70 mt-1">Avg Rating</div>
          </div>
          <div className="bg-base-200 rounded-xl p-4 text-center">
            <div className="text-2xl md:text-3xl font-bold text-info">{testimonials.filter((t) => new Date(t.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}</div>
            <div className="text-xs md:text-sm text-base-content/70 mt-1">This Month</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          <button onClick={() => setFilter("all")} className={`btn btn-sm ${filter === "all" ? "btn-primary" : "btn-outline"}`}>
            All Reviews
          </button>
          <button onClick={() => setFilter("5star")} className={`btn btn-sm ${filter === "5star" ? "btn-primary" : "btn-outline"}`}>
            5-Star Only
          </button>
          <button onClick={() => setFilter("recent")} className={`btn btn-sm ${filter === "recent" ? "btn-primary" : "btn-outline"}`}>
            Recent (30 Days)
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body">
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex">{renderStars(testimonial.rating)}</div>
                  <span className="text-sm text-base-content/70 ml-2">{testimonial.rating}.0</span>
                </div>

                {/* Testimonial Text */}
                <p className="text-base-content italic mb-6">"{testimonial.content}"</p>

                {/* Author Info */}
                <div className="flex items-center mt-auto">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring-2 ring-primary/20 ring-offset-base-100 ring-offset-2">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=random`;
                        }}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-base-content">{testimonial.name}</h4>
                    <p className="text-sm text-base-content/70">{testimonial.role}</p>
                    <p className="text-xs text-base-content/50 mt-1">{formatDate(testimonial.date)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel for Mobile */}
        <div className="md:hidden mb-12">
          <div className="carousel w-full">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} id={`slide${index}`} className="carousel-item relative w-full">
                <div className="card bg-base-200 shadow-xl mx-2">
                  <div className="card-body">
                    <div className="flex items-center mb-4">
                      <div className="flex">{renderStars(testimonial.rating)}</div>
                      <span className="text-sm text-base-content/70 ml-2">{testimonial.rating}.0</span>
                    </div>

                    <p className="text-base-content italic mb-6">"{testimonial.content}"</p>

                    <div className="flex items-center">
                      <div className="avatar">
                        <div className="w-10 h-10 rounded-full">
                          <img src={testimonial.avatar} alt={testimonial.name} />
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-bold text-base-content text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-base-content/70">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center w-full py-4 gap-2">
            {testimonials.map((_, index) => (
              <a key={index} href={`#slide${index}`} className={`btn btn-xs ${index === activeIndex ? "btn-primary" : "btn-ghost"}`} onClick={() => setActiveIndex(index)}>
                {index + 1}
              </a>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto">
          <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-base-300">
            <div className="card-body text-center">
              <h3 className="card-title text-2xl md:text-3xl font-bold text-base-content mb-4 justify-center">Ready to Transform Your Art Collection?</h3>
              <p className="text-base-content/70 mb-6">Join our community of artists and start tracking your creative journey today.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn btn-primary">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Add Your Testimonial
                </button>
                <button className="btn btn-outline">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  View All Reviews
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Review Form (Collapsible) */}
        <div className="max-w-2xl mx-auto mt-12">
          <div className="collapse collapse-arrow bg-base-200 border border-base-300">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium text-base-content">Share Your Experience</div>
            <div className="collapse-content">
              <div className="space-y-4 pt-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Your Name</span>
                  </label>
                  <input type="text" placeholder="Enter your name" className="input input-bordered bg-base-100" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Your Role</span>
                  </label>
                  <input type="text" placeholder="e.g., Digital Artist, Illustrator" className="input input-bordered bg-base-100" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Rating</span>
                  </label>
                  <div className="rating rating-lg">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input key={star} type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                    ))}
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Your Testimonial</span>
                  </label>
                  <textarea className="textarea textarea-bordered h-32 bg-base-100" placeholder="Share your experience with Artify..."></textarea>
                </div>
                <button className="btn btn-primary w-full">Submit Testimonial</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
