# 🎁 Reward Points Dashboard

A React-based Reward Points Dashboard that calculates customer reward points based on purchase transactions and displays transaction details, monthly reward summaries, total reward summaries, and dashboard statistics.

## Implementation

- Developed using **React 19**, **Vite**, and **Material UI (MUI)** for a modern, responsive user interface.
- Simulated a backend using **JSON Server** to asynchronously fetch transaction data through a dedicated API layer built with **Axios**.
- Implemented a reusable **custom hook (`useTransactions`)** to encapsulate API calls, loading state, error handling, and data refetching.
- Built another custom hook **(`useRewardDashboard`)** to separate business logic from presentation by computing reward points, dashboard statistics, monthly summaries, and total rewards.
- Created reusable utility functions to calculate reward points, generate monthly and total reward summaries, and compute dashboard metrics.
- Displayed transaction data using **Material UI DataGrid** with pagination, responsive layouts, custom styling, formatted dates, currency formatting, and reward point highlighting.
- Designed reusable dashboard components including summary cards, transaction table, monthly rewards table, and total rewards table.
- Implemented proper UI states including **Loading**, **Error**, and **Empty State** components for improved user experience.
- Followed a modular folder structure by separating components, hooks, utilities, API services, constants, styles, and tests for better maintainability.
- Added comprehensive **unit and integration tests** using **Vitest** and **React Testing Library** covering utility functions, API layer, custom hooks, reusable components, and the Dashboard page.

## Reward Calculation

- **2 points** are awarded for every dollar spent over **$100**.
- **1 point** is awarded for every dollar spent between **$50 and $100**.
- Purchases of **$50 or less** do not earn reward points.

Example:

```
Purchase Amount: $120

Reward Points:
50 × 1 = 50
20 × 2 = 40

Total = 90 Points
```

## Tech Stack

- React 19
- JavaScript (ES6+)
- Vite
- Material UI
- Axios
- JSON Server
- Vitest
- React Testing Library

## Run the Project

```bash
npm install
npm run start
```

This starts:

- JSON Server → http://localhost:3001
- React App → http://localhost:5173

## Run Tests

```bash
npm run test
```