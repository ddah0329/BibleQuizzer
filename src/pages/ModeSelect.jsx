import { useNavigate, useParams } from "react-router-dom";

export default function ModeSelect() {
  const { type } = useParams();
  const navigate = useNavigate();

  const modes =
    type === "2025"
      ? [
          { name: "2025 구약 객관식", key: "VITE_2025_OLD_MC" },
          { name: "2025 신약 객관식", key: "VITE_2025_NEW_MC" },
          { name: "2025 구약 단답형", key: "VITE_2025_OLD_SA" },
          { name: "2025 신약 단답형", key: "VITE_2025_NEW_SA" },
        ]
      : type === "exam"
      ? [
          { name: "실제 모의고사 (구약+신약)", key: "exam_all" },
          { name: "구약 모의고사", key: "exam_old" },
          { name: "신약 모의고사", key: "exam_new" },
        ]
      : [
          { name: "구약 객관식 연습", key: "practice_old_mc" },
          { name: "구약 단답형 연습", key: "practice_old_sa" },
          { name: "신약 객관식 연습", key: "practice_new_mc" },
          { name: "신약 단답형 연습", key: "practice_new_sa" },
        ];

  const titles = {
    "2025": "📘 2025 2학기 전용 모드",
    "exam": "📖 일반 모의고사 모드",
    "practice": "🧩 연습하기 모드",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-200">
      <h2 className="text-4xl font-bold mb-10">{titles[type]}</h2>
      <div className="grid gap-5 w-full max-w-md">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => navigate(`/quiz/${m.key}`)}
            className="bg-white shadow-md p-5 rounded-xl text-lg font-semibold hover:bg-blue-100 transition"
          >
            {m.name}
          </button>
        ))}
      </div>
    </div>
  );
}
