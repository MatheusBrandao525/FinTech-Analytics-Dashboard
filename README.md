# FinTech Analytics Dashboard

A high-performance, institutional-grade analytics dashboard for financial data visualization.
This project demonstrates advanced frontend performance optimization, complex data visualization, and serverless architecture concepts.

![Project Status](https://img.shields.io/badge/status-portfolio--ready-success)

## 🚀 Project Overview

The **FinTech Analytics Dashboard** is designed to replicate the look, feel, and performance of a real-world trading platform. It focuses on:
- **Visual Excellence:** Premium "Dark Mode" aesthetic with strict attention to typography, spacing, and color harmony.
- **High Performance:** Efficient rendering of large datasets (1000+ rows) and smooth 60fps animations.
- **Complex Visualization:** Custom D3.js candlestick charts and interactive Chart.js widgets.
- **Architecture:** Clean modular Vue 3 architecture simulating a modern serverless stack.

**Note:** This is a frontend-focused portfolio project. Backend data and authentication are simulated (mocked) to demonstrate the frontend capabilities without requiring infrastructure deployment.

---

## 🛠️ Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom FinTech Theme)
- **Visualization:**
  - [D3.js](https://d3js.org/) (Custom Candlestick Charts with Zoom/Pan)
  - [Chart.js](https://www.chartjs.org/) (Responsive Widgets)
- **Performance:** [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller) for large lists.
- **Routing:** Vue Router with Auth Guards.
- **Build Tool:** Vite.

---

## ✨ Key Features

1.  **Institutional UI/UX:**
    - Professional dark theme customized for financial data readability.
    - Micro-interactions and smooth layout transitions.
    
2.  **Real-time Dashboard:**
    - Live-updating KPI cards (Portfolio Value, P&L, Risk).
    - Interactive market trend summaries.

3.  **Advanced Market Analytics:**
    - **D3.js** powered Candlestick Chart.
    - Custom tooltips and responsive scaling.

4.  **High-Performance Portfolio Grid:**
    - Handles **5,000+ simulated asset rows** effortlessly using virtual scrolling.
    - Instant search and filtering.

5.  **Serverless Simulation:**
    - "Reports" section simulates AWS Lambda calls with realistic latency states.
    - Mock Authentication service with JWT handling concepts.

---

## ⚙️ Architecture & Simulation

### Serverless Concept
Although runs client-side, the application is structured to interact with serverless endpoints.
- **AuthService:** Simulates JWT token exchange.
- **ReportService:** Simulates async AWS Lambda execution for heavy compute tasks.
- **Data Layers:** Mocked responses representing DynamoDB queries.

### Directory Structure
```
src/
├── assets/         # Static assets
├── components/     # Reusable UI components
│   └── charts/     # D3 and Chart.js wrappers
├── layouts/        # Application layouts (Sidebar, etc.)
├── router/         # Navigation and Guard logic
├── services/       # Mock services (Auth, API simulation)
├── views/          # Page definitions
└── style.css       # Global Tailwind directives
```

---

## 📦 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/fintech-dashboard.git
    cd fintech-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Navigate to `http://localhost:5173`.
    *Login using any email/password pair (demo mode).*

---

## 📷 Screenshots

*(Add screenshots here after running the project)*

---

This project was built to showcase **Frontend Engineering Excellence**.
