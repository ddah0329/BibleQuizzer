import { CheckCircle, XCircle } from "lucide-react";

export default function AnswerFeedback({ correct, correctAnswer }) {
  return (
    <div className="flex items-center mt-2 space-x-2">
      {correct ? (
        <>
          <CheckCircle className="text-green-500" />
          <span className="text-green-600 font-semibold">정답입니다!</span>
        </>
      ) : (
        <>
          <XCircle className="text-red-500" />
          <span className="text-red-600 font-semibold">
            오답입니다! <br></br>정답: {correctAnswer}
          </span>
        </>
      )}
    </div>
  );
}
