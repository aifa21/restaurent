import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import {
  getDatabaseCart,
  removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import CartProduct from "../CartProduct/CartProduct";
import fakeData from "../FakeData";
import symbol from "../images/Group 1151.png";
import symbol1 from "../images/Group 1152.png";
import "./Shipment.css";
const Shipment = () => {
  const [orderBtn, setOrderBtn] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [errorOrderMsg, setErrorOrderMsg] = useState(null);
  const [showPayment, setShowPayment] = useState(null);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const today = new Date();
  const tomorrow = new Date(today);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    setOrderBtn(true);
    setShippingInfo(data);
  };

  console.log(watch("example")); // watch input value by passing the name of it

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    console.log("savecart = ", saveCart);
    const productKeys = Object.keys(saveCart);
    console.log("product = ", productKeys);

    const cartProduct = productKeys.map((key) => {
      const product = fakeData.find((pd) => pd.id == key);
      console.log("productdd=", product);
      product.quantity = saveCart[key];
      return product;
    });
    setCart(cartProduct);
  }, []);

  const removeCart = (productKey) => {
    const newCart = cart.filter((pd) => pd.id !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  let subTotal = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    //  console.log("product=",product);
    subTotal = subTotal + product.price * product.quantity;
  }

  const activeBtn = () => {
    setShowPayment(true);
  };
  const inActiveBtn = () => {
    setErrorOrderMsg("You have to fill up the shipment form....");
  };
  return (
    <div className="container">
      {
        <div style={{ display: showPayment ? "none" : "block" }}>
          <div className="col-md-6">
            <div className="ship-container">
              <h4 className="ship-title">Shipment form</h4>
              <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <input
                  name="name"
                  placeholder="Your Name"
                  defaultValue={loggedInUser.name}
                  ref={register({ required: true })}
                />{" "}
                {errors.name && <span className="error">Name is required</span>}
                <input
                  name="email"
                  placeholder="Your Email"
                  defaultValue={loggedInUser.email}
                  ref={register({ required: true })}
                />{" "}
                {errors.email && (
                  <span className="error">Email is required</span>
                )}
                <input
                  name="address"
                  placeholder="Your Address"
                  ref={register({ required: true })}
                />{" "}
                {errors.address && (
                  <span className="error">Address is required</span>
                )}
                <input
                  name="city"
                  placeholder="Your City"
                  ref={register({ required: true })}
                />{" "}
                {errors.city && <span className="error">City is required</span>}
                <input
                  name="phone"
                  placeholder="Your Phone number"
                  ref={register({ required: true })}
                />{" "}
                {errors.phone && (
                  <span className="error">Phone number is required</span>
                )}
                <input type="submit" />
              </form>
            </div>
          </div>
          <div className="col-md-4">
            <div className="cart-container">
              <h6 className="cart-title">Cart food item : {cart.length} </h6>
              {cart.map((pd) => (
                <CartProduct
                  pd={pd.id}
                  product={pd}
                  removeCart={removeCart}
                ></CartProduct>
              ))}

              <div className="cart-below d-flex justify-content-between">
                <div className="cart-cost">
                  <p>Subtotal : </p>
                  <p>Delivery : </p>
                  <p>Total : </p>
                </div>
                <div className="cart-value">
                  <p> ${subTotal.toFixed(2)}</p>
                  <p> $50</p>
                  <p> ${(subTotal + 50).toFixed(2)}</p>
                </div>
              </div>
              {orderBtn ? (
                <button onClick={activeBtn} className="activeOrder">
                  Place Order
                </button>
              ) : (
                <button onClick={inActiveBtn} className="inActiveOrder">
                  Place Order
                </button>
              )}
              {errorOrderMsg && (
                <p
                  style={{
                    color: "red",
                    fontSize: "15px",
                    fontWeight: "600",
                    marginTop: "15px",
                  }}
                >
                  {errorOrderMsg}
                </p>
              )}
            </div>
          </div>
        </div>
      }
      {
        <div style={{ display: showPayment ? "block" : "none" ,marginTop:"80px",marginBottom:"80px"}}>
          <div className="row justify-content-between">
            <div className="col-md-4">
              <div className="checkout-left">
                <img src={symbol} alt=""/>
                <div className="address-info">
                  <div className="userAddress">
                    <h4>Your Location</h4>
                    <p>
                      {" "}
                      {shippingInfo &&
                        `${shippingInfo.address},${shippingInfo.city}`}
                    </p>
                  </div>
                  <div className="shopAddress" style={{marginTop:"17px"}}>
                    <h4>Shop Address</h4>
                    <p>Bahaddarhat, Chittagong</p>
                  </div>
                </div>
                <div className="username d-flex align-items-center justify-content-start">
                  <img src={symbol1} />
                  <div className="mt-3">
                    <h4>{shippingInfo && `${shippingInfo.name}`}</h4>
                  </div>
                </div>
                <button>Contact</button>
              </div>
            </div>

            <div className="col-md-6">
              <div className="payment-info"></div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Shipment;
