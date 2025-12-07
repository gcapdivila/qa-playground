export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;

  const USERS = {
    admin: { password: "admin", role: "admin" },
    editor: { password: "editor", role: "editor" },
    user: { password: "user", role: "user" }
  };

  if (!USERS[username] || USERS[username].password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.status(200).json({
    token: "fake-jwt-token-" + USERS[username].role,
    role: USERS[username].role,
    user: username
  });
}
