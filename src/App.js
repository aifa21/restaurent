import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Food from './Components/Food/Food';
import FoodDetails from './Components/FoodDetails/FoodDetails';
import { useState } from 'react';
import Footer from './Components/Footer/Footer';
import Service from './Components/Service/Service';
import Login from './Components/Login/Login';
import { createContext } from "react";
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Shipment from './Components/Shipment/Shipment';
export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [cartAmount,setCartAmount]=useState(0);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
       
    <Header  cartAmount={cartAmount}></Header>
    <Switch>
    <Route  path="/home">
        <Home></Home>
        <Food></Food>
        <Service></Service>
      </Route>
      <Route  path="/food">
        <Food></Food>

      </Route>
      <Route  path="/service">
        <Service></Service>

      </Route>
      <Route exact path="/">
        <Home></Home>
        <Food></Food>
        <Service></Service>

      </Route>
      <Route path="/login">
        <Login></Login>

      </Route>
      <Route path="/foodDetail/:foodKey">
        <FoodDetails setCartAmount={setCartAmount}></FoodDetails>

      </Route>
      <PrivateRoute path="/shipment">
        <Shipment></Shipment>
      </PrivateRoute>
     
    </Switch>
    <Footer></Footer>
  </Router>
  </UserContext.Provider>
  );
}

export default App;
