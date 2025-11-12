import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.answers) return null;

  const { answers } = state;
  const score = answers.filter((a) => a.userAnswer === a.Answer).length;

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">퀴즈 결과</h1>
      <p className="mb-4 text-lg">점수: {score} / {answers.length}</p>
      <div className="mb-6">
        {answers.map((a, idx) => (
          <div key={idx} className="border-b py-2">
            <p><strong>{idx + 1}. {a.Question}</strong></p>
            <p>내 답: {a.userAnswer}</p>
            {a.userAnswer !== a.Answer && <p>정답: {a.Answer}</p>}
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        홈으로
      </button>
    </div>
  );
}
