
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface MemeDisplayProps {
  meme: string;
  onClose: () => void;
}

const MemeDisplay: React.FC<MemeDisplayProps> = ({ meme, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-md w-full">
        <CardContent className="p-6 text-center">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-6xl mb-4">😅</div>
          
          <div className="text-lg font-medium mb-4">
            Oops! Wrong Answer
          </div>
          
          <div className="text-sm text-muted-foreground p-4 bg-gray-50 rounded-lg mb-4">
            {meme}
          </div>
          
          <Button onClick={onClose} className="w-full">
            Try Again! 💪
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemeDisplay;
