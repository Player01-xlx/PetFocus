import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FocusSession, InsertFocusSession } from '@shared/schema';
import { nanoid } from 'nanoid';

interface TimerStore {
  // Timer state
  duration: number; // in seconds
  timeLeft: number; // in seconds
  isRunning: boolean;
  isPaused: boolean;
  currentSessionId: string | null;
  
  // Focus sessions
  focusSessions: FocusSession[];
  totalFocusTime: number; // in minutes
  
  // Actions
  startTimer: (durationMinutes?: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
  completeSession: () => number; // returns XP earned
  
  // Getters
  getSessionById: (id: string) => FocusSession | null;
  getTodaysFocusTime: () => number;
  getWeeklyFocusTime: () => number;
}

export const useTimerStore = create<TimerStore>()(
  persist(
    (set, get) => ({
      duration: 25 * 60, // 25 minutes default
      timeLeft: 25 * 60,
      isRunning: false,
      isPaused: false,
      currentSessionId: null,
      focusSessions: [],
      totalFocusTime: 0,

      startTimer: (durationMinutes = 25) => {
        const durationSeconds = durationMinutes * 60;
        const sessionId = nanoid();
        
        set({
          duration: durationSeconds,
          timeLeft: durationSeconds,
          isRunning: true,
          isPaused: false,
          currentSessionId: sessionId,
        });

        // Create new focus session
        const newSession: FocusSession = {
          id: sessionId,
          duration: durationMinutes,
          startedAt: new Date(),
          xpEarned: 0,
        };

        set((state) => ({
          focusSessions: [...state.focusSessions, newSession],
        }));
      },

      pauseTimer: () => {
        set({ isRunning: false, isPaused: true });
      },

      resumeTimer: () => {
        set({ isRunning: true, isPaused: false });
      },

      resetTimer: () => {
        const { currentSessionId } = get();
        
        if (currentSessionId) {
          // Remove incomplete session
          set((state) => ({
            focusSessions: state.focusSessions.filter(s => s.id !== currentSessionId),
          }));
        }

        set({
          timeLeft: get().duration,
          isRunning: false,
          isPaused: false,
          currentSessionId: null,
        });
      },

      tick: () => {
        const { timeLeft, isRunning } = get();
        
        if (isRunning && timeLeft > 0) {
          set({ timeLeft: timeLeft - 1 });
          
          // Auto-complete when timer reaches 0
          if (timeLeft === 1) {
            get().completeSession();
          }
        }
      },

      completeSession: () => {
        const { currentSessionId, duration } = get();
        const completedMinutes = Math.ceil(duration / 60);
        const xpEarned = completedMinutes * 2; // 2 XP per minute focused

        if (currentSessionId) {
          set((state) => ({
            focusSessions: state.focusSessions.map(session =>
              session.id === currentSessionId
                ? { ...session, completedAt: new Date(), xpEarned }
                : session
            ),
            totalFocusTime: state.totalFocusTime + completedMinutes,
          }));
        }

        set({
          isRunning: false,
          isPaused: false,
          currentSessionId: null,
          timeLeft: duration,
        });

        return xpEarned;
      },

      getSessionById: (id) => {
        return get().focusSessions.find(session => session.id === id) || null;
      },

      getTodaysFocusTime: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().focusSessions
          .filter(session => {
            const sessionDate = new Date(session.startedAt);
            sessionDate.setHours(0, 0, 0, 0);
            return sessionDate.getTime() === today.getTime() && session.completedAt;
          })
          .reduce((total, session) => total + session.duration, 0);
      },

      getWeeklyFocusTime: () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        return get().focusSessions
          .filter(session => 
            new Date(session.startedAt) >= oneWeekAgo && session.completedAt
          )
          .reduce((total, session) => total + session.duration, 0);
      },
    }),
    {
      name: 'timer-store',
    }
  )
);
