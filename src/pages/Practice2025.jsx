import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { fetchTable } from "../api/airtable";

export default function Practice2025() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

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
        const oldMC = await fetchTable(import.meta.env.VITE_2025_OLD_MC);
        const oldSA = await fetchTable(import.meta.env.VITE_2025_OLD_SA);
        const newMC = await fetchTable(import.meta.env.VITE_2025_NEW_MC);
        const newSA = await fetchTable(import.meta.env.VITE_2025_NEW_SA);

        // 각 영역에서 필요한 만큼 랜덤 선택
        let selectedQuestions = [
          ...shuffleArray(oldMC).slice(0, 40).map((q) => ({ ...q, category: "2025 구약 객관식" })),
          ...shuffleArray(oldSA).slice(0, 5).map((q) => ({ ...q, category: "2025 구약 단답형" })),
          ...shuffleArray(newMC).slice(0, 40).map((q) => ({ ...q, category: "2025 신약 객관식" })),
          ...shuffleArray(newSA).slice(0, 5).map((q) => ({ ...q, category: "2025 신약 단답형" })),
        ];

        // 전체 문제 섞기
        setQuestions(shuffleArray(selectedQuestions));
      } catch (error) {
        console.error("문제 불러오기 실패:", error);
      }
    };

    loadQuestions();
  }, []);

  const handleNext = () => {
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
      <h1 className="text-2xl font-bold mb-4">2025 총합 모의고사 📝</h1>
      <p className="mb-6 text-gray-600">
        {answeredCount}/{questions.length} 문제 풀이 완료
      </p>
      <div className="w-full max-w-3xl">
        <QuestionCard question={currentQuestion} onNext={handleNext} />
      </div>
    </div>
  );
}
