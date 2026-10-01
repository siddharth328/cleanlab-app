import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductTub from "../../components/ProductTub/ProductTub.jsx";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/StoreContext.jsx";
import { useReveal } from "../../hooks/useReveal.js";
import { useCountUp } from "../../hooks/useCountUp.js";
import { CATEGORIES } from "../../data/categories.js";
import "./Home.css";

const TRUST_WORDS = [
  "Lab-tested batches", "Free shipping over ₹1,499", "No proprietary blends",
  "FSSAI registered", "48-hour dispatch", "Full label disclosure"
];

export default function Home() {
  const { products } = useStore();
  const navigate = useNavigate();
  const featured = products.filter((p) => p.published && p.featured).slice(0, 4);

  const [catRef, catIn] = useReveal();
  const [featRef, featIn] = useReveal();
  const [whyRef, whyIn] = useReveal();

  const productsCount = useCountUp(products.length, true);
  const ordersCount = useCountUp(12, true, "k+");
  const deliveryHours = useCountUp(48, true, "h");

  return (
    <div>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="pulse" />Every batch lab-tested</span>
            <h1 className="hero-title">Supplements<br /><span className="light">without the</span> guesswork.</h1>
            <p className="lead">Protein, creatine and pre-workout with the full label published. No proprietary blends, no hidden fillers, no marketing maths.</p>
            <div className="hero-actions">
              <Link className="btn" to="/shop">Shop all products</Link>
              <Link className="btn ghost" to="/shop?cat=Protein">Browse protein</Link>
            </div>
            <div className="hero-stats">
              <div><span>{productsCount}</span><small>products tested</small></div>
              <div><span>{ordersCount}</span><small>orders shipped</small></div>
              <div><span>{deliveryHours}</span><small>average delivery</small></div>
            </div>
          </div>
          <div className="hero-art">
            <div className="hero-tub"><ProductTub product={{ tint: "#00a189", images: [] }} size={300} /></div>
            <div className="chip a"><span className="dotg" />24g protein / scoop</div>
            <div className="chip b">🧪 <b>0</b> fillers</div>
            <div className="chip c">⚡ Ships in 48h</div>
          </div>
        </div>
      </section>

      <div className="marquee">
        <div className="marquee-track">
          {[...TRUST_WORDS, ...TRUST_WORDS].map((w, i) => <span key={i}>◆ {w}</span>)}
        </div>
      </div>

      <section className="pad">
        <div className="wrap">
          <div className="sec-head"><div><h2>Shop by goal</h2><p>Pick what you're training for and we'll narrow it down.</p></div></div>
          <div ref={catRef} className={`cats reveal ${catIn ? "in" : ""}`}>
            {CATEGORIES.map((c) => (
              <button key={c.name} className="cat" onClick={() => navigate(`/shop?cat=${encodeURIComponent(c.name)}`)}>
                <span className="emo">{c.emo}</span>
                <b>{c.name}</b>
                <small>{c.note}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pad" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="sec-head">
            <div><h2>Best sellers</h2><p>What people reorder most, month after month.</p></div>
            <Link className="btn ghost sm" to="/shop">View all</Link>
          </div>
          <div ref={featRef} className={`grid reveal ${featIn ? "in" : ""}`}>
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="pad why-section">
        <div className="wrap">
          <div className="sec-head"><div><h2>Why the label matters</h2><p>Three things we do differently, and why they change what you actually absorb.</p></div></div>
          <div ref={whyRef} className={`grid reveal ${whyIn ? "in" : ""}`} style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="panel"><h3>Full disclosure</h3><p className="hint">Every ingredient and its exact dose is printed. If a blend hides quantities, it's usually hiding how little is in it.</p></div>
            <div className="panel"><h3>Third-party tested</h3><p className="hint">Each batch goes to an independent lab. The report number is on the tub and the report itself is on the product page.</p></div>
            <div className="panel"><h3>Nothing decorative</h3><p className="hint">No proprietary "absorption matrix", no pixie-dusted extras at 2mg. Only what has a dose worth taking.</p></div>
          </div>
        </div>
      </section>
    </div>
  );
}
