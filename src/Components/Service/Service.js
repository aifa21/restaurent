import React from "react";
import "./Service.css";
import {
  faTruck,
  faBell,
  faLuggageCart,
} from "@fortawesome/free-solid-svg-icons";
import img1 from "../images/adult-blur-blurred-background-687824.png";
import img2 from "../images/chef-cook-food-33614.png";
import img3 from "../images/architecture-building-city-2047397.png";
import SingleService from "../SingleService/SingleService";

const Service = () => {
  const fakeService = [
    { id: 1, title: "Fast Delivery", img: img1, icon: faTruck },
    { id: 2, title: "A Good Auto Responder", img: img2, icon: faBell },
    { id: 3, title: "Home Delivery", img: img3, icon: faLuggageCart },
  ];
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="service-top">
            <h2>Why Choose Us</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis laboriosam repellat perferendis corrupti numquam neque,
              vitae nemo.
            </p>
          </div>
        </div>
     
      <div className="col-md-6"></div>
      </div>

      <div className="row">
        {fakeService.map((service) => (
          <SingleService key={service.id} services={service}></SingleService>
        ))}
      </div>
    </div>
  );
};

export default Service;
