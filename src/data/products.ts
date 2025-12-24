const products = Array.from({ length: 20 }).map((_, i) => ({
  id: (i + 1).toString(),
  name: `Product ${i + 1}`,
  price: (Math.random() * 100 + 1).toFixed(2),
  image: `https://plus.unsplash.com/premium_photo-1766340004237-2f136e502218?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
}));

export default products;
