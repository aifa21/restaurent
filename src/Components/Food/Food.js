import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import { getDatabaseCart } from '../../utilities/databaseManager';
import DinnerCategory from '../DinnerCategory/DinnerCategory';
import fakeData from '../FakeData';
import FoodCategory from '../FoodCategory/FoodCategory';
import LaunchCategory from '../LaunchCategory/LaunchCategory';
import './Food.css';
const Food = () => {
    const [loggedInUser, setLoggedInUser] =useContext(UserContext);
    const [food,setFood]=useState(fakeData);
    const [breakfast,setBreakfast]=useState([]);
    const [launch,setLaunch]=useState([]);
    const [dinner,setDinner]=useState([]);

    const [showBreakfast,setShowBreakfast]=useState(false);
    const [showLaunch,setShowLaunch]=useState(false);
    const [showDinner,setShowDinner]=useState(false);
    

    

// handle food products
const handleBreakfast=()=>{
   
    const bf=food.filter(fd=>fd.category==='Breakfast');
    setBreakfast(bf);
    setShowBreakfast(true);
    setShowLaunch(false);
    setShowDinner(false);
  
}
const handleLaunch=()=>{
    const lc=food.filter(fd=>fd.category==='Launch');
    setLaunch(lc);
    setShowLaunch(true);
    setShowBreakfast(false);
    setShowDinner(false);
    
}
const handleDinner=()=>{
    const dn=food.filter(fd=>fd.category==='Dinner');
    setDinner(dn);
    setShowDinner(true);
    setShowLaunch(false);
    setShowBreakfast(false);
    
}

// CART INFO

const cartInfo=getDatabaseCart();
const cartKeys=Object.keys(cartInfo);
const cartCount=cartKeys.length;
console.log(cartCount);
console.log(loggedInUser);
console.log(loggedInUser.isSignedIn);
let checkoutBtn=' ';
if(loggedInUser.isSignedIn==true&& cartCount>0){
    checkoutBtn=<Link to='/shipment'><button className="btn-activate">Checkout Your food</button></Link>
    
}
else if( cartCount>0){
    checkoutBtn=<Link to='/shipment'><button className="btn-activate">Login  to Checkout</button></Link>
    
}

else{
    checkoutBtn=<button className="btn-deactivate">Create Account to Checkout Your food</button>
}


    return (
        <div className="food-section">
            <div className="food-content">
                <div className="foodBtnWrap d-flex justify-content-center ">
                    <button onClick={handleBreakfast} className={showBreakfast?'showBtnActive':'showBtnDeactive'}>Breakfast</button>
                    <button onClick={handleLaunch} className={showLaunch?'showBtnActive':'showBtnDeactive'}>Launch</button>
                    <button onClick={handleDinner} className={showDinner?'showBtnActive':'showBtnDeactive'}> Dinner</button>
                </div>
            <div className="container ">
            <div className="row">
          
           {
               showBreakfast&&breakfast.map(bf=> <FoodCategory breakfast={bf} id={bf.id}></FoodCategory>)
           }
           </div>
            {
                launch.length>0?
                <div className="row">
          
          {
              showLaunch&&launch.map(lc=> <LaunchCategory launch={lc} id={lc.id}></LaunchCategory>)
          }
          </div>
          :<div id="preloder">
                <div className="loader"></div>
              </div>
            }

         
           <div className="row">
          
          {
              showDinner&&dinner.map(dn=> <DinnerCategory dinner={dn} id={dn.id}></DinnerCategory>)
          }
       
            </div>
        </div>
        </div>
        {
            checkoutBtn
        }
        </div>
    );
};

export default Food;