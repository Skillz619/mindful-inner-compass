
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipBack } from 'lucide-react';

type BreathingPattern = {
  name: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
  description: string;
};

const breathingPatterns: BreathingPattern[] = [
  {
    name: "4-7-8 Technique",
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    description: "Helps reduce anxiety and helps with sleep"
  },
  {
    name: "Box Breathing",
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    description: "Reduces stress and improves focus"
  },
  {
    name: "Relaxing Breath",
    inhale: 6,
    hold1: 0,
    exhale: 8,
    hold2: 0,
    description: "For deep relaxation and calm"
  }
];

const Breathing = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [phase, setPhase] = useState<'inhale' | 'hold1' | 'exhale' | 'hold2'>('inhale');
  const [counter, setCounter] = useState(selectedPattern.inhale);
  const [cycles, setCycles] = useState(0);
  
  const animationRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setCounter((prev) => {
          if (prev > 1) return prev - 1;
          
          // Phase transition
          switch (phase) {
            case 'inhale':
              setPhase('hold1');
              return selectedPattern.hold1 || 1;
            case 'hold1':
              setPhase('exhale');
              return selectedPattern.exhale;
            case 'exhale':
              setPhase('hold2');
              return selectedPattern.hold2 || 1;
            case 'hold2':
              setPhase('inhale');
              setCycles(c => c + 1);
              return selectedPattern.inhale;
          }
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, selectedPattern]);
  
  useEffect(() => {
    // Reset when pattern changes
    setPhase('inhale');
    setCounter(selectedPattern.inhale);
    
    if (animationRef.current) {
      animationRef.current.classList.remove('animate-breathe-in');
      void animationRef.current.offsetWidth; // Trigger reflow
      if (isActive) {
        animationRef.current.classList.add('animate-breathe-in');
      }
    }
  }, [selectedPattern, isActive]);
  
  const toggleBreathing = () => {
    setIsActive(!isActive);
    
    if (!isActive && animationRef.current) {
      animationRef.current.classList.add('animate-breathe-in');
    } else if (animationRef.current) {
      animationRef.current.classList.remove('animate-breathe-in');
    }
  };
  
  const resetBreathing = () => {
    setIsActive(false);
    setPhase('inhale');
    setCounter(selectedPattern.inhale);
    setCycles(0);
    
    if (animationRef.current) {
      animationRef.current.classList.remove('animate-breathe-in');
    }
  };
  
  const getPhaseInstruction = (): string => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in...';
      case 'hold1':
        return 'Hold...';
      case 'exhale':
        return 'Breathe out...';
      case 'hold2':
        return 'Hold...';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">Breathing Exercises</CardTitle>
        <CardDescription>Simple breathing techniques for relaxation and focus</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid place-items-center">
          <div className="mb-6">
            <div className="flex gap-2 mb-6">
              {breathingPatterns.map((pattern) => (
                <Button
                  key={pattern.name}
                  variant={selectedPattern.name === pattern.name ? "default" : "outline"}
                  className={selectedPattern.name === pattern.name ? "bg-calm-400 hover:bg-calm-500" : ""}
                  onClick={() => {
                    if (isActive) {
                      resetBreathing();
                    }
                    setSelectedPattern(pattern);
                  }}
                >
                  {pattern.name}
                </Button>
              ))}
            </div>
            
            <p className="text-center text-sm text-muted-foreground mb-4">{selectedPattern.description}</p>
            
            <div className="flex justify-center mb-6">
              <div 
                ref={animationRef} 
                className={`h-40 w-40 rounded-full flex items-center justify-center 
                  bg-gradient-to-r from-calm-300 to-calm-400 text-white text-3xl font-bold`}
              >
                {counter}
              </div>
            </div>
            
            <div className="text-center mb-4">
              <p className="text-lg font-medium">{getPhaseInstruction()}</p>
              <p className="text-sm text-muted-foreground">Completed cycles: {cycles}</p>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 rounded-full" 
                onClick={resetBreathing}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="default" 
                size="icon"
                className="h-12 w-12 rounded-full bg-gradient-to-r from-calm-400 to-calm-500 hover:from-calm-500 hover:to-calm-600" 
                onClick={toggleBreathing}
              >
                {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Breathing;
