import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import fakeData from "../FakeData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import "./FoodDetails.css";
import {
    getDatabaseCart,
    processOrder,
    removeFromDatabaseCart,
    addToDatabaseCart
  } from "../../utilities/databaseManager";
  const FoodDetails = (props) => {
  const {setCartAmount}=props;    
  const { foodKey } = useParams();

  const food = fakeData.find((pd) => pd.id === foodKey);
  const [quantity, setQuantity] = useState(1);
  const [btn,setBtn]=useState(true);
  const [successMsg,setSuccessMsg]=useState(null);
  const handlePlus=()=>{
      const foodQuantity=quantity+1;
      setQuantity(foodQuantity);

  }
  const handleMinus=()=>{
      if(quantity>1){
        const foodQuantity=quantity-1;
        setQuantity(foodQuantity);
      }
    }
      const handleCart=(food)=>{
         addToDatabaseCart(food.id, quantity);
            const cart = getDatabaseCart();
            const cartAmount=Object.keys(cart).length;

            setCartAmount(cartAmount);

            setBtn(false);
            setSuccessMsg('Food add to the cart successfully.');
              
      }
    
  return (
    <div className="food-detailsContent">
      <div className="row">
        <div className="col-md-5 food-detailsDes">
          <h1>{food.name}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            mollitia laudantium ipsa. Blanditiis, harum illum praesentium
            reprehenderit earum a, sapiente quasi laboriosam nobis vitae
            similique.
          </p>
          <div className="product-price d-flex align-items-center ">
            <h2 style={{ marginTop: "15px" }}>${(food.price*quantity).toFixed(2)}</h2>

            <div className="product-quantity d-flex">
              <button onClick={handleMinus}>-</button>
              <span id="quantity">{quantity}</span>
              <button onClick={handlePlus}>+</button>
            </div>
          </div>
         <div className="btn-left">
             { 
                 btn? <button onClick={()=>handleCart(food)} className="main-button"><FontAwesomeIcon icon={faShoppingCart}/> <span>Add</span></button> 
                 : <Link to="/home"> <button onClick={()=>handleCart(food)} className="main-button"><FontAwesomeIcon icon={faShoppingCart}/> <span>See More...</span></button></Link>
             }
         </div>
         <div className="btn-right">
             {
                 successMsg&&<p >{successMsg}</p>
             }
         </div>
        </div>

        <div className="col-md-6  food-detailsImg">
          <img src={food.img} />
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
