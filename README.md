## Phase 1: Design and Layout (Complete)

Built the frontend shell of LumiCart using React (Vite) and React Router, with fully custom CSS (no framework), styled around a botanical, clinical skincare aesthetic.

### What's included
- Home page with hero section, shop by concern grid, bestsellers, and brand story section
- Product listing page with live search and category filtering
- Product detail page with ingredients, pricing, and related products
- Responsive navigation bar with mobile hamburger menu
- Basic cart UI (frontend only, no persistence yet)
- Fully responsive layout tested at mobile, tablet, and desktop breakpoints

### Tech used
- React 18 with Vite
- React Router for navigation
- Plain CSS with a custom design token system (colors, type, spacing)
- Mock product data (`src/data/products.js`), to be replaced by the Express API in Phase 2

### Folder structure
lumicart-mern1/
client/          React frontend (Phase 1)
server/          Express and MongoDB backend (Phase 2, not started yet)

## Phase 2: Backend and Database (Complete)

Built the backend API using Express, Node.js, and MongoDB (via Mongoose), with JWT-based authentication and full CRUD support for products, cart, and orders.

### What's included
- MongoDB connection and schema setup for Users, Products, and Orders
- User registration and login with hashed passwords and JWT authentication
- Protected and admin-only routes using custom middleware
- Full product CRUD (create, read, update, delete), with search and category filtering
- Shopping cart endpoints (add, update quantity, remove, clear), stored per user
- Order creation from the cart, order history, and admin order status updates
- Seed script to load the Phase 1 product data directly into MongoDB

### Tech used
- Node.js and Express
- MongoDB Atlas with Mongoose
- JSON Web Tokens (jsonwebtoken) for authentication
- bcryptjs for password hashing
