
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Lock } from 'lucide-react';
import { Achievement } from '@/data/achievements';

interface AchievementsPanelProps {
  achievements: Achievement[];
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ achievements }) => {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Trophy className="h-5 w-5 mr-2" />
          Achievements ({unlockedCount}/{achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid gap-2">
          {achievements.slice(0, 4).map((achievement) => (
            <div
              key={achievement.id}
              className={`flex items-center space-x-3 p-2 rounded-lg ${
                achievement.unlocked 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="text-lg">
                {achievement.unlocked ? achievement.icon : <Lock className="h-4 w-4 text-gray-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium ${achievement.unlocked ? 'text-green-800' : 'text-gray-600'}`}>
                  {achievement.title}
                </div>
                <div className={`text-xs ${achievement.unlocked ? 'text-green-600' : 'text-gray-500'}`}>
                  {achievement.description}
                </div>
              </div>
              {achievement.unlocked && (
                <Badge variant="secondary" className="text-xs">
                  ✓
                </Badge>
              )}
            </div>
          ))}
        </div>
        
        {achievements.length > 4 && (
          <div className="text-center">
            <Badge variant="outline" className="text-xs">
              +{achievements.length - 4} more achievements
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AchievementsPanel;
