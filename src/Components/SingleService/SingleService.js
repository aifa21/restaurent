import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import './SingleService.css';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
const SingleService = (props) => {
    const {title,img,icon}=props.services;
    const [lessBtn,setLessBtn]=useState(false);
    const [moreText,setMoreText]=useState(null);
   
    const handleSeeLess=()=>{
        setMoreText(null);
        setLessBtn(false);
        
    }
    const handleSeeMore=()=>{
        setLessBtn(true);
        setMoreText("Lorem sit amet consectetur adipisicing");
    }
    return (
        <div className="col-md-4">
           <div className="serviceContent">
           <img src={img} alt=""className="img-fluid"/>
           <div className="row mt-4">
           <div className="col-md-2 mt-3"><span className="icon"><FontAwesomeIcon icon={icon}/></span></div>
           <div className="col-md-10"><h2>{title}</h2> 
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.{moreText&&moreText} </p>
           {
               lessBtn?<button onClick={handleSeeLess}>See Less <span className="btnIcon"><FontAwesomeIcon icon={faArrowRight}/></span></button>:
               <button onClick={handleSeeMore}>See more <span className="btnIcon"><FontAwesomeIcon icon={faArrowRight}/></span></button>
           }
           </div>

           </div>
           
           </div>


        </div>
    );
};

export default SingleService;