export default function handler(req, res) {
  res.status(200).json([
    { id: 1, name: "Alice", role: "admin" },
    { id: 2, name: "Bob", role: "user" }
  ]);
}
