
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Beaker } from 'lucide-react';
import { Question } from '@/data/questionBank';

interface QuestionExplanationProps {
  question: Question;
}

const QuestionExplanation: React.FC<QuestionExplanationProps> = ({ question }) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-3">
          <Beaker className="h-5 w-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold mb-2 text-blue-800">Explanation:</h3>
            <p className="text-sm text-blue-700">{question.explanation}</p>
            {question.reactionType && (
              <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800">
                Reaction Type: {question.reactionType}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionExplanation;
