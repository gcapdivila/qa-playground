export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  // Simulated credentials
  const validUser = username === "admin" && password === "admin";

  if (validUser) {
    return res.status(200).json({ 
      token: "abc123",
      user: {
        username: "admin",
        role: "administrator"
      }
    });
  }

  return res.status(401).json({ error: "Invalid username or password" });
}
