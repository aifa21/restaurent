import React from 'react';
import './CartProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
const CartProduc = (props) => {
    const {id,img,name,price,quantity}=props.product;
    return (
        <div className="cart-section">
            <div className="cart-info d-flex justify-content-between align-items-center">
            <div className=" cart-content d-flex justify-content-start">
                <div className="cart-img"><img src={img}/>
                </div>
                <div className="cart-text">
                    <h2>{name}</h2>
                    <p>${price}</p>
                    <p>Quantity : {quantity}</p>
                </div>
            </div>
            <div className="remove-content d-flex align-items-center">
                <button onClick={()=>props.removeCart(id)}><FontAwesomeIcon style={{color:"red",border:"none"}}icon={faTimes}/></button>
                </div>
            </div>
            
        </div>
    );
};

export default CartProduc;