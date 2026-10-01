import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import ProductTub from "../ProductTub/ProductTub.jsx";
import { inr, effectivePrice } from "../../utils/format.js";
import "./CartDrawer.css";

export default function CartDrawer() {
  const { lines, subtotal, shipping, total, isOpen, closeCart, changeQty, removeFromCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  function goCheckout() {
    closeCart();
    navigate("/checkout");
  }

  return (
    <>
      <div className={`scrim ${isOpen ? "on" : ""}`} onClick={closeCart} />
      <aside className={`cart-drawer ${isOpen ? "on" : ""}`} aria-label="Cart">
        <header>
          <h3>Your cart</h3>
          <button className="icon-btn" onClick={closeCart} aria-label="Close">✕</button>
        </header>

        <div className="cart-items">
          {lines.length === 0 ? (
            <div className="empty">
              <div className="big">🛒</div>
              <b>Your cart is empty</b>
              <p>Add something to get started.</p>
              <button className="btn ghost sm" onClick={() => { closeCart(); navigate("/shop"); }}>Browse products</button>
            </div>
          ) : (
            lines.map((l) => (
              <div className="cart-line" key={l.id}>
                <div className="mini"><ProductTub product={l.product} size={44} /></div>
                <div className="info">
                  <b>{l.product.name}</b>
                  <small>{l.product.size}{l.product.flavour !== "—" ? ` · ${l.product.flavour}` : ""}</small>
                  <div className="qty">
                    <button onClick={() => changeQty(l.id, -1)}>−</button>
                    <span>{l.qty}</span>
                    <button onClick={() => changeQty(l.id, 1)}>+</button>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="row-total">{inr(effectivePrice(l.product) * l.qty)}</div>
                  <button
                    className="mini-act danger"
                    onClick={() => { removeFromCart(l.id); showToast("Removed", "🗑"); }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <footer>
            <div className="sumline"><span>Subtotal</span><span>{inr(subtotal)}</span></div>
            <div className="sumline"><span>Shipping</span><span>{shipping ? inr(shipping) : "Free"}</span></div>
            <div className="sumline total"><span>Total</span><span>{inr(total)}</span></div>
            <button className="btn block" onClick={goCheckout}>Checkout</button>
          </footer>
        )}
      </aside>
    </>
  );
}
