export function seedOrders() {
  const names = ["Rahul Sharma", "Priya Nair", "Aman Verma", "Sana Qureshi", "Devendra Patil"];
  const cities = ["Indore", "Bhopal", "Pune", "Ujjain", "Nagpur"];
  const totals = [249900, 329800, 89900, 459800, 149900];
  const statuses = ["new", "packed", "shipped", "delivered", "new"];
  return names.map((name, i) => ({
    num: "CL-10" + (42 - i),
    name,
    city: cities[i],
    total: totals[i],
    pay: i % 3 === 0 ? "cod" : "online",
    payStatus: i % 3 === 0 ? "pending" : "paid",
    status: statuses[i],
    date: new Date(Date.now() - i * 86400000 * 1.4).toISOString(),
    items: []
  }));
}
