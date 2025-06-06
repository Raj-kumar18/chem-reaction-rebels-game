
import React from 'react';
import { CardTitle } from '@/components/ui/card';
import { Question } from '@/data/questionBank';

interface QuestionDisplayProps {
  question: Question;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div>
      <CardTitle className="text-lg mb-4">{question.question}</CardTitle>
      {question.image && (
        <img 
          src={question.image} 
          alt="Question diagram" 
          className="max-w-full h-auto rounded-lg mb-4"
        />
      )}
    </div>
  );
};

export default QuestionDisplay;
