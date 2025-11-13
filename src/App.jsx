// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function App() {
  return (
    // 모바일 우선 레이아웃: 화면을 최대 480px로 제한하고 중앙 정렬
    <div className="flex h-screen w-full justify-center bg-gray-100 dark:bg-gray-900">
      <div className="relative h-full w-full max-w-lg overflow-y-auto bg-white dark:bg-gray-950">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;