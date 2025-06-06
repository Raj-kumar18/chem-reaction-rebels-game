
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gamepad, Youtube } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import MemeDisplay from '@/components/MemeDisplay';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');

  const startGame = () => {
    setGameStarted(true);
    setCurrentScore(0);
    setStreak(0);
    toast({
      title: "Game Started! 🧪",
      description: "Get ready to master organic chemistry!",
    });
  };

  const handleCorrectAnswer = (points: number) => {
    setCurrentScore(prev => prev + points);
    setStreak(prev => prev + 1);
    toast({
      title: "Correct! 🎉",
      description: `+${points} points! Streak: ${streak + 1}`,
    });
  };

  const handleWrongAnswer = (meme: string) => {
    setStreak(0);
    setCurrentMeme(meme);
    setShowMeme(true);
    toast({
      title: "Oops! 😅",
      description: "Don't worry, learning from mistakes is part of chemistry!",
      variant: "destructive",
    });
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Gamepad className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChemMaster JEE
            </CardTitle>
            <p className="text-lg text-muted-foreground mt-2">
              Master Hydrocarbon Reactions & GOC for JEE
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">500+ Questions</h3>
                <p className="text-sm text-green-600">Comprehensive question bank</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Interactive Learning</h3>
                <p className="text-sm text-blue-600">Engaging gameplay</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800">Fun Memes</h3>
                <p className="text-sm text-purple-600">Learn with humor</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-semibold">Game Features:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Multiple choice questions on hydrocarbon reactions</li>
                <li>• Structure identification challenges</li>
                <li>• Reaction mechanism puzzles</li>
                <li>• GOC concepts and applications</li>
                <li>• Progressive difficulty levels</li>
                <li>• Score tracking and streak bonuses</li>
              </ul>
            </div>

            <Button 
              onClick={startGame} 
              className="w-full text-lg py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Start Learning! 🚀
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Score: {currentScore}
            </Badge>
            <Badge variant={streak > 0 ? "default" : "outline"} className="text-lg px-4 py-2">
              Streak: {streak} 🔥
            </Badge>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setGameStarted(false)}
          >
            Main Menu
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <GameBoard 
              onCorrectAnswer={handleCorrectAnswer}
              onWrongAnswer={handleWrongAnswer}
              currentStreak={streak}
            />
          </div>
          <div className="space-y-6">
            <ScoreBoard score={currentScore} streak={streak} />
          </div>
        </div>

        {showMeme && (
          <MemeDisplay 
            meme={currentMeme}
            onClose={() => setShowMeme(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
