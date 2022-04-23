import React from "react";
import Image from "next/image";
import data from "../yourdata";

const Footer = () => (
  <div className="section" id="contact">
    <div className="container">
      <div className="footer-container">
        <div className="social-icons">
          {data.social.map((socialLink, i) => (
            <a
              key={i}
              href={socialLink.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image width={24} height={24} src={socialLink.img} alt="icons" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
