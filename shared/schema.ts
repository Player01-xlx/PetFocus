import { z } from "zod";

export const PetSpecies = {
  DOG: "dog",
  CAT: "cat", 
  RABBIT: "rabbit",
  HAMSTER: "hamster",
  PARROT: "parrot",
  FISH: "fish",
  TURTLE: "turtle"
} as const;

export type PetSpeciesType = typeof PetSpecies[keyof typeof PetSpecies];

export const TaskPriority = {
  LOW: "low",
  MEDIUM: "medium", 
  HIGH: "high"
} as const;

export type TaskPriorityType = typeof TaskPriority[keyof typeof TaskPriority];

export const TaskStatus = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed"
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];

export const petSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.enum([PetSpecies.DOG, PetSpecies.CAT, PetSpecies.RABBIT, PetSpecies.HAMSTER, PetSpecies.PARROT, PetSpecies.FISH, PetSpecies.TURTLE]),
  level: z.number().min(1).max(10),
  experience: z.number().min(0),
  happiness: z.number().min(0).max(100),
  hunger: z.number().min(0).max(100),
  energy: z.number().min(0).max(100),
  evolutionStage: z.number().min(0).max(3),
  isActive: z.boolean().default(false),
  adoptedAt: z.date(),
  lastFed: z.date().optional(),
  lastPlayed: z.date().optional(),
  lastPetted: z.date().optional(),
});

export const insertPetSchema = petSchema.omit({ id: true, adoptedAt: true });

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  priority: z.enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGH]),
  status: z.enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]),
  xpReward: z.number().min(0),
  treatReward: z.number().min(0),
  createdAt: z.date(),
  completedAt: z.date().optional(),
  dueDate: z.date().optional(),
});

export const insertTaskSchema = taskSchema.omit({ id: true, createdAt: true, completedAt: true });

export const focusSessionSchema = z.object({
  id: z.string(),
  duration: z.number(), // in minutes
  startedAt: z.date(),
  completedAt: z.date().optional(),
  xpEarned: z.number().min(0),
  petId: z.string().optional(),
});

export const insertFocusSessionSchema = focusSessionSchema.omit({ id: true, startedAt: true, completedAt: true });

export const userProgressSchema = z.object({
  totalFocusTime: z.number().default(0), // in minutes
  totalTasksCompleted: z.number().default(0),
  totalXpEarned: z.number().default(0),
  achievements: z.array(z.string()).default([]),
  streakDays: z.number().default(0),
  lastActiveDate: z.date().optional(),
});

export type Pet = z.infer<typeof petSchema>;
export type InsertPet = z.infer<typeof insertPetSchema>;
export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type FocusSession = z.infer<typeof focusSessionSchema>;
export type InsertFocusSession = z.infer<typeof insertFocusSessionSchema>;
export type UserProgress = z.infer<typeof userProgressSchema>;
