import React from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../../context/StoreContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import ProductTub from "../../components/ProductTub/ProductTub.jsx";
import { inr, effectivePrice } from "../../utils/format.js";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="pad">
        <div className="wrap empty">
          <div className="big">🔍</div>
          <b>Product not found</b>
          <p>It may have been unpublished or removed.</p>
          <Link className="btn ghost sm" to="/shop">Back to shop</Link>
        </div>
      </section>
    );
  }

  const out = product.stock <= 0;

  function handleAdd() {
    addToCart(product);
    showToast(`${product.name} added`, "🛒");
  }

  return (
    <section className="pad">
      <div className="wrap">
        <div className="pd">
          <div className="pd-gal"><ProductTub product={product} size={280} /></div>
          <div className="pd-det">
            <span className="brandline mono pd-cat">{product.cat}</span>
            <h2>{product.name}</h2>
            <div className="pd-meta">{product.size}{product.flavour !== "—" ? ` · ${product.flavour}` : ""}</div>
            <div className="pd-price">
              {inr(effectivePrice(product))}
              {product.sale ? <s>{inr(product.price)}</s> : null}
            </div>
            <p className="pd-desc">{product.desc}</p>
            <div className="specs">
              <div><dt>Servings</dt><dd>{product.servings}</dd></div>
              <div><dt>Protein / serving</dt><dd>{product.protein}</dd></div>
              <div><dt>Category</dt><dd>{product.cat}</dd></div>
              <div><dt>In stock</dt><dd>{out ? "Sold out" : `${product.stock} units`}</dd></div>
            </div>
            <button className="btn block" onClick={handleAdd} disabled={out}>
              {out ? "Sold out" : "Add to cart"}
            </button>
            <p className="pd-note">Ships in 48 hours · Free over ₹1,499</p>
          </div>
        </div>
      </div>

      {!out && (
        <div className="mobuy">
          <span className="mobuy-price">{inr(effectivePrice(product))}</span>
          <button className="btn block" onClick={handleAdd}>Add to cart</button>
        </div>
      )}
    </section>
  );
}
