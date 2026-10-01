import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";
import { useStore } from "../../context/StoreContext.jsx";
import { effectivePrice } from "../../utils/format.js";
import { CATEGORIES } from "../../data/categories.js";
import "./Shop.css";

export default function Shop() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const activeCat = params.get("cat") || "";
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("pop");

  function setCat(cat) {
    if (cat) setParams({ cat });
    else setParams({});
  }

  const list = useMemo(() => {
    let l = products
      .filter((p) => p.published)
      .filter((p) => !activeCat || p.cat === activeCat)
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.trim().toLowerCase();
        return (p.name + p.brand + p.cat + p.flavour).toLowerCase().includes(q);
      });
    if (sort === "lo") l = [...l].sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "hi") l = [...l].sort((a, b) => effectivePrice(b) - effectivePrice(a));
    return l;
  }, [products, activeCat, query, sort]);

  return (
    <section className="pad">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <h2>All supplements</h2>
            <p>{list.length} product{list.length === 1 ? "" : "s"}{activeCat ? ` in ${activeCat}` : ""}</p>
          </div>
        </div>

        <div className="filters">
          <div className="pills">
            <button className={`pill ${!activeCat ? "on" : ""}`} onClick={() => setCat("")}>All</button>
            {CATEGORIES.map((c) => (
              <button key={c.name} className={`pill ${activeCat === c.name ? "on" : ""}`} onClick={() => setCat(c.name)}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="search">
            <input
              type="search"
              placeholder="Search protein, creatine…"
              aria-label="Search products"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <select className="sel" aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="pop">Most popular</option>
            <option value="lo">Price: low to high</option>
            <option value="hi">Price: high to low</option>
          </select>
        </div>

        {list.length > 0 ? (
          <div className="grid">
            {list.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="empty">
            <div className="big">🔍</div>
            <b>Nothing matches that</b>
            <p>Try a different category or clear the search.</p>
            <button className="btn ghost sm" onClick={() => { setCat(""); setQuery(""); }}>Clear filters</button>
          </div>
        )}
      </div>
    </section>
  );
}
