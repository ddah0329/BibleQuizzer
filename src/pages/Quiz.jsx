// src/pages/Quiz.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getShuffledRecords } from '@/api/airtable';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, XCircle, Home } from "lucide-react";
import MultipleChoiceQuestion from '@/components/MultipleChoiceQuestion';
import ShortAnswerQuestion from '@/components/ShortAnswerQuestion';

// 퀴즈 데이터를 로드하고 셔플하는 헬퍼 함수
const loadQuestions = async (tables) => {
  const promises = tables.map(table => 
    getShuffledRecords(table.id, table.count, table.category, table.type)
  );
  
  const results = await Promise.all(promises);
  const allQuestions = results.flat(); // 모든 결과를 하나의 배열로 합침
  
  // 모의고사인 경우 마지막으로 한 번 더 셔플
  if (tables.length > 1) {
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }
  }
  return allQuestions;
};

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizConfig } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]); // { question, answer, isCorrect }
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!quizConfig) {
      setError("퀴즈 설정이 없습니다. 홈으로 돌아가세요.");
      setIsLoading(false);
      return;
    }

    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        const loadedQuestions = await loadQuestions(quizConfig.tables);
        if (loadedQuestions.length === 0) {
          setError("문제를 불러오는 데 실패했습니다.");
        } else {
          setQuestions(loadedQuestions);
        }
      } catch (err) {
        setError("데이터 로딩 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [quizConfig]);

  const handleAnswerSubmit = (answer, isCorrect) => {
    setUserAnswers([
      ...userAnswers,
      {
        question: questions[currentQuestionIndex],
        submittedAnswer: answer,
        isCorrect,
      },
    ]);
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // 퀴즈 종료, 결과 페이지로 이동
      navigate('/results', {
        state: {
          answers: userAnswers,
          questions: questions,
        },
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">퀴즈 문제를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-sm">
          <XCircle className="h-4 w-4" />
          <AlertTitle>오류 발생</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/"><Home className="mr-2 h-4 w-4" /> 홈으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex h-full w-full flex-col p-4 pt-6">
      <header className="mb-4">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>문제 {currentQuestionIndex + 1} / {questions.length}</span>
          <Link to="/">
            <Button variant="ghost" size="sm">
              <Home className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Progress value={progressValue} className="w-full" />
      </header>

      <main className="flex-1">
        {currentQuestion.type === 'mc' ? (
          <MultipleChoiceQuestion
            key={currentQuestion.id} // 키를 변경하여 다음 문제 시 컴포넌트 리셋
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <ShortAnswerQuestion
            key={currentQuestion.id}
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            onNextQuestion={handleNextQuestion}
          />
        )}
      </main>
    </div>
  );
}