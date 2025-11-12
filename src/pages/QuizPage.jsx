import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuestions } from "../api/airtable";

export default function QuizPage() {
  const { table } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isShort, setIsShort] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetchQuestions(table, 10);
      const shuffled = data.sort(() => Math.random() - 0.5);
      setQuestions(shuffled);
      if (shuffled[0]) setIsShort(!shuffled[0].option1);
    })();
  }, [table]);

  if (!questions.length)
    return <div className="text-center mt-20 text-xl">⏳ 문제를 불러오는 중...</div>;

  const current = questions[index];

  const handleNext = () => {
    setAnswers((prev) => ({
      ...prev,
      [current.id]: isShort ? inputValue.trim() : selected,
    }));
    setInputValue("");
    setSelected("");

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      navigate("/result", { state: { questions, answers } });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold text-indigo-600 mb-6">
          문제 {index + 1} / {questions.length}
        </h2>
        <p className="text-lg mb-6">{current.question}</p>

        {isShort ? (
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="답을 입력하세요"
            className="w-full border p-3 rounded-lg mb-4"
          />
        ) : (
          <div className="space-y-2">
            {[current.option1, current.option2, current.option3, current.option4]
              .filter(Boolean)
              .map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(opt)}
                  className={`w-full border p-3 rounded-lg text-left ${
                    selected === opt ? "bg-indigo-100 border-indigo-500" : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={isShort ? !inputValue.trim() : !selected}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-300"
        >
          {index + 1 === questions.length ? "결과 보기" : "다음 문제"}
        </button>
      </div>
    </div>
  );
}
