import React from 'react';
import './Footer.css';
const Footer = () => {
    return (
        <section id="footer-section">
            <div className="footer-top">
            <div className="container ">
                <div className="row">
                    <div className="col-md-4  ">
                    <h2>About us</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum delectus excepturi
                 sint nobis suscipit quaerat explicabo eveniet. Maxime, unde placeat!</p>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                        <h2>Important Info</h2>
                        <p>Read our blog</p>
                            <p>Sign up to deliver</p>
                            <p>Privacy & Policy</p>
                            <p>Terms of use</p>
                            <p>About Online food</p>
                    </div>
                    <div className="col-md-3">
                        <h2>Our Company</h2>
                        <p>Get help</p>
                            <p>Read FAQs</p>
                            <p>View All Cities</p>
                            <p>Restaurant near me</p>
                            <p>Pricing</p>
                    </div>
                </div>
            </div>
            </div>
            <div className="footer-bottom">
                <p>&copy;{new Date().getFullYear()} All Copyright Reserved | Aifa Faruque</p>
            </div>
        </section>
    );
};

export default Footer;