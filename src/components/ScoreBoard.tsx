
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Zap } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  streak: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, streak }) => {
  const getStreakMessage = () => {
    if (streak === 0) return "Start your streak!";
    if (streak < 3) return "Building momentum...";
    if (streak < 5) return "Getting hot! 🔥";
    if (streak < 10) return "On fire! 🚀";
    return "Unstoppable! ⚡";
  };

  const getScoreLevel = () => {
    if (score < 50) return { level: "Beginner", color: "bg-gray-100 text-gray-800" };
    if (score < 150) return { level: "Student", color: "bg-blue-100 text-blue-800" };
    if (score < 300) return { level: "Scholar", color: "bg-green-100 text-green-800" };
    if (score < 500) return { level: "Expert", color: "bg-purple-100 text-purple-800" };
    return { level: "Master", color: "bg-yellow-100 text-yellow-800" };
  };

  const scoreLevel = getScoreLevel();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{score}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </div>
          
          <div className="text-center">
            <Badge className={scoreLevel.color}>
              {scoreLevel.level}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Current Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{streak}</div>
            <div className="text-sm text-muted-foreground">Correct Answers</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-medium text-orange-600">
              {getStreakMessage()}
            </div>
          </div>
          
          {streak >= 3 && (
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <div className="text-xs text-orange-700">
                Streak Bonus: +{Math.floor(streak / 3) * 5} points per question!
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div>• Focus on reaction mechanisms</div>
            <div>• Remember GOC rules</div>
            <div>• Practice structure identification</div>
            <div>• Build your streak for bonus points!</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreBoard;
