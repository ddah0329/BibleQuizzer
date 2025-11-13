// src/components/ShortAnswerQuestion.jsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function ShortAnswerQuestion({ question, onAnswerSubmit, onNextQuestion }) {
  const [inputValue, setInputValue] = useState("");
  const [isAnswered, setIsAnswered] = useState(false); // <-- 이 상태가 즉시 피드백을 제어합니다.
  const [isCorrect, setIsCorrect] = useState(false);

  // 다음 문제로 넘어갈 때(question.id가 바뀔 때) 상태 초기화
  useEffect(() => {
    setInputValue("");
    setIsAnswered(false);
    setIsCorrect(false);
  }, [question.id]);

  const correctAnswer = question.Answer;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAnswered || !inputValue.trim()) return;

    const submitted = inputValue.trim();
    const correct = submitted === correctAnswer;

    setIsAnswered(true); // <-- 상태를 '답변 완료'로 변경
    setIsCorrect(correct); // <-- 정답 여부 상태 설정
    onAnswerSubmit(submitted, correct); // 부모(Quiz.jsx)에 채점 결과 전송
  };

  return (
    <Card className="relative">
      <Badge 
        variant="secondary" 
        className="absolute right-3 top-3"
      >
        {question.category}
      </Badge>
      <CardHeader>
        <CardTitle className="text-lg font-medium leading-relaxed pt-4">
          {question.Question}
        </CardTitle>
        {question.Description && (
           <CardDescription>{question.Description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="정답을 입력하세요"
              disabled={isAnswered} // 답변 완료 시 비활성화
              className={isAnswered ? (isCorrect ? 'border-green-500 focus-visible:ring-green-500' : 'border-red-500 focus-visible:ring-red-500') : ''}
            />
            <Button type="submit" disabled={isAnswered}>
              입력
            </Button>
          </div>
        </form>

        {/* 답변 완료(isAnswered) 상태일 때만 피드백 Alert와 '다음 문제' 버튼이 보입니다. */}
        {isAnswered && (
          <div className="mt-4 space-y-3">
            <Alert variant={isCorrect ? 'default' : 'destructive'}>
              <AlertTitle>{isCorrect ? "정답입니다!" : "오답입니다."}</AlertTitle>
              {!isCorrect && (
                <AlertDescription>
                  정답: {correctAnswer}
                </AlertDescription>
              )}
            </Alert>
            <Button className="w-full" onClick={onNextQuestion}>
              다음 문제
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}