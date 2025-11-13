// src/components/MultipleChoiceQuestion.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function MultipleChoiceQuestion({ question, onAnswerSubmit, onNextQuestion }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false); // <-- 이 상태가 즉시 피드백을 제어합니다.

  const options = [question.Option1, question.Option2, question.Option3, question.Option4].filter(Boolean);
  const correctAnswer = question.Answer;

  const handleOptionClick = (option) => {
    if (isAnswered) return; // 이미 답변했으면 클릭 방지

    setSelectedOption(option);
    setIsAnswered(true); // <-- 상태를 '답변 완료'로 변경 (UI 즉시 업데이트)
    const isCorrect = option === correctAnswer;
    onAnswerSubmit(option, isCorrect); // 부모(Quiz.jsx)에 채점 결과 전송
  };

  // isAnswered 상태에 따라 버튼 색상을 즉시 결정합니다.
  const getButtonVariant = (option) => {
    if (!isAnswered) return "outline";
    if (option === correctAnswer) return "default"; // 정답 (초록색 계열 - 기본값)
    if (option === selectedOption && option !== correctAnswer) return "destructive"; // 선택한 오답 (빨간색)
    return "outline"; // 선택 안 한 오답
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
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-col space-y-3">
          {options.map((option, index) => (
            <Button
              key={index}
              variant={getButtonVariant(option)}
              className="h-auto min-h-[40px] justify-start whitespace-normal text-left"
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered} // 답변 완료 시 비활성화
            >
              {index + 1}. {option}
            </Button>
          ))}
        </div>

        {/* 답변 완료(isAnswered) 상태일 때만 '다음 문제' 버튼이 보입니다. */}
        {isAnswered && (
          <div className="mt-4">
            <Button className="w-full" onClick={onNextQuestion}>
              다음 문제
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}