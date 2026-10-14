# Savory 🍔 | Crave It. Tap It. Taste It.

A modern, responsive food ordering web application built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

![Savory Preview](https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features

- **Appetizing Landing Page**: Hero section with dark vignette overlay, animated *"Hot & fresh in 30 min"* live badge, 4-dish *"Fan Favorites"* grid, 3-step *"How It Works"*, and trust highlights.
- **Interactive Menu**: Category filtering (*Burgers, Crispy Sides, Drinks & Shakes, Desserts*), real-time search, and dietary badges (*Popular, Spicy, Vegetarian*).
- **Customizable Dish Modal**: Select portion sizes, choose add-on extras (bacon, extra cheese, sauces), select quantity, and add special kitchen instructions.
- **Sliding Cart Drawer**: Smooth Framer Motion drawer with live item counters, quantity adjustments, and subtotal/delivery breakdowns.
- **Working Coupon Engine**:
  - `FREEDEL` – Waives the $3.99 delivery fee and shows the green *"Free Delivery Applied"* badge.
  - `SAVE10` – Applies 10% off the subtotal and shows the green *"10% Off Applied"* badge.
  - Real-time code validation and error handling.
- **Seamless Checkout**: Delivery / Pickup toggle (dynamically hides/shows address inputs), mock credit card input with instant validation, and live summary breakdown.
- **Animated Confirmation**: Confetti celebration, animated green checkmark, generated `#SV-XXXX` order ID, time estimates (35m delivery / 15m pickup), and full order recap.
- **Mobile Responsive & Accessible**: Sticky floating order button on scroll, responsive hamburger navigation, and polished touch interactions.

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) + [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **State Management**: React Context (`CartContext`) with `localStorage` persistence

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/IncreasonJr/MINA.git

# Navigate into the project directory
cd MINA

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The production assets will be generated in the `dist/` directory.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
