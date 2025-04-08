
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack } from 'lucide-react';

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [ambience, setAmbience] = useState<'rain' | 'forest' | 'ocean' | 'none'>('none');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeRemaining(duration);
  }, [duration]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(duration);
    }
    setIsPlaying(!isPlaying);
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeRemaining(duration);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDurationChange = (value: number[]) => {
    // Convert minutes to seconds
    const newDuration = value[0] * 60;
    setDuration(newDuration);
    if (!isPlaying) {
      setTimeRemaining(newDuration);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">Meditation Timer</CardTitle>
        <CardDescription>Take time to breathe and be present</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid place-items-center">
          <div className="mb-8 relative">
            <div className="text-5xl font-light mb-4 text-center">{formatTime(timeRemaining)}</div>
            <div className="w-64 mb-6">
              <div className="text-sm text-muted-foreground mb-2">Duration (minutes): {duration / 60}</div>
              <Slider
                defaultValue={[5]}
                min={1}
                max={30}
                step={1}
                onValueChange={handleDurationChange}
                disabled={isPlaying}
              />
            </div>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full" 
              onClick={resetTimer}
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="icon"
              className="h-12 w-12 rounded-full bg-gradient-to-r from-calm-400 to-calm-500 hover:from-calm-500 hover:to-calm-600" 
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
            {(['rain', 'forest', 'ocean'] as const).map((sound) => (
              <Button
                key={sound}
                variant={ambience === sound ? "default" : "outline"} 
                className={ambience === sound ? "bg-calm-400 hover:bg-calm-500" : ""}
                onClick={() => setAmbience(ambience === sound ? 'none' : sound)}
              >
                {sound.charAt(0).toUpperCase() + sound.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Meditation;
