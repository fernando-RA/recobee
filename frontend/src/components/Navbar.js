import React, { useState } from "react";
import { Fade } from "react-reveal";
import Image from "next/image";
import { Link } from "react-scroll";

import NextLink from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="section">
      <div className="container">
        <div className="navbar-wrapper">
          <div className="logo-container">
            <Image src="/logo.jpg" alt="logo" height={24} width={24} />
            <Link role="button" className="name" to="home">
              Recobee
            </Link>
          </div>
          {menuOpen && (
            <Fade top>
              <div className="links-wrapper">
                <span>
                  <NextLink href="/newsletter">Newsletter</NextLink>
                </span>
                <span>
                  {" "}
                  <NextLink href="/cal">Consult</NextLink>
                </span>
                <span>
                  <NextLink href="/discord">Discord</NextLink>
                </span>

                <span>
                  <NextLink href="/tribe">Tribe</NextLink>
                </span>
              </div>
            </Fade>
          )}
          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="hamburger-container">
              <div className="hamburger-line"></div>
              <div className="hamburger-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
