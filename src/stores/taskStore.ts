import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, InsertTask, TaskStatus, TaskPriority, TaskStatusType, TaskPriorityType } from '@shared/schema';
import { nanoid } from 'nanoid';

interface TaskStore {
  tasks: Task[];
  
  // Actions
  addTask: (taskData: Omit<InsertTask, 'xpReward' | 'treatReward'>) => Task;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  completeTask: (taskId: string) => { xp: number; treats: number };
  startTask: (taskId: string) => void;
  
  // Getters
  getTasksByStatus: (status: TaskStatusType) => Task[];
  getTodaysTasks: () => Task[];
  getTaskById: (id: string) => Task | null;
  
  // Stats
  getCompletionStats: () => {
    total: number;
    completed: number;
    inProgress: number;
    todo: number;
  };
}

const calculateRewards = (priority: TaskPriorityType): { xp: number; treats: number } => {
  switch (priority) {
    case TaskPriority.HIGH:
      return { xp: 50, treats: 2 };
    case TaskPriority.MEDIUM:
      return { xp: 30, treats: 1 };
    case TaskPriority.LOW:
      return { xp: 20, treats: 1 };
    default:
      return { xp: 20, treats: 1 };
  }
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (taskData) => {
        const rewards = calculateRewards(taskData.priority);
        const newTask: Task = {
          id: nanoid(),
          ...taskData,
          xpReward: rewards.xp,
          treatReward: rewards.treats,
          status: TaskStatus.TODO,
          createdAt: new Date(),
        };

        set((state) => ({
          tasks: [...state.tasks, newTask],
        }));

        return newTask;
      },

      updateTask: (taskId, updates) => {
        set((state) => ({
          tasks: state.tasks.map(task => 
            task.id === taskId ? { ...task, ...updates } : task
          ),
        }));
      },

      deleteTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.filter(task => task.id !== taskId),
        }));
      },

      completeTask: (taskId) => {
        const task = get().getTaskById(taskId);
        if (!task) return { xp: 0, treats: 0 };

        set((state) => ({
          tasks: state.tasks.map(t => 
            t.id === taskId 
              ? { ...t, status: TaskStatus.COMPLETED, completedAt: new Date() }
              : t
          ),
        }));

        return { xp: task.xpReward, treats: task.treatReward };
      },

      startTask: (taskId) => {
        set((state) => ({
          tasks: state.tasks.map(task => 
            task.id === taskId 
              ? { ...task, status: TaskStatus.IN_PROGRESS }
              : task
          ),
        }));
      },

      getTasksByStatus: (status) => {
        return get().tasks.filter(task => task.status === status);
      },

      getTodaysTasks: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().tasks.filter(task => {
          const taskDate = new Date(task.createdAt);
          taskDate.setHours(0, 0, 0, 0);
          return taskDate.getTime() === today.getTime();
        });
      },

      getTaskById: (id) => {
        return get().tasks.find(task => task.id === id) || null;
      },

      getCompletionStats: () => {
        const tasks = get().tasks;
        return {
          total: tasks.length,
          completed: tasks.filter(t => t.status === TaskStatus.COMPLETED).length,
          inProgress: tasks.filter(t => t.status === TaskStatus.IN_PROGRESS).length,
          todo: tasks.filter(t => t.status === TaskStatus.TODO).length,
        };
      },
    }),
    {
      name: 'task-store',
    }
  )
);
