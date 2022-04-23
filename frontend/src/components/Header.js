import React from "react";
import Fade from "react-reveal/Fade";
import Typewriter from "typewriter-effect";

import data from "yourdata";
import WalletConnectBtn from "components/w3/walletConnectBtn";

const Header = () => (
  <div className="section" id="home">
    <div className="container">
      <div className="header-wrapper">
        <Fade bottom cascade>
          <div className="heading-wrapper">
            {data.headerTagline.map((hl, i) =>
              i !== 1 ? (
                <h1 key={i}>{hl}</h1>
              ) : (
                <h1 style={{ color: "#3866f5" }} key={i}>
                  <Typewriter
                    options={{
                      strings: [...hl],
                      autoStart: true,
                      delay: 20,
                      deleteSpeed: 20,
                      loop: true,
                    }}
                  />
                </h1>
              )
            )}
          </div>
        </Fade>
        <Fade bottom>
          <p className="description">{data.headerParagraph}</p>
        </Fade>
        <div style={{"display": "block"}}>
          <WalletConnectBtn link={data.contactLink} />
        </div>
        <div className="btn-container">
          <Fade bottom>
            <a
              href={data.newsletterLink}
              target="blank"
              rel="noopener"
              className="secondary-btn"
            >
              Join the Discord
            </a>
            <button className="tertiary-btn" onClick={() => {}}>
              Whitepaper
            </button>
          </Fade>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
