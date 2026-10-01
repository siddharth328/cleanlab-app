import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase.js";

const StoreContext = createContext(null);

// Database row  ->  shape the components use
function fromDb(row) {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    cat: row.category,
    size: row.size,
    flavour: row.flavour,
    price: row.price,
    sale: row.sale_price,
    protein: row.protein_per_serving,
    servings: row.servings,
    stock: row.stock,
    desc: row.description,
    tint: row.tint,
    images: row.image_urls || [],
    published: row.is_published,
    featured: row.is_featured
  };
}

// Component shape  ->  database row
function toDb(p) {
  return {
    name: p.name,
    brand: p.brand,
    category: p.cat,
    size: p.size,
    flavour: p.flavour,
    price: p.price,
    sale_price: p.sale,
    protein_per_serving: p.protein,
    servings: p.servings,
    stock: p.stock,
    description: p.desc,
    tint: p.tint,
    image_urls: p.images,
    is_published: p.published,
    is_featured: p.featured,
    updated_at: new Date().toISOString()
  };
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [orders, setOrders] = useState([]);

  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load products:", error);
    } else {
      setProducts(data.map(fromDb));
    }
    setLoadingProducts(false);
  }

  function orderFromDb(row) {
    return {
      num: row.order_number,
      date: row.created_at,
      name: row.customer_name,
      city: row.city,
      total: row.total,
      pay: row.payment_method,
      payStatus: row.payment_status,
      status: row.order_status,
      items: row.items
    };
  }

  async function loadOrders() {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Failed to load orders:", error);
    } else {
      setOrders(data.map(orderFromDb));
    }
  }

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  async function addProduct(data) {
    const { error } = await supabase.from("products").insert(toDb(data));
    if (error) throw error;
    await loadProducts();
  }

  async function updateProduct(id, data) {
    const { error } = await supabase
      .from("products")
      .update(toDb(data))
      .eq("id", id);
    if (error) throw error;
    await loadProducts();
  }

  async function deleteProduct(id) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    await loadProducts();
  }

  async function togglePublished(id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const { error } = await supabase
      .from("products")
      .update({ is_published: !product.published })
      .eq("id", id);
    if (error) throw error;
    await loadProducts();
  }

  async function decrementStock(items) {
    for (const item of items) {
      const product = products.find((p) => p.id === item.id);
      if (!product) continue;
      await supabase
        .from("products")
        .update({ stock: Math.max(0, product.stock - item.qty) })
        .eq("id", item.id);
    }
    await loadProducts();
  }

  async function addOrder(order) {
    const { error } = await supabase.from("orders").insert({
      order_number: order.num,
      customer_name: order.name,
      customer_email: order.email,
      customer_phone: order.phone,
      address_line: order.addr,
      city: order.city,
      pincode: order.pin,
      items: order.items,
      total: order.total,
      payment_method: order.pay,
      payment_status: order.payStatus,
      order_status: order.status
    });
    if (error) throw error;
    await loadOrders();
  }

  const value = {
    products,
    loadingProducts,
    orders,
    addProduct,
    updateProduct,
    deleteProduct,
    togglePublished,
    decrementStock,
    addOrder
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  return useContext(StoreContext);
}