export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { userId } = req.body;
  if (!userId) return res.status(400).send('Missing userId');

  try {
    const response = await fetch(`https://friends.roblox.com/v1/users/${userId}/friends`);
    const data = await response.json();

    if (Array.isArray(data.data) && data.data.length === 0) {
      return res.status(200).json({ result: "kick" });
    } else {
      return res.status(200).json({ result: "ok" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error checking friends");
  }
}
