// pages/api/proxy/[...path].js
export default async function handler(req, res) {
  const { path } = req.query;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

  try {
    const response = await fetch(`${apiUrl}/${path.join("/")}`, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    console.error("API proxy error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
