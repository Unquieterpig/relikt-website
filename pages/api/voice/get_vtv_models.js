// https://arpeggi.io/api/kits/v1/voice-models
// Returns a paginated list of voice models.
// Header must contain the Bearer token from .env.local: KITS_SECRET_KEY

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const apiKey = process.env.KITS_SECRET_KEY;
      const apiUrl = `https://arpeggi.io/api/kits/v1/voice-models?perPage=10000`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
