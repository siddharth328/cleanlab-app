import React from "react";
import { Link } from "react-router-dom";
import ProductTub from "../ProductTub/ProductTub.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { inr, effectivePrice } from "../../utils/format.js";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const out = product.stock <= 0;
  const off = product.sale ? Math.round((1 - product.sale / product.price) * 100) : 0;

  function handleAdd(e) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} added`, "🛒");
  }

  return (
    <Link className="product-card" to={`/product/${product.id}`}>
      {out ? (
        <span className="tag out">Out of stock</span>
      ) : off ? (
        <span className="tag">{off}% off</span>
      ) : null}
      <div className="shot"><ProductTub product={product} size={160} /></div>
      <div className="card-body">
        <span className="brandline">{product.brand}</span>
        <h3>{product.name}</h3>
        <span className="spec mono">
          {product.size}
          {product.protein !== "—" ? ` · ${product.protein} protein` : ""}
        </span>
        <div className="price">
          {inr(effectivePrice(product))}
          {product.sale ? <s>{inr(product.price)}</s> : null}
        </div>
      </div>
      <div className="quick">
        <button className="btn sm block" onClick={handleAdd} disabled={out}>
          {out ? "Sold out" : "Add to cart"}
        </button>
      </div>
    </Link>
  );
}
