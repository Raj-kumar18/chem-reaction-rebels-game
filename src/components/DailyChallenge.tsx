
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Trophy, Star, Clock } from 'lucide-react';

interface DailyChallenge {
  id: string;
  date: string;
  theme: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rewards: {
    xp: number;
    points: number;
    badge?: string;
  };
  timeLimit: number;
  questionsCount: number;
  completed: boolean;
  progress: number;
}

interface DailyChallengeProps {
  challenge: DailyChallenge;
  onStart: () => void;
  onClaim?: () => void;
}

const DailyChallenge: React.FC<DailyChallengeProps> = ({ 
  challenge, 
  onStart, 
  onClaim 
}) => {
  const [timeUntilReset, setTimeUntilReset] = useState('');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeUntilReset(`${hours}h ${minutes}m`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 border-2 border-orange-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center text-orange-800">
              <Calendar className="h-5 w-5 mr-2" />
              Daily Challenge
            </CardTitle>
            <p className="text-sm text-orange-600 mt-1">Resets in {timeUntilReset}</p>
          </div>
          <Badge className={getDifficultyColor(challenge.difficulty)}>
            {challenge.difficulty}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-orange-800">{challenge.theme}</h3>
          <p className="text-sm text-orange-700 mt-1">{challenge.description}</p>
        </div>

        {/* Challenge Details */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-orange-600" />
            <span>{challenge.timeLimit}s per question</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Trophy className="h-4 w-4 text-orange-600" />
            <span>{challenge.questionsCount} questions</span>
          </div>
        </div>

        {/* Rewards */}
        <div className="bg-white p-3 rounded-lg border border-orange-200">
          <p className="text-sm font-medium text-orange-800 mb-2">Rewards:</p>
          <div className="flex space-x-4 text-sm">
            <span className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              {challenge.rewards.xp} XP
            </span>
            <span className="flex items-center">
              <Trophy className="h-4 w-4 text-blue-500 mr-1" />
              {challenge.rewards.points} points
            </span>
            {challenge.rewards.badge && (
              <Badge variant="outline" className="text-xs">
                +{challenge.rewards.badge}
              </Badge>
            )}
          </div>
        </div>

        {/* Progress */}
        {challenge.progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(challenge.progress)}%</span>
            </div>
            <Progress value={challenge.progress} className="h-2" />
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {challenge.completed ? (
            <div className="space-y-2">
              <Badge className="w-full justify-center bg-green-100 text-green-800 py-2">
                ✅ Challenge Completed!
              </Badge>
              {onClaim && (
                <Button 
                  onClick={onClaim}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Claim Rewards
                </Button>
              )}
            </div>
          ) : (
            <Button 
              onClick={onStart}
              className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
            >
              {challenge.progress > 0 ? 'Continue Challenge' : 'Start Challenge'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyChallenge;
