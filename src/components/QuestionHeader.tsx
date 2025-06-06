
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Beaker } from 'lucide-react';
import { Question } from '@/data/questionBank';

interface QuestionHeaderProps {
  question: Question;
  questionNumber: number;
}

const QuestionHeader: React.FC<QuestionHeaderProps> = ({ question, questionNumber }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <Badge variant="outline">Question {questionNumber}</Badge>
        <Badge className={getDifficultyColor(question.difficulty)}>
          {question.difficulty}
        </Badge>
        <Badge variant="secondary">{question.topic}</Badge>
        {question.reactionType && (
          <Badge variant="outline" className="bg-purple-50 text-purple-700">
            <Beaker className="h-3 w-3 mr-1" />
            {question.reactionType}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default QuestionHeader;
