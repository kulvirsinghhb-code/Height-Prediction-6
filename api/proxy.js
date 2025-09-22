// api/proxy.js
export default async function handler(req, res) {
  // respond to preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.status(405).send("Only POST allowed");
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxvsbP7meF8lnUU_SzEg9gcwvVyUBBKOm3AQ-uTsg2fDQCuotKiPR8EHTpnwtx5USZygA/exec", {
      method: "POST",
      body: JSON.stringify(req.body)
    });

    const text = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    res.status(200).send(text);
  } catch (err) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).send("Proxy error: " + err.message);
  }
}
