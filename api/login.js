export default function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin") {
      return res.status(200).json({ token: "abc123" });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
