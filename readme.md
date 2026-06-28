# IG Profile Roaster

IG Profile Roaster is a web application that generates humorous roasts based on publicly available Instagram profile information. The project consists of a React frontend and a Node.js/Express backend that extracts profile metadata and generates contextual roasts.

## Contributors

| Role | Contributor |
|------|-------------|
| Frontend | [Rudrakshi Aggarwal](https://github.com/raggarwal25) |
| Backend | [Ayush Singla](https://github.com/ayushs206) |

## Prerequisites

- Node.js 18 or later
- npm

## Installation

Clone the repository:

```bash
git clone https://github.com/ayushs206/ig-profile-roaster.git
cd ig-profile-roaster
````

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run dev
```

Alternatively:

```bash
node index.js
```

## Project Structure

```text
ig-profile-roaster/
├── frontend/          # React + Vite application
├── backend/           # Express API and scraping logic
└── README.md
```

## Demo

Frontend Preview: https://ig-roast.ayushsingla.dev

## Notes

* This project currently does not include:

  * Rate limiting
  * Production-ready CORS configuration
  * Authentication

* The hosted demo may not always work as expected because Render's outbound IP addresses are rate-limited by Instagram.

* For production deployments, it is recommended to use rotating proxies or infrastructure with dedicated outbound IP addresses.

## Disclaimer

This project is intended for educational and entertainment purposes only.

It relies on publicly accessible Instagram profile metadata. Instagram frequently changes its website structure and anti-scraping mechanisms, so the scraper may require updates over time.

## License

This project is licensed under the MIT License.