
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { questionBank, Question } from '@/data/questionBank';
import { memes } from '@/data/memes';
import QuestionTimer from './QuestionTimer';
import QuestionHeader from './QuestionHeader';
import QuestionDisplay from './QuestionDisplay';
import AnswerOptions from './AnswerOptions';
import QuestionExplanation from './QuestionExplanation';

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

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <QuestionHeader question={currentQuestion} questionNumber={questionNumber} />
        <QuestionTimer timeLeft={timeLeft} />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <QuestionDisplay question={currentQuestion} />

        <AnswerOptions 
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          showResult={showResult}
          onAnswerSelect={handleAnswerSelect}
        />

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
          <QuestionExplanation question={currentQuestion} />
        )}
      </CardContent>
    </Card>
  );
};

export default GameBoard;
