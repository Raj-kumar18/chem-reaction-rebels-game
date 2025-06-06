
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gamepad, Trophy, Zap, Calendar, BarChart3, Settings, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import GameBoard from '@/components/GameBoard';
import ScoreBoard from '@/components/ScoreBoard';
import MemeDisplay from '@/components/MemeDisplay';
import AchievementsPanel from '@/components/AchievementsPanel';
import PowerUpsPanel from '@/components/PowerUpsPanel';
import Leaderboard from '@/components/Leaderboard';
import GameModeSelector from '@/components/GameModeSelector';
import StatsPanel from '@/components/StatsPanel';
import DailyChallenge from '@/components/DailyChallenge';
import ReactionMechanism from '@/components/ReactionMechanism';
import { achievements, Achievement } from '@/data/achievements';
import { gameModes, GameMode } from '@/data/gameModes';

const Index = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'modes' | 'game' | 'stats'>('menu');
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showMeme, setShowMeme] = useState(false);
  const [currentMeme, setCurrentMeme] = useState('');
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [totalXP, setTotalXP] = useState(150);
  const [gamesPlayed, setGamesPlayed] = useState(12);
  const [showReaction, setShowReaction] = useState(false);
  
  // Sample reaction data
  const sampleReaction = {
    name: "Friedel-Crafts Acylation",
    type: "Electrophilic Aromatic Substitution",
    overall: "C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl",
    steps: [
      {
        id: 1,
        description: "Formation of acylium ion",
        reactants: "CH₃COCl + AlCl₃",
        products: "CH₃CO⁺ + AlCl₄⁻",
        conditions: "Lewis acid catalyst",
        mechanism: "AlCl₃ coordinates with the carbonyl oxygen, making the carbon more electrophilic"
      },
      {
        id: 2,
        description: "Electrophilic attack on benzene",
        reactants: "C₆H₆ + CH₃CO⁺",
        products: "C₆H₆⁺-COCH₃",
        mechanism: "The acylium ion attacks the benzene ring, forming a sigma complex (arenium ion)"
      },
      {
        id: 3,
        description: "Deprotonation and catalyst regeneration",
        reactants: "C₆H₆⁺-COCH₃ + AlCl₄⁻",
        products: "C₆H₅COCH₃ + HCl + AlCl₃",
        mechanism: "A proton is lost to restore aromaticity, regenerating the AlCl₃ catalyst"
      }
    ]
  };

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
    },
    {
      id: 'time',
      name: 'Extra Time',
      description: '+15 seconds',
      icon: <Clock className="h-4 w-4" />,
      cost: 25,
      available: 2
    }
  ]);

  const dailyChallenge = {
    id: 'daily-001',
    date: new Date().toISOString().split('T')[0],
    theme: "Alkene Reactions Master",
    description: "Focus on addition reactions and stereochemistry of alkenes",
    difficulty: 'Medium' as const,
    rewards: { xp: 100, points: 500, badge: "Daily Master" },
    timeLimit: 25,
    questionsCount: 10,
    completed: false,
    progress: 30
  };

  const userStats = {
    totalGamesPlayed: gamesPlayed,
    totalCorrectAnswers: 85,
    totalQuestions: 120,
    bestStreak: 15,
    averageTime: 22,
    topicsStrength: {
      'Alkene Reactions': 85,
      'GOC - Electronic Effects': 78,
      'Aromatic Reactions': 92,
      'Carbocations': 88,
      'Isomerism': 76
    },
    currentLevel: Math.floor(totalXP / 1000) + 1,
    xpToNextLevel: 1000 - (totalXP % 1000),
    totalXP: totalXP
  };

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

  const startGame = (gameMode: GameMode) => {
    setSelectedGameMode(gameMode);
    setCurrentView('game');
    setCurrentScore(0);
    setStreak(0);
    setCategoryStats({});
    setGamesPlayed(prev => prev + 1);
    toast({
      title: `${gameMode.name} Started! 🧪`,
      description: gameMode.description,
    });
  };

  const handleCorrectAnswer = (points: number, category: string) => {
    const modeMultiplier = selectedGameMode?.id === 'survival' ? 3 : 
                          selectedGameMode?.id === 'timeAttack' ? 2 : 1;
    const finalPoints = points * modeMultiplier;
    
    setCurrentScore(prev => prev + finalPoints);
    setStreak(prev => prev + 1);
    setTotalXP(prev => prev + Math.floor(finalPoints / 10));
    setCategoryStats(prev => ({
      ...prev,
      [category]: (prev[category] || 0) + 1
    }));
    
    toast({
      title: "Correct! 🎉",
      description: `+${finalPoints} points! Streak: ${streak + 1}`,
    });
  };

  const handleWrongAnswer = (meme: string) => {
    if (selectedGameMode?.id === 'survival') {
      // End game immediately in survival mode
      toast({
        title: "Game Over! 💀",
        description: "Survival mode ended. Better luck next time!",
        variant: "destructive",
      });
      setTimeout(() => setCurrentView('menu'), 2000);
    }
    
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
    const powerUp = powerUps.find(p => p.id === powerUpId);
    if (!powerUp || powerUp.available <= 0 || currentScore < powerUp.cost) return;

    setPowerUps(prev => prev.map(pu => 
      pu.id === powerUpId 
        ? { ...pu, available: pu.available - 1 }
        : pu
    ));
    
    setCurrentScore(prev => Math.max(0, prev - powerUp.cost));
    
    toast({
      title: `${powerUp.name} Activated! ⚡`,
      description: powerUp.description,
    });
  };

  // Main Menu
  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-6xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Gamepad className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ChemMaster JEE Pro
            </CardTitle>
            <p className="text-lg text-muted-foreground mt-2">
              Master Hydrocarbon Reactions & GOC for JEE with Advanced Features
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <p className="text-xl font-bold text-blue-800">{userStats.currentLevel}</p>
                <p className="text-sm text-blue-600">Level</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-xl font-bold text-green-800">{gamesPlayed}</p>
                <p className="text-sm text-green-600">Games Played</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-xl font-bold text-purple-800">{userAchievements.filter(a => a.unlocked).length}</p>
                <p className="text-sm text-purple-600">Achievements</p>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <p className="text-xl font-bold text-orange-800">{Math.round((userStats.totalCorrectAnswers / userStats.totalQuestions) * 100)}%</p>
                <p className="text-sm text-orange-600">Accuracy</p>
              </div>
            </div>

            {/* Daily Challenge */}
            <DailyChallenge 
              challenge={dailyChallenge}
              onStart={() => startGame(gameModes[3])}
            />

            {/* Main Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button 
                onClick={() => setCurrentView('modes')} 
                className="h-20 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Gamepad className="h-6 w-6 mr-2" />
                Play Game
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setCurrentView('stats')} 
                className="h-20 text-lg"
              >
                <BarChart3 className="h-6 w-6 mr-2" />
                Statistics
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setShowReaction(true)} 
                className="h-20 text-lg"
              >
                <Zap className="h-6 w-6 mr-2" />
                Learn Reactions
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => toast({ title: "Coming Soon!", description: "Settings panel will be available soon!" })} 
                className="h-20 text-lg"
              >
                <Settings className="h-6 w-6 mr-2" />
                Settings
              </Button>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold">🎮 Game Modes:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Classic Mode - Standard gameplay with mixed questions</li>
                  <li>• Time Attack - Race against the clock for maximum points</li>
                  <li>• Survival Mode - One wrong answer and you're out!</li>
                  <li>• Daily Challenge - Special themed challenges</li>
                  <li>• Reaction Master - Focus on mechanisms and pathways</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">🚀 New Features:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 🧪 Interactive reaction mechanisms</li>
                  <li>• 📊 Detailed progress tracking</li>
                  <li>• ⚡ Enhanced power-up system</li>
                  <li>• 🏆 Advanced achievement system</li>
                  <li>• 📅 Daily challenges with special rewards</li>
                  <li>• 🎯 Topic-specific strength analysis</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reaction Mechanism Modal */}
        {showReaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Interactive Reaction Mechanism</h2>
                <Button variant="outline" onClick={() => setShowReaction(false)}>
                  Close
                </Button>
              </div>
              <ReactionMechanism 
                reaction={sampleReaction}
                onComplete={() => {
                  toast({
                    title: "Mechanism Complete! 🎉",
                    description: "You've successfully learned the Friedel-Crafts Acylation mechanism!",
                  });
                }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Game Mode Selection
  if (currentView === 'modes') {
    return (
      <GameModeSelector 
        gameModes={gameModes}
        onSelectMode={startGame}
        onBack={() => setCurrentView('menu')}
      />
    );
  }

  // Statistics View
  if (currentView === 'stats') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Your Statistics</h1>
            <Button variant="outline" onClick={() => setCurrentView('menu')}>
              ← Back to Menu
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StatsPanel stats={userStats} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <AchievementsPanel achievements={userAchievements} />
              <Leaderboard currentScore={currentScore} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Game View
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {selectedGameMode?.name}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Score: {currentScore}
            </Badge>
            <Badge variant={streak > 0 ? "default" : "outline"} className="text-lg px-4 py-2">
              Streak: {streak} 🔥
            </Badge>
          </div>
          <Button variant="outline" onClick={() => setCurrentView('menu')}>
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
