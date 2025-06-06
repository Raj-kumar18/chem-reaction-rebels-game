
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Question } from '@/data/questionBank';

interface AnswerOptionsProps {
  question: Question;
  selectedAnswer: string | null;
  showResult: boolean;
  onAnswerSelect: (answer: string) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ 
  question, 
  selectedAnswer, 
  showResult, 
  onAnswerSelect 
}) => {
  const getAnswerButtonClass = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option 
        ? 'bg-blue-100 border-blue-500 text-blue-700' 
        : 'hover:bg-gray-50';
    }
    
    if (option === question.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }
    
    if (option === selectedAnswer && option !== question.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    
    return 'bg-gray-50 text-gray-500';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {question.options.map((option, index) => (
        <Button
          key={index}
          variant="outline"
          className={`p-4 h-auto text-left justify-start ${getAnswerButtonClass(option)}`}
          onClick={() => onAnswerSelect(option)}
          disabled={showResult}
        >
          <div className="flex items-center space-x-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="text-sm">{option}</span>
            {showResult && option === question.correctAnswer && (
              <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
            )}
            {showResult && option === selectedAnswer && option !== question.correctAnswer && (
              <XCircle className="h-4 w-4 text-red-600 ml-auto" />
            )}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default AnswerOptions;
