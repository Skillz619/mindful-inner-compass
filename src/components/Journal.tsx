
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AudioRecorder from './AudioRecorder';

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  audioUrl?: string;
}

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      try {
        return JSON.parse(saved).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [currentEntry, setCurrentEntry] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Find entry for selected date
    const existingEntry = entries.find(entry => 
      format(entry.date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );
    
    if (existingEntry) {
      setCurrentEntry(existingEntry.content);
      setAudioUrl(existingEntry.audioUrl || null);
    } else {
      setCurrentEntry('');
      setAudioUrl(null);
    }
  }, [currentDate, entries]);

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries));
  }, [entries]);

  const saveEntry = () => {
    if (currentEntry.trim() === '' && !audioUrl) return;
    
    const existingEntryIndex = entries.findIndex(entry => 
      format(entry.date, 'yyyy-MM-dd') === format(currentDate, 'yyyy-MM-dd')
    );
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        content: currentEntry,
        audioUrl: audioUrl || updatedEntries[existingEntryIndex].audioUrl
      };
      setEntries(updatedEntries);
    } else {
      // Create new entry
      setEntries([...entries, {
        id: crypto.randomUUID(),
        date: currentDate,
        content: currentEntry,
        audioUrl: audioUrl || undefined
      }]);
    }

    toast({
      title: "Entry saved",
      description: "Your journal entry has been saved successfully.",
    });
  };

  const clearEntry = () => {
    setCurrentEntry('');
    setAudioUrl(null);
  };

  const handleAudioSaved = (url: string) => {
    setAudioUrl(url);
  };

  const clearAudio = () => {
    setAudioUrl(null);
  };

  const getPrompt = (): string => {
    const prompts = [
      "What made you smile today?",
      "What's one thing you're grateful for today?",
      "How are you really feeling right now?",
      "What's something you're looking forward to?",
      "What's one small win you had today?",
      "What would make tomorrow great?",
      "What's something you learned today?",
      "What's a challenge you're facing right now?",
      "What's something kind you did for yourself today?",
      "What's something you want to remember about today?"
    ];
    
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-gradient">Daily Journal</CardTitle>
        <CardDescription>Record your thoughts and feelings</CardDescription>
        <div className="flex items-center mt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <CalendarIcon className="h-4 w-4" />
                {format(currentDate, 'MMMM d, yyyy')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={(date) => date && setCurrentDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-muted/50 rounded-md">
          <p className="text-sm italic text-muted-foreground">Prompt: {getPrompt()}</p>
        </div>
        
        <div className="mb-4">
          <AudioRecorder 
            onAudioSaved={handleAudioSaved}
            onClear={clearAudio}
            audioUrl={audioUrl}
          />
        </div>
        
        <Textarea 
          placeholder="Write your thoughts here..." 
          className="min-h-[200px] resize-none"
          value={currentEntry}
          onChange={(e) => setCurrentEntry(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={clearEntry}>Clear</Button>
        <Button onClick={saveEntry}>
          <Save className="h-4 w-4 mr-2" />
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Journal;
