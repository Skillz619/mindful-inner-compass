
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

type PetStage = 'egg' | 'baby' | 'child' | 'teen' | 'adult';

interface PetStatus {
  name: string;
  stage: PetStage;
  happiness: number;
  growth: number;
  lastCaredFor: string;
  streak: number;
}

const VirtualPet = () => {
  const [pet, setPet] = useState<PetStatus>(() => {
    const saved = localStorage.getItem('virtualPet');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {
          name: 'Buddy',
          stage: 'egg',
          happiness: 70,
          growth: 0,
          lastCaredFor: new Date().toISOString(),
          streak: 0
        };
      }
    }
    return {
      name: 'Buddy',
      stage: 'egg',
      happiness: 70,
      growth: 0,
      lastCaredFor: new Date().toISOString(),
      streak: 0
    };
  });
  
  const [petName, setPetName] = useState(pet.name);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('virtualPet', JSON.stringify(pet));
  }, [pet]);

  useEffect(() => {
    // Check if pet needs attention (once per day)
    const lastCared = new Date(pet.lastCaredFor);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastCared.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 1) {
      const newHappiness = Math.max(pet.happiness - (diffDays * 10), 0);
      setPet({
        ...pet,
        happiness: newHappiness
      });
      
      if (diffDays === 1) {
        toast({
          title: `${pet.name} misses you!`,
          description: "Your virtual pet needs some attention today."
        });
      } else if (diffDays > 1) {
        toast({
          title: `${pet.name} is feeling neglected!`,
          description: `It's been ${diffDays} days since you last cared for your pet.`,
          variant: "destructive"
        });
      }
    }
  }, []);

  const careForPet = () => {
    const lastCared = new Date(pet.lastCaredFor);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    lastCared.setHours(0, 0, 0, 0);
    
    // Check if already cared for today
    if (lastCared.getTime() === today.getTime()) {
      toast({
        title: "Already cared for today",
        description: `You've already taken care of ${pet.name} today. Come back tomorrow!`
      });
      return;
    }
    
    // Calculate streak
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const isConsecutive = lastCared.getTime() === yesterday.getTime();
    const newStreak = isConsecutive ? pet.streak + 1 : 1;
    
    // Update happiness and growth
    let newHappiness = Math.min(pet.happiness + 20, 100);
    let newGrowth = pet.growth + 5;
    let newStage = pet.stage;
    
    // Check for evolution
    if (newGrowth >= 100 && pet.stage !== 'adult') {
      const stages: PetStage[] = ['egg', 'baby', 'child', 'teen', 'adult'];
      const currentIndex = stages.indexOf(pet.stage);
      if (currentIndex < stages.length - 1) {
        newStage = stages[currentIndex + 1];
        newGrowth = 0;
        
        toast({
          title: "Your pet evolved!",
          description: `${pet.name} has grown into a ${newStage}!`,
        });
      }
    }
    
    setPet({
      ...pet,
      happiness: newHappiness,
      growth: newGrowth,
      lastCaredFor: new Date().toISOString(),
      streak: newStreak,
      stage: newStage
    });
    
    toast({
      title: `${pet.name} is happy!`,
      description: `Streak: ${newStreak} day${newStreak > 1 ? 's' : ''}. Keep it up!`
    });
  };

  const updatePetName = () => {
    if (petName.trim()) {
      setPet({ ...pet, name: petName });
      setIsEditing(false);
      toast({
        title: "Name updated",
        description: `Your pet is now called ${petName}!`
      });
    }
  };

  const getPetEmoji = () => {
    switch(pet.stage) {
      case 'egg': return '🥚';
      case 'baby': return '🐣';
      case 'child': return '🐥';
      case 'teen': return '🐤';
      case 'adult': return '🐔';
      default: return '🥚';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                className="border p-1 rounded"
                maxLength={15}
              />
              <Button size="sm" onClick={updatePetName}>Save</Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {pet.name} <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>✏️</Button>
            </div>
          )}
        </CardTitle>
        <CardDescription>Your virtual wellness companion</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-7xl mb-6 animate-pulse-gentle">
          {getPetEmoji()}
        </div>
        
        <div className="w-full space-y-4 mb-6">
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Happiness</span>
              <span>{pet.happiness}%</span>
            </div>
            <Progress value={pet.happiness} className="h-2" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1 text-sm">
              <span>Growth</span>
              <span>{pet.growth}%</span>
            </div>
            <Progress value={pet.growth} className="h-2" />
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">
            Streak: <span className="font-bold">{pet.streak} day{pet.streak !== 1 ? 's' : ''}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last cared for: {new Date(pet.lastCaredFor).toLocaleDateString()}
          </p>
        </div>
        
        <Button 
          onClick={careForPet}
          className="bg-gradient-to-r from-calm-400 to-soothing-400 hover:from-calm-500 hover:to-soothing-500"
        >
          Care for {pet.name}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VirtualPet;
