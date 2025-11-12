import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { fetchTable } from "../api/airtable";

export default function Practice() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // 사용자가 선택/입력한 답

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    const loadQuestions = async () => {
      let tableId = "";

      switch (mode) {
        case "2025_old_mc":
          tableId = import.meta.env.VITE_2025_OLD_MC;
          break;
        case "2025_new_mc":
          tableId = import.meta.env.VITE_2025_NEW_MC;
          break;
        case "2025_old_sa":
          tableId = import.meta.env.VITE_2025_OLD_SA;
          break;
        case "2025_new_sa":
          tableId = import.meta.env.VITE_2025_NEW_SA;
          break;
        // 연습 모드나 모의고사 등 추가
        default:
          tableId = import.meta.env.VITE_OLD_MC; // 예시
      }

      const data = await fetchTable(tableId);
      setQuestions(shuffleArray(data));
    };

    loadQuestions();
  }, [mode]);

  const handleNext = (userAnswer) => {
    setAnswers((prev) => [...prev, { ...questions[currentIndex], userAnswer }]);
    setCurrentIndex((prev) => prev + 1);
  };

  if (!questions.length) return <div className="text-center mt-10">문제를 불러오는 중...</div>;

  if (currentIndex >= questions.length) {
    navigate("/result", { state: { answers } });
    return null;
  }

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">문제풀이 모드</h1>
      <p className="mb-6 text-gray-600">{currentIndex + 1}/{questions.length} 문제 풀이</p>
      <div className="w-full max-w-2xl">
        <QuestionCard question={questions[currentIndex]} onNext={handleNext} />
      </div>
    </div>
  );
}
