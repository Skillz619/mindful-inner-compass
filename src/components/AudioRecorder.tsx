
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Play, Pause, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioRecorderProps {
  onAudioSaved: (audioUrl: string) => void;
  onClear: () => void;
  audioUrl: string | null;
}

const AudioRecorder = ({ onAudioSaved, onClear, audioUrl }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (audioUrl) {
      audioPlayerRef.current = new Audio(audioUrl);
      audioPlayerRef.current.onended = () => {
        setIsPlaying(false);
      };
    } else if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecordingTime(0);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        
        // Stop all audio tracks
        if (mediaRecorderRef.current && mediaRecorderRef.current.stream) {
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        
        onAudioSaved(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      
      // Start recording timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Speak clearly to record your thoughts."
      });
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
      
      // Clear recording timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast({
        title: "Recording finished",
        description: "Your audio has been saved."
      });
    }
  };

  const togglePlayback = () => {
    if (!audioPlayerRef.current) return;
    
    if (isPlaying) {
      audioPlayerRef.current.pause();
    } else {
      audioPlayerRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
        toast({
          title: "Playback error",
          description: "There was a problem playing your audio.",
          variant: "destructive",
        });
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  const clearAudio = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    }
    onClear();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-2">
      {isRecording ? (
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center">
            <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2"></div>
            <span className="text-sm font-medium text-red-500">Recording {formatTime(recordingTime)}</span>
          </div>
        </div>
      ) : audioUrl ? (
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant={isPlaying ? "outline" : "secondary"}
            size="sm"
            onClick={togglePlayback}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? "Pause" : "Play"}
          </Button>
          <Button 
            variant="outline"
            size="sm"
            onClick={clearAudio}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      ) : (
        <Button 
          variant={isRecording ? "destructive" : "secondary"}
          size="sm"
          className="flex items-center gap-2 w-fit"
          onClick={startRecording}
        >
          <Mic className="h-4 w-4" />
          Record Audio
        </Button>
      )}
      
      {isRecording && (
        <Button 
          variant="destructive"
          size="sm"
          className="flex items-center gap-2 w-fit"
          onClick={stopRecording}
        >
          <MicOff className="h-4 w-4" />
          Stop Recording
        </Button>
      )}
    </div>
  );
};

export default AudioRecorder;
