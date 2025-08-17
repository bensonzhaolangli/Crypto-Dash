import { useEffect, useState } from "react";

const BASE = "https://api.coingecko.com/api/v3/coins/markets";
const params = new URLSearchParams({
  vs_currency: "usd",
  order: "market_cap_desc",
  per_page: "10",
  page: "1",
  sparkline: "false",
});

export default function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${BASE}?${params.toString()}&_=${Date.now()}`; // cache-buster
    console.log("GET", url);

    fetch(url, {
      headers: { "x-cg-demo-api-key": import.meta.env.VITE_CG_KEY },
      cache: "no-store",
    })
      .then(async (res) => {
        console.log("Status:", res.status);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`HTTP ${res.status} – ${text}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setCoins(data);
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setError(e.message);
      });
  }, []);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
      {error && <p style={{ color: "crimson" }}>Error: {error}</p>}
      <ul>
        {coins.map((c) => (
          <li key={c.id}>{c.name} ({c.symbol.toUpperCase()}): ${c.current_price}</li>
        ))}
      </ul>
    </div>
  );
}
