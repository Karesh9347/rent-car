import React from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Service from "../components/Service";
import about from "../assets/images/aboutphoto.jpg";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <div style={{marginTop:"68px"}}>
      <Hero img={about} pageName="About" />

      <Container>
        <p className="text-lg text-gray-600 ">
          Welcome to our platform, a hub for creativity, learning, and growth.
          Our mission is to empower individuals by providing the resources and
          tools they need to achieve their goals. Whether you're a student,
          professional, or hobbyist, our community offers opportunities to
          explore new ideas and enhance your skills.
        </p>
        <p className="text-lg text-gray-600 ">
          Founded on the principles of innovation and inclusivity, we believe in
          fostering an environment where everyone can thrive. From hands-on
          tutorials to engaging discussions, we aim to make learning an
          enjoyable and rewarding experience.
        </p>
        <p className="text-lg text-gray-600">
          Join us today to embark on a journey of discovery and accomplishment.
          Together, let's make your aspirations a reality.
        </p>
      </Container>

      <Service />
      <Footer />
    </div>
  );
};

export default About;
