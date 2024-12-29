import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faYoutube
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row">
          {/* About Us Section */}
          <div className="col-md">
            <h5>About Us</h5>
            <p>
            FlamingoTube!-- Your ultimate destination for streaming movies! 
            Discover, watch, and enjoy a curated library of entertainment anytime, anywhere!
            </p>
          </div>
          <div className="col-md">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/search">Search Movies</a>
              </li>
              <li>
                <a href="/movie">Discover Movies</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="col-md">
            <h5>Follow Us</h5>
            <div className="icons">
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="icon">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p> {new Date().getFullYear()} FlamingoTube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
