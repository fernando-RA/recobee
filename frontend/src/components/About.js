import React from "react";
import Fade from "react-reveal/Fade";
import Image from "next/image";
import data from "../yourdata";

const About = () => (
  <div className="secion" id="about">
    <div className="container">
      <div className="about-section">
        <div className="content">
          <Fade bottom cascade>
            <h1>About Me</h1>
          </Fade>
          <p>
            {data.aboutParaOne}
            <br></br>
            <br></br>
            {data.aboutParaTwo}
            <br></br>
            <br></br>
            {data.aboutParaThree}
          </p>
        </div>
        <div className="image-wrapper">
          <Image src={data.aboutImage} alt="about" />
        </div>
      </div>
    </div>
  </div>
);
export default About;
