import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTimerStore } from '@/stores/timerStore';
import { usePetStore } from '@/stores/petStore';
import { cn } from '@/lib/utils';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function FocusTimer() {
  const {
    timeLeft,
    isRunning,
    isPaused,
    duration,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    tick,
    completeSession,
  } = useTimerStore();
  
  const { getActivePet, addExperience } = usePetStore();
  const [customDuration, setCustomDuration] = useState(25);

  // Timer countdown effect
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, tick]);

  // Handle session completion
  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      const xp = completeSession();
      const activePet = getActivePet();
      if (activePet && xp > 0) {
        addExperience(activePet.id, xp);
      }
    }
  }, [timeLeft, isRunning, completeSession, getActivePet, addExperience]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((duration - timeLeft) / duration) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  const handleStart = () => {
    if (isPaused) {
      resumeTimer();
    } else {
      startTimer(customDuration);
    }
  };

  const handleReset = () => {
    resetTimer();
    setCustomDuration(25);
  };

  return (
    <Card className="p-8 border border-border">
      <h3 className="text-xl font-semibold mb-6 text-foreground">Focus Timer</h3>
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <svg className="w-full h-full progress-ring" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="hsl(240 5.9% 90%)" 
              strokeWidth="6" 
              fill="none"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              stroke="hsl(158 64% 52%)" 
              strokeWidth="6"
              fill="none" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000"
              style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground" data-testid="timer-display">
                {formatTime(timeLeft)}
              </div>
              <div className="text-sm text-muted-foreground">minutes</div>
            </div>
          </div>
        </div>
        
        {/* Duration Selector */}
        {!isRunning && !isPaused && (
          <div className="mb-4">
            <label className="block text-sm text-muted-foreground mb-2">Focus Duration</label>
            <select 
              value={customDuration}
              onChange={(e) => setCustomDuration(Number(e.target.value))}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              data-testid="duration-select"
            >
              <option value={15}>15 minutes</option>
              <option value={25}>25 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>60 minutes</option>
            </select>
          </div>
        )}
        
        <div className="flex gap-4">
          <Button
            onClick={handleStart}
            disabled={timeLeft === 0}
            className={cn(
              "px-6 py-3 font-medium transition-colors",
              isRunning ? "bg-muted hover:bg-muted/90" : "bg-primary hover:bg-primary/90 timer-glow"
            )}
            data-testid="button-start-timer"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {isPaused ? 'Resume' : 'Start Focus'}
              </>
            )}
          </Button>
          
          {isRunning && (
            <Button
              onClick={pauseTimer}
              variant="outline"
              className="px-6 py-3 font-medium"
              data-testid="button-pause-timer"
            >
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button
            onClick={handleReset}
            variant="outline"
            className="px-6 py-3 font-medium"
            data-testid="button-reset-timer"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </Card>
  );
}
