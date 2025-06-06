
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "ChemMaster Pro", score: 2450 },
  { rank: 2, name: "Reaction King", score: 2100 },
  { rank: 3, name: "Alkene Expert", score: 1950 },
  { rank: 4, name: "GOC Guru", score: 1750 },
  { rank: 5, name: "You", score: 0, isCurrentUser: true },
];

interface LeaderboardProps {
  currentScore: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ currentScore }) => {
  const updatedLeaderboard = mockLeaderboard.map(entry => 
    entry.isCurrentUser ? { ...entry, score: currentScore } : entry
  ).sort((a, b) => b.score - a.score);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Crown className="h-5 w-5 mr-2" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {updatedLeaderboard.slice(0, 5).map((entry, index) => (
          <div 
            key={entry.name}
            className={`flex items-center justify-between p-2 rounded-lg ${
              entry.isCurrentUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Badge 
                variant={index === 0 ? "default" : "outline"}
                className={`w-6 h-6 flex items-center justify-center text-xs ${
                  index === 0 ? 'bg-yellow-500' : ''
                }`}
              >
                {index + 1}
              </Badge>
              <span className={`text-sm font-medium ${entry.isCurrentUser ? 'text-blue-800' : ''}`}>
                {entry.name}
              </span>
            </div>
            <span className="text-sm font-bold">{entry.score}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
