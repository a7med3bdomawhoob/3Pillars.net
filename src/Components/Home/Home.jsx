import React from 'react';
import './Home.module.css'; // Optional for custom styling

const WelcomeHome = () => {
  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <h1>Welcome to 3PillarsTC!</h1>
        <p>Your trusted platform for growth and innovation.</p>
      </header>

      <section className="welcome-content">
        <h2>Get Started</h2>
        <p>We are excited to have you here. Explore our platform and make the most of the tools and resources available.</p>

        <div className="buttons-container">
          <button className="explore-btn">Explore Features</button>
          <button className="contact-btn">Contact Us</button>
        </div>
      </section>

      <footer className="welcome-footer">
        <p>© 2025 3PillarsTC. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default WelcomeHome;
