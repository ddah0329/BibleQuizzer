// src/pages/Results.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Home, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Results() {
  const location = useLocation();
  const { answers = [], questions = [] } = location.state || {};

  const correctAnswers = answers.filter(a => a.isCorrect);
  const incorrectAnswers = answers.filter(a => !a.isCorrect);
  const score = correctAnswers.length;
  const total = questions.length;

  if (total === 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center p-4">
        <CardDescription>결과 데이터가 없습니다.</CardDescription>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/"><Home className="mr-2 h-4 w-4" /> 홈으로 돌아가기</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 pt-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold">퀴즈 결과</h1>
        <p className="mt-2 text-5xl font-extrabold text-primary">
          {score} <span className="text-2xl font-medium text-muted-foreground">/ {total}</span>
        </p>
        <p className="mt-1 text-lg text-muted-foreground">
          {total}문제 중 {score}개를 맞혔습니다!
        </p>
      </header>

      <div className="mb-6 flex justify-center space-x-4">
        <Button asChild variant="outline">
          <Link to="/"><Home className="mr-2 h-4 w-4" /> 홈으로</Link>
        </Button>
        <Button asChild>
          <Link to="/" replace={true}>
            {/* 참고: "다시 풀기"는 홈으로 가서 다시 선택하게 함 */}
            <RefreshCw className="mr-2 h-4 w-4" /> 다시 풀기
          </Link>
        </Button>
      </div>

      <main>
        <h2 className="mb-4 text-xl font-semibold">틀린 문제 다시보기</h2>
        {incorrectAnswers.length === 0 ? (
          <p className="text-center text-green-600">축하합니다! 모든 문제를 맞혔습니다!</p>
        ) : (
          <div className="space-y-3">
            {incorrectAnswers.map(({ question, submittedAnswer }, index) => (
              <Card key={index} className="bg-red-50 dark:bg-red-900/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-medium leading-snug">
                      {index + 1}. {question.Question}
                    </CardTitle>
                    <Badge variant="secondary">{question.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <p className="text-red-600 dark:text-red-400">
                    <span className="font-semibold">나의 답:</span> {submittedAnswer}
                  </p>
                  <p className="text-green-600 dark:text-green-400">
                    <span className="font-semibold">정답:</span> {question.Answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}