import React, { useState } from "react";
import { useStore } from "../../../context/StoreContext.jsx";
import { useToast } from "../../../context/ToastContext.jsx";
import ProductTub from "../../../components/ProductTub/ProductTub.jsx";
import { inr, effectivePrice } from "../../../utils/format.js";
import ProductEditorModal from "./ProductEditorModal.jsx";

export default function ProductsTab() {
  const { products, togglePublished, deleteProduct } = useStore();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(null); // null = closed, {} = new, product = edit
  const liveCount = products.filter((p) => p.published).length;

  function handleToggle(p) {
    togglePublished(p.id);
    showToast(p.published ? "Hidden from store" : "Product is live", p.published ? "🙈" : "👁");
  }
  function handleDelete(p) {
    if (window.confirm(`Delete "${p.name}"? This can't be undone.`)) {
      deleteProduct(p.id);
      showToast("Product deleted", "🗑");
    }
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
        <div>
          <h2>Products</h2>
          <p className="sub">{products.length} products · {liveCount} live</p>
        </div>
        <button className="btn sm" onClick={() => setEditing({})}>+ Add product</button>
      </div>

      <div className="panel" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ overflow: "auto" }}>
          <table className="tbl">
            <thead>
              <tr>
                <th>Product</th><th className="hide-sm">Category</th><th>Price</th><th>Stock</th><th>Live</th><th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="tprod">
                      <div className="mini"><ProductTub product={p} size={36} /></div>
                      <div><b>{p.name}</b><small>{p.size}</small></div>
                    </div>
                  </td>
                  <td className="hide-sm">{p.cat}</td>
                  <td>
                    <b>{inr(effectivePrice(p))}</b>
                    {p.sale && <><br /><small style={{ color: "var(--ink-3)", textDecoration: "line-through" }}>{inr(p.price)}</small></>}
                  </td>
                  <td><span className={`chipst ${p.stock <= 0 ? "bad" : p.stock < 15 ? "warn" : "ok"}`}>{p.stock}</span></td>
                  <td><button className={`switch ${p.published ? "on" : ""}`} onClick={() => handleToggle(p)} aria-label="Published" /></td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    <button className="mini-act" onClick={() => setEditing(p)}>Edit</button>{" "}
                    <button className="mini-act danger" onClick={() => handleDelete(p)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editing !== null && (
        <ProductEditorModal product={editing.id ? editing : null} onClose={() => setEditing(null)} />
      )}
    </div>
  );
}
