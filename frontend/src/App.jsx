import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./views/Homepage";
import ProductPage from "./views/ProductPage";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-300"
      data-theme={theme}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
