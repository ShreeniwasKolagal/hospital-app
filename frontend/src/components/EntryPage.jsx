// EntryPage.jsx

import React from "react";
import "./EntryPage.css";

const EntryPage = () => {
  return (
    <div className="home-container">
      {/*Header*/}
      <header className="hero-section">
        <p className="hero-subtitle">Welcome to Hospital Management Portal</p>
        <a href="/login" className="hero-button">
          Login!
        </a>
      </header>
      `{/*About Section*/}
      <section className="about-section">
        <h2>Why trust us?</h2>
        <p>
          "Our Hospital Management Portal is designed with a commitment to
          reliability, security, and efficiency, ensuring that your sensitive
          data remains protected at all times. Built with the latest technology,
          the portal is fully compliant with healthcare standards and
          regulations, safeguarding patient privacy and confidentiality. We
          prioritize transparency and user-friendly features, making it easy for
          hospitals to manage operations, streamline processes, and enhance
          patient care. With a dedicated support team and a proven track record
          of success, our portal is trusted by healthcare providers to deliver
          seamless and secure solutions for managing hospital operations
          effectively."
        </p>
      </section>
      {/*Stats Section*/}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stats-item">
            <h3>1200+</h3>
            <p>Successful registrations</p>
          </div>
          <div className="stats-item">
            <h3>900+</h3>
            <p>Registered patients</p>
          </div>
          <div className="stats-item">
            <h3>500+</h3>
            <p>Patients Helped</p>
          </div>
        </div>
      </section>
      {/*How to donate Section*/}
      <section className="how-to-donate">
        <h2>How to register?</h2>
        <ol>
          <li>Click on the below sign up button</li>
          <li>Add your name, email, password and role</li>
          <li>Come prepared, stay hydrated and track progress!</li>
        </ol>
        <a href="/signup" className="donate-link">
          Click here to register!
        </a>
      </section>
      {/*Footer*/}
      <footer className="footer">
        <p>
          Join our community of life-savers. Follow us on social media or
          contact us for more information.
        </p>
      </footer>
    </div>
  );
};

export default EntryPage;
