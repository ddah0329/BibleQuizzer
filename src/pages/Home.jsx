import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const startMockExam = (mode) => navigate(`/mock/${mode}`);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-8">
      <h1 className="text-3xl font-bold">Bible Quizzzer</h1>

      <button
        onClick={() => navigate("/practice")}
        className="w-full max-w-xs bg-blue-400 text-white rounded-2xl p-4 hover:bg-blue-500 transition"
      >
        연습하기
      </button>

      <div className="w-full max-w-xs bg-green-100 rounded-2xl p-4 space-y-2">
        <h2 className="text-lg font-semibold mb-2 text-center">모의고사 선택</h2>
        {[1, 2, 3, 4].map((m) => (
          <button
            key={m}
            onClick={() => startMockExam(m)}
            className="w-full bg-green-400 text-white rounded-xl p-3 hover:bg-green-500 transition"
          >
            모드 {m}
          </button>
        ))}
      </div>
    </div>
  );
}
