import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTable } from "../api/airtable";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";

export default function MockExam() {
  const { mode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      const oldMC = await fetchTable("tbl2SzFMFs4ENcTlX");
      const oldSA = await fetchTable("tblGcezZs7P5IsdEv");
      const newMC = await fetchTable("tblZE7dyOBBIZiPoa");
      const newSA = await fetchTable("tbl5Fqx1gT9VLkVA0");

      let selected = [];
      switch (Number(mode)) {
        case 1:
          selected = [
            ...shuffleArray(oldMC).slice(0, 40),
            ...shuffleArray(oldSA).slice(0, 5),
            ...shuffleArray(newMC).slice(0, 40),
            ...shuffleArray(newSA).slice(0, 5),
          ];
          break;
        case 2:
          selected = [
            ...shuffleArray(oldMC).slice(0, 20),
            ...shuffleArray(oldSA).slice(0, 3),
            ...shuffleArray(newMC).slice(0, 20),
            ...shuffleArray(newSA).slice(0, 3),
          ];
          break;
        case 3:
          selected = [...shuffleArray(oldMC).slice(0, 40), ...shuffleArray(oldSA).slice(0, 5)];
          break;
        case 4:
          selected = [...shuffleArray(newMC).slice(0, 40), ...shuffleArray(newSA).slice(0, 5)];
          break;
        default:
          selected = [];
      }
      setQuestions(shuffleArray(selected));
    };

    loadQuestions();
  }, [mode]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect !== null && isCorrect !== undefined) {
      if (isCorrect) setScore((s) => s + 1);
    }
    setCurrentIdx((i) => i + 1);
  };

  if (questions.length === 0) return <p className="text-center mt-20">문제를 불러오는 중...</p>;

  if (currentIdx >= questions.length)
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold mb-4">모의고사 완료!</h2>
        <p className="text-lg">
          점수: {score} / {questions.length}
        </p>
      </div>
    );

  return (
    <div className="p-4">
      <ProgressBar current={currentIdx} total={questions.length} />
      <QuestionCard question={questions[currentIdx]} onAnswer={handleAnswer} />
    </div>
  );
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
