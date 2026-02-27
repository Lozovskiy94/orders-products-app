import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./App.css";
import useWsActiveTabs from "./hooks/useWsActiveTabs";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  useWsActiveTabs();

  return (
    <Router>
      <div className="app">
        <Header />

        <div className="app-body">
          <Sidebar />

          <main className="content">
            <AnimatedRoutes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
