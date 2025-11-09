import { useState } from "react";
import { motion } from "framer-motion";
import AnswerFeedback from "./AnswerFeedback";

export default function QuestionCard({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  // 4지선다형인지 확인
  const isMultipleChoice =
    question.Option1 && question.Option2 && question.Option3 && question.Option4;

  // 옵션 배열 생성
  const options = isMultipleChoice
    ? [question.Option1, question.Option2, question.Option3, question.Option4]
    : [];

  const handleAnswer = (answer) => {
    if (answered) return;
    setSelected(answer);
    setAnswered(true);
  };

  const handleNext = () => {
    if (!answered) return;
    const isCorrect = selected === question.Answer;
    onAnswer(isCorrect);
    setSelected(null);
    setAnswered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative bg-white rounded-2xl shadow-lg p-10 max-w-md mx-auto my-6"
    >
      {/* 카테고리 표시 */}
      <div className="absolute top-4 right-4 text-sm text-gray-500 font-semibold">
        {question.Category}
      </div>

      <h2 className="text-lg font-semibold mb-4">{question.Question}</h2>

      {/* 옵션 또는 단답형 input */}
      {isMultipleChoice ? (
        options.map((opt) => (
          <motion.button
            key={opt}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleAnswer(opt)}
            className={`w-full p-3 mb-2 rounded-xl transition text-left ${
              answered
                ? opt === question.Answer
                  ? "bg-green-200"
                  : opt === selected
                  ? "bg-red-200"
                  : "bg-gray-100"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {opt}
          </motion.button>
        ))
      ) : (
        <input
          type="text"
          placeholder="답 입력 후 Enter"
          disabled={answered}
          className="w-full p-3 mb-2 border rounded-xl"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAnswer(e.target.value);
          }}
        />
      )}

      {/* 정답 피드백 + 다음 문제 버튼 */}
      {answered && (
        <>
          <AnswerFeedback
            correct={selected === question.Answer}
            correctAnswer={question.Answer}
          />
          <button
            onClick={handleNext}
            className="mt-4 w-full bg-blue-400 text-white rounded-xl p-3 hover:bg-blue-500 transition"
          >
            다음 문제
          </button>
        </>
      )}
    </motion.div>
  );
}
