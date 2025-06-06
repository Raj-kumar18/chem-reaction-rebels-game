
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, Zap } from 'lucide-react';
import { GameMode } from '@/data/gameModes';

interface GameModeSelectorProps {
  gameModes: GameMode[];
  onSelectMode: (mode: GameMode) => void;
  onBack: () => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({ 
  gameModes, 
  onSelectMode, 
  onBack 
}) => {
  const getIcon = (iconStr: string) => {
    switch (iconStr) {
      case '⚡': return <Zap className="h-6 w-6" />;
      case '🎯': return <Target className="h-6 w-6" />;
      case '⏰': return <Clock className="h-6 w-6" />;
      default: return <span className="text-2xl">{iconStr}</span>;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      case 'Mixed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Challenge
          </h1>
          <p className="text-lg text-gray-600">Select a game mode to start your chemistry adventure!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {gameModes.map((mode) => (
            <Card 
              key={mode.id} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
              onClick={() => onSelectMode(mode)}
            >
              <CardHeader className="text-center pb-3">
                <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform">
                  {getIcon(mode.icon)}
                </div>
                <CardTitle className="text-xl">{mode.name}</CardTitle>
                <p className="text-sm text-gray-600">{mode.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {mode.difficulty && (
                    <Badge className={getDifficultyColor(mode.difficulty)}>
                      {mode.difficulty}
                    </Badge>
                  )}
                  {mode.timeLimit && (
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {mode.timeLimit}s
                    </Badge>
                  )}
                  {mode.questionsCount && mode.questionsCount !== 999 && (
                    <Badge variant="outline">
                      <Target className="h-3 w-3 mr-1" />
                      {mode.questionsCount} questions
                    </Badge>
                  )}
                </div>

                {mode.specialRules && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700">Special Rules:</p>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {mode.specialRules.map((rule, index) => (
                        <li key={index} className="flex items-center">
                          <span className="w-1 h-1 bg-purple-400 rounded-full mr-2" />
                          {rule}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMode(mode);
                  }}
                >
                  Start Challenge!
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" onClick={onBack} size="lg">
            ← Back to Main Menu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
