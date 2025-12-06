export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: "Keyboard", price: 49.99 },
    { id: 2, name: "Mouse", price: 29.99 }
  ]);
}
