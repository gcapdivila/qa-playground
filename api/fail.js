export default function handler(req, res) {
  return res.status(500).json({
    error: "Server error. Something went wrong."
  });
}
