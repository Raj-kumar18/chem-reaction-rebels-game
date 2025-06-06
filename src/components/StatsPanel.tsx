
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Award, Target, Clock } from 'lucide-react';

interface Stats {
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  bestStreak: number;
  averageTime: number;
  topicsStrength: Record<string, number>;
  currentLevel: number;
  xpToNextLevel: number;
  totalXP: number;
}

interface StatsPanelProps {
  stats: Stats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const accuracy = stats.totalQuestions > 0 
    ? Math.round((stats.totalCorrectAnswers / stats.totalQuestions) * 100) 
    : 0;

  const levelProgress = stats.totalXP > 0 
    ? Math.round(((stats.totalXP % 1000) / 1000) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{stats.totalGamesPlayed}</p>
              <p className="text-sm text-blue-700">Games Played</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-sm text-green-700">Accuracy</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Level {stats.currentLevel}</span>
              <span className="text-sm text-gray-600">{stats.xpToNextLevel} XP to next level</span>
            </div>
            <Progress value={levelProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Achievement Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Award className="h-5 w-5 mr-2" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-yellow-50 rounded">
              <p className="text-xl font-bold text-yellow-600">{stats.bestStreak}</p>
              <p className="text-xs text-yellow-700">Best Streak</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded">
              <p className="text-xl font-bold text-purple-600">{stats.averageTime}s</p>
              <p className="text-xs text-purple-700">Avg. Time</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Strength */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Topic Strength
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {Object.entries(stats.topicsStrength).slice(0, 5).map(([topic, strength]) => (
            <div key={topic} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="truncate">{topic}</span>
                <span className="font-medium">{strength}%</span>
              </div>
              <Progress value={strength} className="h-1" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPanel;
