import React from 'react';
import banner from '../assets/images/homephoto.jpg'

const NewBanner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-opacity-60 bg-black"></div>
      <div className="hero-content flex-col lg:flex-row text-white">
        <div className="max-w-md text-left">
          <h1 className="text-4xl font-bold mb-5">Welcome to Our Platform</h1>
          <p className="mb-5">
            Join us to explore the limitless opportunities waiting for you.
            Learn, grow, and achieve your dreams with our extensive resources.
          </p>
          <button className="btn btn-secondary">Learn More</button>
        </div>
       
      </div>
    </div>
  );
};

export default NewBanner;
