# Crypto Dash

**Live Demo:** https://crypto-dash-inky.vercel.app/

A React app that pulls live crypto market data from CoinGecko. Browse the top coins, filter by name/symbol, sort by market cap/price/24h change, adjust how many results you see, and click into a coin for a full details page with a price-history chart.

## Features
- **Filter** coins by name or ticker (e.g., BTC, ETH)
- **Sort** by market cap, price, or 24h change (asc/desc)
- **Details page** at `/coin/:id` with rich stats & links
- **Price chart** (market history) powered by Chart.js
- Built with **React + Vite**

- **Filter** Track specific coins, display sentiments based on social media data

## Tech Stack
- React, Vite
- react-router-dom (routing)
- react-chartjs-2, Chart.js, chartjs-adapter-date-fns (charts)
- CoinGecko API

## Roadmap
- Social sentiment overlay on coin details
- Pagination
- Allow users to add coins to 'Favorites', for tracking and alerts