import React from 'react';
import { Link } from 'react-router-dom';
import './FoodCategory.css';
const FoodCategory = (props) => {
    const {img,name,category,price,id}=props.breakfast;

    return (
        <div className="col-md-4">
            <Link to={"/foodDetail/"+id} style={{ textDecoration: 'none',color:"black" }}>
            <div className="food-container">
           <div className="food-img">
           <img src={img}/>
           </div>
            <div className="food-description">
            <h4 style={{fontSize:'20px'}}> {name} </h4>
            <p style={{fontSize:'15px',color:'gray'}}>Category: {category}</p>
            <p style={{fontSize:'16px',marginBottom:'10px'}}>$ {price}</p>
            </div>
            </div>
            </Link>
        </div>
    );
};

export default FoodCategory;