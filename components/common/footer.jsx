import React from 'react';

import ALink from "./ALink";

function Footer() {
    return (
        <footer className="footer bg-dark footer-topspace">
            <div className="footer-middle">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Contact Info</h4>
                                <ul className="contact-info">
                                    <li>
                                        <span className="contact-info-label">Address:</span>1234 Street Name, City, US
                                    </li>
                                    <li>
                                        <span className="contact-info-label">Phone:</span><ALink href="tel:">(123)
                                            456-7890</ALink>
                                    </li>
                                    <li>
                                        <span className="contact-info-label">Email:</span>
                                        <ALink href="mailto:mail@example.com">mail@example.com</ALink>
                                    </li>
                                    <li>
                                        <span className="contact-info-label">Working Days/Hours:</span>
                                        Mon - Sun / 9:00 AM - 8:00 PM
                                    </li>
                                </ul>
                                <div className="social-icons">
                                    <ALink href="#" className="social-icon social-facebook icon-facebook"
                                        title="Facebook"></ALink>
                                    <ALink href="#" className="social-icon social-twitter icon-twitter"
                                        title="Twitter"></ALink>
                                    <ALink href="#" className="social-icon social-instagram icon-instagram"
                                        title="Instagram"></ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Customer Service</h4>

                                <ul className="links">
                                    <li><ALink href="#">Help & FAQs</ALink></li>
                                    <li><ALink href="#">Order Tracking</ALink></li>
                                    <li><ALink href="#">Shipping & Delivery</ALink></li>
                                    <li><ALink href="#">Orders History</ALink></li>
                                    <li><ALink href="#">Advanced Search</ALink></li>
                                    <li><ALink href="/pages/account">My Account</ALink></li>
                                    <li><ALink href="#">Careers</ALink></li>
                                    <li><ALink href="/pages/about-us">About Us</ALink></li>
                                    <li><ALink href="#">Corporate Sales</ALink></li>
                                    <li><ALink href="#">Privacy</ALink></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="widget">
                                <h4 className="widget-title">Popular Tags</h4>

                                <div className="tagcloud">
                                    <ALink href={{ pathname: "/shop", query: { tag: "clothes" } }} scroll={false}>Clothes</ALink>
                                    <ALink href={{ pathname: "/shop", query: { tag: "fashion" } }} scroll={false}>Fashion</ALink>
                                    <ALink href={{ pathname: "/shop", query: { tag: "hub" } }} scroll={false}>Hub</ALink>
                                    <ALink href={{ pathname: "/shop", query: { tag: "shirt" } }} scroll={false}>Shirt</ALink>
                                    <ALink href={{ pathname: "/shop", query: { tag: "skirt" } }} scroll={false}>Skirt</ALink>
                                    <ALink href={{ pathname: "/shop", query: { tag: "sports" } }} scroll={false}>Sports</ALink>
                                    <ALink href={{ pathname: "/shop", query: { tag: "sweater" } }} scroll={false}>Sweater</ALink>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="widget widget-newsletter">
                                <h4 className="widget-title newsletter-title">Subscribe newsletter</h4>
                                <p>Get all the latest information on Events,<br />Sales and Offers. Sign up for newsletter
                                    today.</p>
                                <form action="#" className="mb-0">
                                    <input type="email" className="form-control m-b-3" placeholder="Email address" required />
                                    <input type="submit" className="btn shadow-none" value="Subscribe" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="footer-bottom">
                    <div className="container d-sm-flex align-items-center">
                        <div className="footer-left">
                            <span className="footer-copyright">© copyright 2021. All Rights Reserved.</span>
                        </div>

                        <div className="footer-right ml-auto mt-1 mt-sm-0">
                            <div className="payment-icons">
                                <span className="payment-icon visa" style={{ backgroundImage: "url(/images/payments/payment-visa.svg)" }}></span>
                                <span className="payment-icon paypal" style={{ backgroundImage: "url(/images/payments/payment-paypal.svg)" }}></span>
                                <span className="payment-icon stripe" style={{ backgroundImage: "url(/images/payments/payment-stripe.png)" }}></span>
                                <span className="payment-icon verisign" style={{ backgroundImage: "url(/images/payments/payment-verisign.svg)" }}></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default React.memo(Footer);