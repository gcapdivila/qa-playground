export default async function handler(req, res) {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return res.status(200).json({ message: "Slow response completed" });
}
