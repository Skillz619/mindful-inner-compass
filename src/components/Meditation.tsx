
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipBack, Volume2, VolumeX } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Meditation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [ambience, setAmbience] = useState<'rain' | 'forest' | 'ocean' | 'none'>('none');
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Audio files mapping
  const audioFiles = {
    rain: "https://sounds-mp3.s3.amazonaws.com/rain.mp3",
    forest: "https://sounds-mp3.s3.amazonaws.com/forest.mp3",
    ocean: "https://sounds-mp3.s3.amazonaws.com/ocean.mp3"
  };

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

  // Create or update audio element when ambience changes
  useEffect(() => {
    if (ambience !== 'none') {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioFiles[ambience]);
        audioRef.current.loop = true;
      } else {
        audioRef.current.src = audioFiles[ambience];
      }
      
      audioRef.current.volume = volume;
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          toast({
            title: "Audio playback error",
            description: "There was an issue playing the ambient sound. Please try again.",
            variant: "destructive",
          });
          console.error("Audio playback error:", error);
        });
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [ambience, isPlaying, toast]);

  // Update volume when it changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(duration);
    }
    setIsPlaying(!isPlaying);

    // Handle audio playback with meditation timer
    if (audioRef.current && ambience !== 'none') {
      if (!isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Audio playback error:", error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeRemaining(duration);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
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

  const handleAmbienceChange = (sound: 'rain' | 'forest' | 'ocean' | 'none') => {
    if (ambience === sound) {
      setAmbience('none');
      toast({
        title: "Ambient sound disabled",
        description: "Meditation will continue without background audio."
      });
    } else {
      setAmbience(sound);
      toast({
        title: `${sound.charAt(0).toUpperCase() + sound.slice(1)} sounds activated`,
        description: "Ambient sound will play during your meditation session."
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume : 0;
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (isMuted) setIsMuted(false);
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
          
          <div className="space-y-6 w-full max-w-xs">
            <div className="grid grid-cols-3 gap-3">
              {(['rain', 'forest', 'ocean'] as const).map((sound) => (
                <Button
                  key={sound}
                  variant={ambience === sound ? "default" : "outline"} 
                  className={ambience === sound ? "bg-calm-400 hover:bg-calm-500" : ""}
                  onClick={() => handleAmbienceChange(sound)}
                >
                  {sound.charAt(0).toUpperCase() + sound.slice(1)}
                </Button>
              ))}
            </div>

            {ambience !== 'none' && (
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMute}
                  className="h-8 w-8"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[volume]}
                  min={0}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="flex-1"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Meditation;
