import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-logo"><span className="mark">C</span>cleanlab</div>
            <p className="footer-blurb">Honest supplements, tested batch by batch. Shipped across India from Indore.</p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul><li>Protein</li><li>Pre-workout</li><li>Creatine</li><li>Vitamins</li></ul>
          </div>
          <div>
            <h4>Help</h4>
            <ul><li>Track order</li><li>Shipping</li><li>Returns</li><li>Contact</li></ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul><li>About</li><li>Lab reports</li><li>Privacy</li><li>Terms</li></ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Cleanlab Nutrition</span>
          <span>Frontend demo — no real orders or payments</span>
        </div>
      </div>
    </footer>
  );
}
