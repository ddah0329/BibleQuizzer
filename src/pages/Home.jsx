// src/pages/Home.jsx
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// 퀴즈 섹션 데이터
const quizSections = [
  {
    title: "구약 객관식",
    description: "랜덤 10문제",
    config: {
      type: "simple",
      tables: [
        { id: import.meta.env.VITE_OLD_MC, count: 10, category: "구약", type: "mc" },
      ],
      totalQuestions: 10,
    },
  },
  {
    title: "구약 단답형",
    description: "랜덤 10문제",
    config: {
      type: "simple",
      tables: [
        { id: import.meta.env.VITE_OLD_SA, count: 10, category: "구약", type: "sa" },
      ],
      totalQuestions: 10,
    },
  },
  {
    title: "신약 객관식",
    description: "랜덤 10문제",
    config: {
      type: "simple",
      tables: [
        { id: import.meta.env.VITE_NEW_MC, count: 10, category: "신약", type: "mc" },
      ],
      totalQuestions: 10,
    },
  },
  {
    title: "신약 단답형",
    description: "랜덤 10문제",
    config: {
      type: "simple",
      tables: [
        { id: import.meta.env.VITE_NEW_SA, count: 10, category: "신약", type: "sa" },
      ],
      totalQuestions: 10,
    },
  },
  {
    title: "모의고사 (90문제)",
    description: "구약 45 (4지선다 40 + 단답 5) + 신약 45 (4지선다 40 + 단답 5)",
    config: {
      type: "mock_exam",
      tables: [
        { id: import.meta.env.VITE_OLD_MC, count: 40, category: "구약", type: "mc" },
        { id: import.meta.env.VITE_NEW_MC, count: 40, category: "신약", type: "mc" },
        { id: import.meta.env.VITE_OLD_SA, count: 5, category: "구약", type: "sa" },
        { id: import.meta.env.VITE_NEW_SA, count: 5, category: "신약", type: "sa" },
      ],
      totalQuestions: 90,
    },
  },
];

export default function Home() {
  const navigate = useNavigate();

  const startQuiz = (config) => {
    // Quiz 페이지로 퀴즈 설정(config)을 state로 전달
    navigate('/quiz', { state: { quizConfig: config } });
  };

  return (
    <div className="flex flex-col p-4 pt-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">BibleQuizzzer</h1>
        <p className="text-muted-foreground">퀴즈를 선택하여 시작하세요.</p>
      </header>
      
      <main className="space-y-4">
        {quizSections.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
              <CardDescription>{section.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={() => startQuiz(section.config)}>
                퀴즈 시작 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}