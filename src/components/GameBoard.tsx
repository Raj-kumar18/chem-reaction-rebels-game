import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Timer, CheckCircle, XCircle, Beaker, Zap } from 'lucide-react';
import { questionBank, Question } from '@/data/questionBank';
import { memes } from '@/data/memes';

interface GameBoardProps {
  onCorrectAnswer: (points: number, category: string) => void;
  onWrongAnswer: (meme: string) => void;
  currentStreak: number;
}

const GameBoard: React.FC<GameBoardProps> = ({ onCorrectAnswer, onWrongAnswer, currentStreak }) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  useEffect(() => {
    loadNewQuestion();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleTimeUp();
    }
  }, [timeLeft, showResult]);

  const loadNewQuestion = () => {
    const availableQuestions = questionBank.filter((_, index) => !answeredQuestions.has(index));
    if (availableQuestions.length === 0) {
      setAnsweredQuestions(new Set());
      setCurrentQuestion(questionBank[Math.floor(Math.random() * questionBank.length)]);
    } else {
      const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
      setCurrentQuestion(randomQuestion);
    }
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    setShowResult(true);
    const questionIndex = questionBank.findIndex(q => q.id === currentQuestion.id);
    setAnsweredQuestions(prev => new Set([...prev, questionIndex]));

    if (selectedAnswer === currentQuestion.correctAnswer) {
      const basePoints = currentQuestion.difficulty === 'Easy' ? 10 : 
                        currentQuestion.difficulty === 'Medium' ? 20 : 30;
      const streakBonus = Math.floor(currentStreak / 3) * 5;
      const totalPoints = basePoints + streakBonus;
      
      setTimeout(() => {
        onCorrectAnswer(totalPoints, currentQuestion.topic);
        nextQuestion();
      }, 2000);
    } else {
      const randomMeme = memes[Math.floor(Math.random() * memes.length)];
      setTimeout(() => {
        onWrongAnswer(randomMeme);
        nextQuestion();
      }, 2000);
    }
  };

  const handleTimeUp = () => {
    setShowResult(true);
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setTimeout(() => {
      onWrongAnswer(randomMeme);
      nextQuestion();
    }, 2000);
  };

  const nextQuestion = () => {
    setQuestionNumber(prev => prev + 1);
    loadNewQuestion();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnswerButtonClass = (option: string) => {
    if (!showResult) {
      return selectedAnswer === option 
        ? 'bg-blue-100 border-blue-500 text-blue-700' 
        : 'hover:bg-gray-50';
    }
    
    if (option === currentQuestion?.correctAnswer) {
      return 'bg-green-100 border-green-500 text-green-700';
    }
    
    if (option === selectedAnswer && option !== currentQuestion?.correctAnswer) {
      return 'bg-red-100 border-red-500 text-red-700';
    }
    
    return 'bg-gray-50 text-gray-500';
  };

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Badge variant="outline">Question {questionNumber}</Badge>
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
            <Badge variant="secondary">{currentQuestion.topic}</Badge>
            {currentQuestion.reactionType && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700">
                <Beaker className="h-3 w-3 mr-1" />
                {currentQuestion.reactionType}
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Timer className="h-4 w-4" />
            <span className={`font-mono ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
        <Progress value={(30 - timeLeft) * (100 / 30)} className="w-full" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <CardTitle className="text-lg mb-4">{currentQuestion.question}</CardTitle>
          {currentQuestion.image && (
            <img 
              src={currentQuestion.image} 
              alt="Question diagram" 
              className="max-w-full h-auto rounded-lg mb-4"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className={`p-4 h-auto text-left justify-start ${getAnswerButtonClass(option)}`}
              onClick={() => handleAnswerSelect(option)}
              disabled={showResult}
            >
              <div className="flex items-center space-x-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-sm">{option}</span>
                {showResult && option === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-4 w-4 text-green-600 ml-auto" />
                )}
                {showResult && option === selectedAnswer && option !== currentQuestion.correctAnswer && (
                  <XCircle className="h-4 w-4 text-red-600 ml-auto" />
                )}
              </div>
            </Button>
          ))}
        </div>

        {!showResult && (
          <div className="flex space-x-3">
            <Button 
              onClick={handleSubmit} 
              disabled={!selectedAnswer}
              className="flex-1"
            >
              Submit Answer
            </Button>
          </div>
        )}

        {showResult && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Beaker className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2 text-blue-800">Explanation:</h3>
                  <p className="text-sm text-blue-700">{currentQuestion.explanation}</p>
                  {currentQuestion.reactionType && (
                    <Badge variant="outline" className="mt-2 bg-blue-100 text-blue-800">
                      Reaction Type: {currentQuestion.reactionType}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default GameBoard;
