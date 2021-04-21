import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHamburger, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logo from "../images/download.jfif";

import { getDatabaseCart } from "../../utilities/databaseManager";
import { UserContext } from "../../App";

const Header = (props) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
  let { cartAmount } = props;
  console.log("cart", props);
  if (cartAmount === 0) {
    const cart = getDatabaseCart();
    cartAmount = Object.keys(cart).length;
  }
  return (
    <header id="header">
      <nav>
        <ul>
          <li>
            {" "}
            <Link className="nav-item" to="/home">
              Home
            </Link>
          </li>
          <li>
            {" "}
            <Link className="nav-item" to="/food">
              Foods
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/review">
              Service
            </Link>
          </li>
          <li>
            {" "}
            <Link className="nav-item" to="/shipment">
              Shipment
            </Link>
          </li>
          <li>
            {" "}
            <Link className="nav-item" to="/contact">
              Contact
            </Link>
          </li>
          <li>
            <Link className="nav-item" to="/login">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>

          <li>
            <Link className="nav-item" to="/login">
              <FontAwesomeIcon icon={faShoppingCart} />(
              <span className="cart-length">{cartAmount}</span>)
            </Link>
          </li>
        </ul>
      </nav>

      <div className="logo">
        {loggedInUser.name ? (
          <nav>
              <ul>
            <li>
              {" "}
              <Link to="/" className="nav-item"style={{fontSize:"20px"}}>
                {loggedInUser.name}
              </Link>{" "}
            </li>
            <li>
              <Link to="/" className="nav-item">
                <button style={{background:"yellow",fontSize:"18px",fontWeight:"600"}}
                  onClick={() => setLoggedInUser({})}
                  className="btn btn-rounded"
                >
                  Sign Out
                </button>
              </Link>
            </li>
          </ul>
          </nav>
        ) : (
          <Link className="nav-item" to="/home">
            {" "}
            <FontAwesomeIcon icon={faHamburger} />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
