import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import Result from "./pages/Result";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice/:mode" element={<Practice />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}