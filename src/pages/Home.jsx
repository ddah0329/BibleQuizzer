import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const modes = [
    {
      id: "practice",
      title: "연습하기 모드",
      description: "구약/신약 랜덤 10문제 (4지선다 + 단답형)",
      route: "/practice",
    },
    {
      id: "teukgang",
      title: "특강문제 연습하기",
      description: "단답형 문제 모두 랜덤으로 연습",
      route: "/practice/teukgang",
    },
    {
      id: 1,
      title: "모의고사 1",
      description: "구약 45 (4지선다 40 + 단답 5) + 신약 45 (4지선다 40 + 단답 5)",
      route: "/mockexam?mode=1",
    },
    {
      id: 2,
      title: "모의고사 2",
      description: "구약 23 (4지선다 20 + 단답 3) + 신약 23 (4지선다 20 + 단답 3)",
      route: "/mockexam?mode=2",
    },
    {
      id: 3,
      title: "모의고사 3",
      description: "구약만 45 (4지선다 40 + 단답 5)",
      route: "/mockexam?mode=3",
    },
    {
      id: 4,
      title: "모의고사 4",
      description: "신약만 45 (4지선다 40 + 단답 5)",
      route: "/mockexam?mode=4",
    },
  ];

  const handleSelectMode = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">
        📖 Bible Quizzzer
      </h1>
      <p className="text-gray-600 mb-10 text-center max-w-md">
        원하는 모드를 선택하여 성경 졸업고사 퀴즈를 시작하세요.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleSelectMode(mode.route)}
            className={`${
              mode.id === "practice" || mode.id === "teukgang"
                ? "bg-blue-100 border-blue-300"
                : "bg-white border-gray-200"
            } shadow-md rounded-2xl p-6 text-left hover:scale-[1.03] transition-all border`}
          >
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {mode.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{mode.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
