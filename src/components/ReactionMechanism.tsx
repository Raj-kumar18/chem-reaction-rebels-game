
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

interface ReactionStep {
  id: number;
  description: string;
  reactants: string;
  products: string;
  conditions?: string;
  mechanism?: string;
}

interface ReactionMechanismProps {
  reaction: {
    name: string;
    type: string;
    steps: ReactionStep[];
    overall: string;
  };
  onComplete?: () => void;
}

const ReactionMechanism: React.FC<ReactionMechanismProps> = ({ reaction, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMechanism, setShowMechanism] = useState(false);

  const nextStep = () => {
    if (currentStep < reaction.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else if (onComplete) {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetReaction = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setShowMechanism(false);
  };

  const step = reaction.steps[currentStep];

  return (
    <Card className="w-full bg-gradient-to-r from-purple-50 to-blue-50">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Reaction Header */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-purple-800">{reaction.name}</h3>
            <Badge variant="outline" className="mt-2">
              {reaction.type}
            </Badge>
          </div>

          {/* Overall Reaction */}
          <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
            <p className="text-center font-mono text-lg">{reaction.overall}</p>
          </div>

          {/* Step Display */}
          <div className="bg-white p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <Badge variant="secondary">Step {currentStep + 1} of {reaction.steps.length}</Badge>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowMechanism(!showMechanism)}
                >
                  {showMechanism ? 'Hide' : 'Show'} Mechanism
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">{step.description}</p>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Reactants</p>
                  <p className="font-mono">{step.reactants}</p>
                </div>
                <ChevronRight className="h-6 w-6 text-purple-600" />
                <div className="text-center">
                  <p className="text-xs text-gray-500">Products</p>
                  <p className="font-mono">{step.products}</p>
                </div>
              </div>

              {step.conditions && (
                <div className="text-center">
                  <Badge variant="outline" className="bg-yellow-50 text-yellow-800">
                    Conditions: {step.conditions}
                  </Badge>
                </div>
              )}

              {showMechanism && step.mechanism && (
                <div className="bg-blue-50 p-3 rounded border-l-4 border-l-blue-500">
                  <p className="text-sm text-blue-800">{step.mechanism}</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={resetReaction}
              disabled={currentStep === 0}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>

            <Button
              size="sm"
              onClick={nextStep}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {currentStep === reaction.steps.length - 1 ? 'Complete' : 'Next Step'}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / reaction.steps.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReactionMechanism;
