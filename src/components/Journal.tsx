
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Mic, MicOff, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
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

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Transcribe audio to text (in a real app, this would call an API)
        toast({
          title: "Audio recorded",
          description: "Your voice entry has been recorded. You can play it back or save it with your journal entry.",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow access to your microphone to record audio entries.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      if (mediaRecorderRef.current.stream) {
        mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      }
    }
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
        
        <div className="flex items-center gap-2 mb-4">
          <Button 
            variant={isRecording ? "destructive" : "outline"} 
            size="sm" 
            className="flex items-center gap-2"
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isRecording ? "Stop Recording" : "Record Audio"}
          </Button>
          
          {audioUrl && (
            <audio src={audioUrl} controls className="w-full h-10" />
          )}
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
