import React from "react";
import "./Home.css";
import vid1 from "../images/Image/2e123c1ab1e31167e08ac8a52daa377a.png";

const Home = () => {
  return (
    <section id="home" className="container-fluid ">
      <div className="row min-vh-100 align-items-center home">
        <div className="col-sm-12 col-md-8    content">
          <h1>Food that you can't resist</h1>
          <h2>Enjoy the marvelous taste</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, libero?
            Odio sed animi culpa sit aperiam vel nobis sequi iste.
          </p>
          <button>Get started</button>
        </div>
        <div className="video-container">
          <img src={vid1} ></img>
        </div>
       
      </div>
    </section>
  );
};

export default Home;
