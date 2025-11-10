import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { fetchTable } from "../api/airtable";
import { useLocation } from "react-router-dom";

export default function Practice() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const location = useLocation();

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        let allQuestions = [];

        if (location.pathname === "/practice/teukgang") {
          // ✅ 특강모드: 단답형 테이블 모두 가져오기
          const teukgangSA = await fetchTable(import.meta.env.VITE_TeukGang_SA);
          allQuestions = teukgangSA.map((q) => ({ ...q, category: "특강" }));
        } else {
          // ✅ 일반 연습모드: 구약/신약 4지선다 + 단답형
          const oldMC = await fetchTable(import.meta.env.VITE_OLD_MC);
          const newMC = await fetchTable(import.meta.env.VITE_NEW_MC);
          const oldSA = await fetchTable(import.meta.env.VITE_OLD_SA);
          const newSA = await fetchTable(import.meta.env.VITE_NEW_SA);

          allQuestions = [
            ...oldMC.map((q) => ({ ...q, category: "구약" })),
            ...newMC.map((q) => ({ ...q, category: "신약" })),
            ...oldSA.map((q) => ({ ...q, category: "구약" })),
            ...newSA.map((q) => ({ ...q, category: "신약" })),
          ];

          // 10문제만 랜덤 선택
          allQuestions = shuffleArray(allQuestions).slice(0, 10);
        }

        // ✅ 문제 섞기
        setQuestions(shuffleArray(allQuestions));
      } catch (error) {
        console.error("문제 불러오기 실패:", error);
      }
    };

    loadQuestions();
  }, [location.pathname]);

  const handleAnswer = () => {
    setAnsweredCount((prev) => prev + 1);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (questions.length === 0) {
    return <div className="text-center mt-10 text-gray-600">문제를 불러오는 중...</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">
        {location.pathname === "/practice/teukgang" ? "특강문제 연습하기" : "연습하기 모드"} ✏️
      </h1>
      <p className="mb-6 text-gray-600">
        {answeredCount}/{questions.length} 문제 풀이 완료
      </p>

      <div className="w-full max-w-2xl">
        <QuestionCard question={currentQuestion} onAnswer={handleAnswer} />
      </div>
    </div>
  );
}
