import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const modes = [
    {
      title: "2025 2학기 전용 모드",
      description: "2025 구약/신약 객관식 + 빈칸 문제",
      buttons: [
        { name: "구약 객관식", path: "/practice/2025_old_mc" },
        { name: "신약 객관식", path: "/practice/2025_new_mc" },
        { name: "구약 빈칸", path: "/practice/2025_old_sa" },
        { name: "신약 빈칸", path: "/practice/2025_new_sa" },
      ],
    },
    {
      title: "일반 모의고사 모드",
      description: "실제 모의고사 / 구약 모의고사 / 신약 모의고사",
      buttons: [
        { name: "전체 모의고사", path: "/practice/full_exam" },
        { name: "구약 모의고사", path: "/practice/old_exam" },
        { name: "신약 모의고사", path: "/practice/new_exam" },
      ],
    },
    {
      title: "연습하기 모드",
      description: "구약/신약 객관식 + 단답형 랜덤 10문제",
      buttons: [
        { name: "구약 객관식 연습", path: "/practice/old_mc_practice" },
        { name: "구약 단답형 연습", path: "/practice/old_sa_practice" },
        { name: "신약 객관식 연습", path: "/practice/new_mc_practice" },
        { name: "신약 단답형 연습", path: "/practice/new_sa_practice" },
      ],
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">성경 퀴즈 앱 📖</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {modes.map((mode) => (
          <div key={mode.title} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">{mode.title}</h2>
            <p className="text-gray-500 mb-4">{mode.description}</p>
            <div className="flex flex-col gap-2">
              {mode.buttons.map((btn) => (
                <button
                  key={btn.name}
                  onClick={() => navigate(btn.path)}
                  className="bg-[hsl(4,100%,95%)] hover:bg-[hsl(4,100%,70%)] text-black py-2 px-4 rounded"
                >
                  {btn.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
