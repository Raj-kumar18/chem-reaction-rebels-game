
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requirement: {
    type: 'score' | 'streak' | 'questions' | 'category';
    value: number;
    category?: string;
  };
}

export const achievements: Achievement[] = [
  {
    id: 'first_correct',
    title: 'First Steps',
    description: 'Answer your first question correctly',
    icon: '🎯',
    unlocked: false,
    requirement: { type: 'score', value: 10 }
  },
  {
    id: 'streak_5',
    title: 'On Fire!',
    description: 'Get 5 correct answers in a row',
    icon: '🔥',
    unlocked: false,
    requirement: { type: 'streak', value: 5 }
  },
  {
    id: 'streak_10',
    title: 'Unstoppable!',
    description: 'Get 10 correct answers in a row',
    icon: '⚡',
    unlocked: false,
    requirement: { type: 'streak', value: 10 }
  },
  {
    id: 'score_100',
    title: 'Century Maker',
    description: 'Score 100 points',
    icon: '💯',
    unlocked: false,
    requirement: { type: 'score', value: 100 }
  },
  {
    id: 'score_500',
    title: 'Chemistry Master',
    description: 'Score 500 points',
    icon: '👑',
    unlocked: false,
    requirement: { type: 'score', value: 500 }
  },
  {
    id: 'alkene_expert',
    title: 'Alkene Expert',
    description: 'Answer 10 alkene questions correctly',
    icon: '🧪',
    unlocked: false,
    requirement: { type: 'category', value: 10, category: 'Alkene Reactions' }
  },
  {
    id: 'goc_master',
    title: 'GOC Master',
    description: 'Answer 15 GOC questions correctly',
    icon: '⚗️',
    unlocked: false,
    requirement: { type: 'category', value: 15, category: 'GOC - Electronic Effects' }
  }
];
