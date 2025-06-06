
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock, Eye, Lightbulb } from 'lucide-react';

interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  cost: number;
  available: number;
}

interface PowerUpsPanelProps {
  score: number;
  onUsePowerUp: (powerUpId: string) => void;
  powerUps: PowerUp[];
}

const PowerUpsPanel: React.FC<PowerUpsPanelProps> = ({ score, onUsePowerUp, powerUps }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Power-Ups
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {powerUps.map((powerUp) => (
          <div key={powerUp.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              {powerUp.icon}
              <div>
                <div className="text-sm font-medium">{powerUp.name}</div>
                <div className="text-xs text-gray-600">{powerUp.description}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                {powerUp.available}
              </Badge>
              <Button
                size="sm"
                variant="outline"
                disabled={score < powerUp.cost || powerUp.available === 0}
                onClick={() => onUsePowerUp(powerUp.id)}
                className="text-xs px-2 py-1"
              >
                {powerUp.cost}pts
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PowerUpsPanel;
