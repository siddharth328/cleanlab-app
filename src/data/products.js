// Prices are stored in paise (integers) so ₹2,499 = 249900.
// This avoids decimal rounding bugs when discounts are applied.
export const SEED_PRODUCTS = [
  { id: "p1", name: "Whey Protein Isolate", brand: "Cleanlab", cat: "Protein", size: "1 kg", flavour: "Rich Chocolate", price: 299900, sale: 249900, protein: "24g", servings: 33, stock: 48, featured: true, published: true, images: [], tint: "#00a189",
    desc: "Cold-filtered isolate at 90% protein by weight. One ingredient list, no amino spiking, no gums. Mixes clean in water with a shaker." },
  { id: "p2", name: "Pre-Workout Charge", brand: "Cleanlab", cat: "Pre-workout", size: "300 g", flavour: "Blue Raspberry", price: 179900, sale: null, protein: "—", servings: 30, stock: 26, featured: true, published: true, images: [], tint: "#3b6ef0",
    desc: "6g citrulline, 3.2g beta-alanine, 200mg caffeine. Full doses printed on the label so you know exactly what you're taking." },
  { id: "p3", name: "Creatine Monohydrate", brand: "Cleanlab", cat: "Creatine", size: "250 g", flavour: "Unflavoured", price: 99900, sale: 89900, protein: "—", servings: 50, stock: 71, featured: true, published: true, images: [], tint: "#6b7a86",
    desc: "Micronised Creapure monohydrate. 5g per serving, nothing else. The most studied supplement there is, at the dose the studies used." },
  { id: "p4", name: "Mass Gainer 3K", brand: "Cleanlab", cat: "Mass Gainer", size: "3 kg", flavour: "Banana", price: 259900, sale: 219900, protein: "38g", servings: 20, stock: 12, featured: true, published: true, images: [], tint: "#e0a03a",
    desc: "A 1:3 protein to carb ratio using oat flour rather than cheap maltodextrin. For people who struggle to eat enough." },
  { id: "p5", name: "Daily Multivitamin", brand: "Cleanlab", cat: "Vitamins", size: "60 tablets", flavour: "—", price: 74900, sale: null, protein: "—", servings: 60, stock: 90, featured: false, published: true, images: [], tint: "#4caf7d",
    desc: "23 vitamins and minerals at sensible doses, with vitamin D3 at 2000 IU because most people here are low on it." },
  { id: "p6", name: "Whey Protein Concentrate", brand: "Cleanlab", cat: "Protein", size: "2 kg", flavour: "Vanilla", price: 389900, sale: 349900, protein: "22g", servings: 66, stock: 0, featured: false, published: true, images: [], tint: "#d9a86c",
    desc: "The value option. Slightly higher in carbs and fat than isolate, and cheaper per gram of protein." },
  { id: "p7", name: "Omega-3 Fish Oil", brand: "Cleanlab", cat: "Vitamins", size: "90 softgels", flavour: "—", price: 89900, sale: null, protein: "—", servings: 90, stock: 34, featured: false, published: true, images: [], tint: "#f0743a",
    desc: "1000mg fish oil with 330mg EPA and 220mg DHA. Molecularly distilled, tested for heavy metals." },
  { id: "p8", name: "L-Carnitine Liquid", brand: "Cleanlab", cat: "Fat Burner", size: "500 ml", flavour: "Green Apple", price: 129900, sale: 109900, protein: "—", servings: 33, stock: 18, featured: false, published: true, images: [], tint: "#7cc24a",
    desc: "3000mg per serving, stimulant free, so it works alongside your pre-workout instead of stacking caffeine." },
  { id: "p9", name: "BCAA Recovery", brand: "Cleanlab", cat: "Protein", size: "400 g", flavour: "Watermelon", price: 149900, sale: null, protein: "—", servings: 40, stock: 41, featured: false, published: true, images: [], tint: "#e4577a",
    desc: "2:1:1 BCAAs with electrolytes for long sessions in the heat. Useful if you train fasted." },
  { id: "p10", name: "ZMA Night", brand: "Cleanlab", cat: "Vitamins", size: "90 capsules", flavour: "—", price: 69900, sale: 59900, protein: "—", servings: 30, stock: 7, featured: false, published: true, images: [], tint: "#6558c8",
    desc: "Zinc, magnesium and B6 taken before bed. Simple, cheap, and genuinely useful if your diet is short on either mineral." },
  { id: "p11", name: "Clear Whey Refresh", brand: "Cleanlab", cat: "Protein", size: "600 g", flavour: "Mango Passion", price: 199900, sale: null, protein: "20g", servings: 20, stock: 23, featured: false, published: false, images: [], tint: "#f2b705",
    desc: "Light, juice-style protein for people who can't face another milkshake. Not yet published — arriving next week." },
  { id: "p12", name: "Pump Non-Stim", brand: "Cleanlab", cat: "Pre-workout", size: "270 g", flavour: "Lime", price: 169900, sale: 149900, protein: "—", servings: 30, stock: 15, featured: false, published: true, images: [], tint: "#2fb8a6",
    desc: "Caffeine-free pump formula with 8g citrulline and 2g glycerol. For evening sessions when you still want to sleep." }
];
