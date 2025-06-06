
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
  },
  {
    id: 'blitz',
    name: 'Blitz Bonanza',
    description: 'Ultra-fast 10-second questions! Think fast or lose points!',
    icon: '💨',
    timeLimit: 10,
    questionsCount: 30,
    difficulty: 'Easy',
    specialRules: ['10 seconds per question', 'Rapid fire mode', 'Instant feedback']
  },
  {
    id: 'marathon',
    name: 'Chemistry Marathon',
    description: 'Endurance test with 50 questions across all topics',
    icon: '🏃‍♂️',
    timeLimit: 60,
    questionsCount: 50,
    difficulty: 'Mixed',
    specialRules: ['50 questions total', 'Checkpoint saves', 'Stamina system']
  },
  {
    id: 'puzzle',
    name: 'Molecular Puzzle',
    description: 'Build molecules piece by piece in this strategic challenge',
    icon: '🧩',
    timeLimit: 90,
    questionsCount: 12,
    difficulty: 'Hard',
    specialRules: ['Build molecules', 'Drag & drop interface', 'Bonus for creativity']
  },
  {
    id: 'multiplayer',
    name: 'Chemistry Duel',
    description: 'Challenge friends in real-time chemistry battles!',
    icon: '⚔️',
    timeLimit: 20,
    questionsCount: 15,
    difficulty: 'Mixed',
    specialRules: ['Real-time battles', 'Special attacks', 'Winner takes all']
  },
  {
    id: 'expert',
    name: 'Expert Challenge',
    description: 'Only for chemistry masters! Extremely difficult questions',
    icon: '🎓',
    timeLimit: 120,
    questionsCount: 8,
    difficulty: 'Hard',
    specialRules: ['PhD level questions', 'No hints allowed', 'Massive XP rewards']
  },
  {
    id: 'speed',
    name: 'Speed Demon',
    description: 'Answer correctly AND quickly for maximum points!',
    icon: '🏎️',
    timeLimit: 25,
    questionsCount: 20,
    difficulty: 'Medium',
    specialRules: ['Speed multiplier', 'Faster = more points', 'Precision matters']
  },
  {
    id: 'memory',
    name: 'Memory Lab',
    description: 'Remember molecular structures and recall them later!',
    icon: '🧠',
    timeLimit: 45,
    questionsCount: 16,
    difficulty: 'Medium',
    specialRules: ['Memory phases', 'Visual recall', 'Pattern recognition']
  },
  {
    id: 'fortune',
    name: 'Wheel of Chemistry',
    description: 'Spin the wheel for random challenges and bonus rewards!',
    icon: '🎡',
    timeLimit: 35,
    questionsCount: 18,
    difficulty: 'Mixed',
    specialRules: ['Random bonuses', 'Wheel spins', 'Lucky multipliers']
  },
  {
    id: 'boss',
    name: 'Boss Battle',
    description: 'Face the ultimate chemistry boss! Defeat with perfect answers',
    icon: '👹',
    timeLimit: 40,
    questionsCount: 10,
    difficulty: 'Hard',
    specialRules: ['Boss has health', 'Perfect accuracy needed', 'Epic rewards']
  },
  {
    id: 'zen',
    name: 'Zen Mode',
    description: 'Relaxed gameplay with no timer pressure. Learn at your pace',
    icon: '🧘‍♂️',
    timeLimit: 999,
    questionsCount: 25,
    difficulty: 'Mixed',
    specialRules: ['No time pressure', 'Detailed explanations', 'Learning focused']
  }
];
