
import React from 'react';
import { Timer } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface QuestionTimerProps {
  timeLeft: number;
  totalTime?: number;
}

const QuestionTimer: React.FC<QuestionTimerProps> = ({ timeLeft, totalTime = 30 }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-end space-x-2">
        <Timer className="h-4 w-4" />
        <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
          {timeLeft}s
        </span>
      </div>
      <Progress value={(totalTime - timeLeft) * (100 / totalTime)} className="w-full" />
    </div>
  );
};

export default QuestionTimer;
