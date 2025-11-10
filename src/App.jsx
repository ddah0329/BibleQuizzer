import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import MockExam from "./pages/MockExam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* 연습하기 모드 */}
        <Route path="/practice" element={<Practice />} />

        {/* 특강문제 연습하기 모드 */}
        <Route path="/practice/teukgang" element={<Practice />} />

        {/* 모의고사 모드 */}
        <Route path="/mockexam" element={<MockExam />} />
      </Routes>
    </Router>
  );
}

export default App;
