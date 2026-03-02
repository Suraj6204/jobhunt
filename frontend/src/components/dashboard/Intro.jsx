import React from "react";

const Intro = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Find Your Dream Job
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Explore thousands of job opportunities and take the next step in your
        career.
      </p>
      <a
        href="/signup"
        className="inline-block px-8 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary-foreground transition-colors"
      >
        Get Started
      </a>

    </div>
  );
};

export default Intro;
