
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Gamepad, Trophy, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import MemeDisplay from '@/components/MemeDisplay';
import AchievementsPanel from '@/components/AchievementsPanel';
import PowerUpsPanel from '@/components/PowerUpsPanel';
import Leaderboard from '@/components/Leaderboard';
import { achievements, Achievement } from '@/data/achievements';

const Index = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [powerUps, setPowerUps] = useState([
    {
      id: 'skip',
      name: 'Skip Question',
      description: 'Skip current question',
      icon: <Zap className="h-4 w-4" />,
      cost: 20,
      available: 3
    },
    {
      id: 'hint',
      name: 'Hint',
      description: 'Get a helpful hint',
      icon: <Trophy className="h-4 w-4" />,
      cost: 15,
      available: 5
    }
  ]);

  useEffect(() => {
    checkAchievements();
  }, [currentScore, streak, categoryStats]);

  const checkAchievements = () => {
    setUserAchievements(prev => prev.map(achievement => {
      if (achievement.unlocked) return achievement;

      let shouldUnlock = false;
      
      switch (achievement.requirement.type) {
        case 'score':
          shouldUnlock = currentScore >= achievement.requirement.value;
          break;
        case 'streak':
          shouldUnlock = streak >= achievement.requirement.value;
          break;
        case 'category':
          const categoryCount = categoryStats[achievement.requirement.category || ''] || 0;
          shouldUnlock = categoryCount >= achievement.requirement.value;
          break;
      }

      if (shouldUnlock) {
        toast({
          title: "🏆 Achievement Unlocked!",
          description: `${achievement.title}: ${achievement.description}`,
        });
        return { ...achievement, unlocked: true };
      }

      return achievement;
    }));
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentScore(0);
    setStreak(0);
    setCategoryStats({});
    toast({
      title: "Game Started! 🧪",
      description: "Get ready to master organic chemistry!",
    });
  };

  const handleCorrectAnswer = (points: number, category: string) => {
    setCurrentScore(prev => prev + points);
    setStreak(prev => prev + 1);
    setCategoryStats(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));
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

  const handleUsePowerUp = (powerUpId: string) => {
    setPowerUps(prev => prev.map(powerUp => 
      powerUp.id === powerUpId && powerUp.available > 0 && currentScore >= powerUp.cost
        ? { ...powerUp, available: powerUp.available - 1 }
        : powerUp
    ));
    
    if (powerUpId === 'skip') {
      setCurrentScore(prev => Math.max(0, prev - 20));
      toast({
        title: "Question Skipped! ⏭️",
        description: "Moving to next question...",
      });
    } else if (powerUpId === 'hint') {
      setCurrentScore(prev => Math.max(0, prev - 15));
      toast({
        title: "Hint Activated! 💡",
        description: "Check the explanation for guidance!",
      });
    }
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl">
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800">35+ Questions</h3>
                <p className="text-sm text-green-600">Comprehensive question bank</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800">Interactive Learning</h3>
                <p className="text-sm text-blue-600">Engaging gameplay</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800">Achievements</h3>
                <p className="text-sm text-purple-600">Unlock rewards</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-800">Power-Ups</h3>
                <p className="text-sm text-orange-600">Strategic advantages</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              
              <div className="space-y-3">
                <h3 className="font-semibold">New Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 🏆 Achievement system with unlockable rewards</li>
                  <li>• ⚡ Power-ups for strategic gameplay</li>
                  <li>• 📊 Leaderboard competition</li>
                  <li>• 🎯 Category-specific progress tracking</li>
                  <li>• 🧪 Reaction type classification</li>
                  <li>• 😄 Chemistry memes for wrong answers</li>
                </ul>
              </div>
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Score: {currentScore}
            </Badge>
            <Badge variant={streak > 0 ? "default" : "outline"} className="text-lg px-4 py-2">
              Streak: {streak} 🔥
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              🏆 {userAchievements.filter(a => a.unlocked).length}/{userAchievements.length}
            </Badge>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setGameStarted(false)}
          >
            Main Menu
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <GameBoard 
              onCorrectAnswer={handleCorrectAnswer}
              onWrongAnswer={handleWrongAnswer}
              currentStreak={streak}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <ScoreBoard score={currentScore} streak={streak} />
            <AchievementsPanel achievements={userAchievements} />
            <PowerUpsPanel 
              score={currentScore} 
              onUsePowerUp={handleUsePowerUp}
              powerUps={powerUps}
            />
            <Leaderboard currentScore={currentScore} />
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
