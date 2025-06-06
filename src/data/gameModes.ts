
export interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  timeLimit?: number;
  questionsCount?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  specialRules?: string[];
}

export const gameModes: GameMode[] = [
  {
    id: 'classic',
    name: 'Classic Mode',
    description: 'Standard gameplay with mixed difficulty questions',
    icon: '🧪',
    timeLimit: 30,
    questionsCount: 20,
    difficulty: 'Mixed',
    specialRules: ['Streak bonuses', 'Power-ups available']
  },
  {
    id: 'timeAttack',
    name: 'Time Attack',
    description: 'Race against time! Answer as many as you can in 5 minutes',
    icon: '⚡',
    timeLimit: 15,
    questionsCount: 999,
    difficulty: 'Mixed',
    specialRules: ['5 minute total limit', 'Double points', 'No power-ups']
  },
  {
    id: 'survival',
    name: 'Survival Mode',
    description: 'One wrong answer and you\'re out! How far can you go?',
    icon: '💀',
    timeLimit: 45,
    questionsCount: 999,
    difficulty: 'Mixed',
    specialRules: ['One life only', 'Triple points', 'Extra time per correct answer']
  },
  {
    id: 'daily',
    name: 'Daily Challenge',
    description: 'Special themed challenge that changes daily',
    icon: '📅',
    timeLimit: 25,
    questionsCount: 10,
    difficulty: 'Hard',
    specialRules: ['Themed questions', 'Bonus rewards', 'Global leaderboard']
  },
  {
    id: 'reaction',
    name: 'Reaction Master',
    description: 'Focus on reaction mechanisms and pathways',
    icon: '🔄',
    timeLimit: 40,
    questionsCount: 15,
    difficulty: 'Medium',
    specialRules: ['Visual mechanisms', 'Step-by-step hints', 'Reaction drawing']
  }
];
