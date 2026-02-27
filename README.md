📦 Orders & Products App

Test assignment — inventory management application built with React + Redux Toolkit + WebSocket.

The application allows you to manage:

📦 Products

📥 Arrivals (Orders)

🗂 Groups

Includes global state management, routing, filtering, animations and real-time WebSocket counter.

🚀 Tech Stack

React 19

Redux Toolkit

React Redux

React Router DOM

Framer Motion (animations)

WebSocket (ws)

Vite

⚙️ Installation

Clone the repository:

git clone <your-repo-url>
cd orders-products-app

Install dependencies:

npm install

🖥 Run Application

Start frontend (Vite dev server):

npm run dev

App will run at:

http://localhost:5173

🔌 Run WebSocket Server (Active Tabs Counter)

In a separate terminal:

npm run ws

WebSocket server runs at:

ws://localhost:8081

This is used to count active browser tabs in real time.

📂 Project Structure
src/
 ├── components/
 ├── pages/
 ├── store/
 │    ├── productsSlice.js
 │    ├── ordersSlice.js
 │    ├── groupsSlice.js
 │    ├── uiSlice.js
 │    └── selectors.js
 ├── hooks/
 ├── mock/
 └── App.jsx

 
🧠 Implemented Features

✅ Global State (Redux Toolkit)

Products slice

Orders slice

Groups slice

UI slice (search, selected group, active tabs)

✅ Routing

/products

/orders

/groups

✅ Products Page

Search filtering

Filter by Type

Filter by Specification (New / Used)

Delete product with confirmation modal

Add product in Group panel via form modal

✅ Groups Page

Create group

Prevent duplicate group names

Delete group with confirmation modal

Select group → animated right panel

Add product inside group

Filtered dynamically by products

✅ Orders (Arrivals) Page

Create arrival via modal form

Delete arrival

Search filtering

Custom count & total price

✅ Animations

Route transitions (Framer Motion)

Animated Group Details panel

Smooth UI transitions

✅ WebSocket

Real-time active browser tabs counter

Updates automatically when new tab opens/closes

🛠 Build for Production
npm run build

Preview production build:

npm run preview

📌 Notes

All data is stored in Redux store (mock-based).

No backend is used (except WebSocket server for tab counter).

The app demonstrates architecture, state management, component structure and UI interactions.

👨‍💻 Author

Bohdan Lozovskiy
Frontend Developer (React)
