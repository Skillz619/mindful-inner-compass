
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type Mood = 'great' | 'good' | 'okay' | 'bad' | 'awful' | null;

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [moodHistory, setMoodHistory] = useState<Array<{mood: Mood, date: Date}>>([]);

  const handleMoodSelection = (mood: Mood) => {
    setSelectedMood(mood);
    setMoodHistory([...moodHistory, { mood, date: new Date() }]);
  };

  const getMoodEmoji = (mood: Mood): string => {
    switch (mood) {
      case 'great': return '😄';
      case 'good': return '🙂';
      case 'okay': return '😐';
      case 'bad': return '😕';
      case 'awful': return '😢';
      default: return '❓';
    }
  };

  const getMoodColor = (mood: Mood): string => {
    switch (mood) {
      case 'great': return 'bg-gradient-to-br from-soothing-400 to-soothing-300';
      case 'good': return 'bg-gradient-to-br from-soothing-300 to-soothing-200';
      case 'okay': return 'bg-gradient-to-br from-calm-100 to-calm-50';
      case 'bad': return 'bg-gradient-to-br from-calm-300 to-calm-200';
      case 'awful': return 'bg-gradient-to-br from-calm-500 to-calm-400';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">How are you feeling today?</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-2 mb-6">
          {(['great', 'good', 'okay', 'bad', 'awful'] as Mood[]).map((mood) => (
            <Button
              key={mood}
              variant="outline"
              className={`h-14 w-14 rounded-full text-2xl transition-all ${selectedMood === mood ? `${getMoodColor(mood)} border-2 border-primary scale-110` : 'hover:scale-105'}`}
              onClick={() => handleMoodSelection(mood)}
            >
              {getMoodEmoji(mood)}
            </Button>
          ))}
        </div>

        <div className="mt-4">
          {selectedMood && (
            <div className="text-center animate-fade-in">
              <p className="text-muted-foreground">
                {selectedMood === 'great' && "That's wonderful! Keep up the positive energy!"}
                {selectedMood === 'good' && "Good to hear you're doing well today!"}
                {selectedMood === 'okay' && "Hope your day gets better as it goes on."}
                {selectedMood === 'bad' && "I'm sorry you're not feeling great. Take some time for yourself today."}
                {selectedMood === 'awful' && "I'm here for you. Consider reaching out to someone you trust or try a breathing exercise."}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
