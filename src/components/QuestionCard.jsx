import { useState, useEffect } from "react";

export default function QuestionCard({ question, onNext }) {
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const isMC = question.Option1 !== undefined;

  // 문제 변경 시 상태 초기화
  useEffect(() => {
    setInput("");
    setSelected("");
    setShowAnswer(false);
  }, [question]);

  const handleMCSelect = (option) => {
    setSelected(option);
    setShowAnswer(true);
  };

  const handleSAConfirm = () => {
    if (!input.trim()) return;
    setSelected(input.trim());
    setShowAnswer(true);
  };

  const handleNext = () => {
    onNext(selected);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSAConfirm();
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
        <span className="text-sm text-gray-400">{question.Category}</span>
      <div className="flex justify-between mb-4">
        <p className="font-semibold">{question.Question}</p>
      </div>

      {isMC ? (
        <div className="flex flex-col gap-2">
          {[question.Option1, question.Option2, question.Option3, question.Option4].map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleMCSelect(opt)}
              disabled={showAnswer}
              className={`py-2 px-4 rounded border
                ${selected === opt ? "bg-[#5FA8D3)] text-white" : "bg-[hsl(4,100%,95%)]"}
                hover:bg-[hsl(4,90%,80%)]`}
            >
              {opt}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            disabled={showAnswer}
            className="border rounded p-2 w-full"
          />
          {!showAnswer && (
            <button
              onClick={handleSAConfirm}
              className="bg-[hsl(4,100%,95%)] hover:bg-[hsl(4,100%,70%))] text-black py-2 px-4 rounded"
            >
              답 확인
            </button>
          )}
        </div>
      )}

      {showAnswer && (
        <div className="mt-4 flex flex-col gap-2">
          {selected === question.Answer ? (
            <p className="text-green-600 font-semibold">정답 ✅</p>
          ) : (
            <p className="text-red-600 font-semibold">
              오답 ❌ <br></br>정답: {question.Answer}
            </p>
          )}
          <button
            onClick={handleNext}
            className="mt-2 hover:bg-[hsl(4,100%,87%)] border text-black py-2 px-4 rounded"
          >
            다음 문제
          </button>
        </div>
      )}
    </div>
  );
}
