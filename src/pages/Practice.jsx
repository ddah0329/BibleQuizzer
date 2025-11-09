import { useEffect, useState } from "react";
import QuestionCard from "../components/QuestionCard";
import { fetchTable } from "../api/airtable";

export default function Practice() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      // 구약 4지선다형 4 + 구약 단답형 1 + 신약 4지선다형 4 + 신약 단답형 1
      const oldMC = await fetchTable(import.meta.env.VITE_OLD_MC);
      const oldSA = await fetchTable(import.meta.env.VITE_OLD_SA);
      const newMC = await fetchTable(import.meta.env.VITE_NEW_MC);
      const newSA = await fetchTable(import.meta.env.VITE_NEW_SA);


      const practiceQuestions = [
        ...oldMC.slice(0, 4),
        ...oldSA.slice(0, 1),
        ...newMC.slice(0, 4),
        ...newSA.slice(0, 1),
      ];

      // 랜덤 섞기
      setQuestions(practiceQuestions.sort(() => Math.random() - 0.5));
    };

    loadQuestions();
  }, []);

  const handleAnswer = (correct) => {
    if (correct) setScore((s) => s + 1);
    setCurrent((c) => c + 1);
  };

  if (!questions.length) return <div>로딩중...</div>;

  if (current >= questions.length)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold mb-4">연습 완료!</h2>
        <p>
          점수: {score} / {questions.length}
        </p>
      </div>
    );

  return <QuestionCard question={questions[current]} onAnswer={handleAnswer} />;
}
