import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pet, InsertPet, PetSpecies, PetSpeciesType } from '@shared/schema';
import { nanoid } from 'nanoid';

interface PetStore {
  pets: Pet[];
  activePetId: string | null;
  
  // Actions
  adoptPet: (petData: Pick<InsertPet, 'name' | 'species'>) => Pet;
  setActivePet: (petId: string) => void;
  feedPet: (petId: string) => void;
  playWithPet: (petId: string) => void;
  petPet: (petId: string) => void;
  addExperience: (petId: string, xp: number) => void;
  updatePetStats: (petId: string, updates: Partial<Pick<Pet, 'happiness' | 'hunger' | 'energy'>>) => void;
  
  // Getters
  getActivePet: () => Pet | null;
  getPetById: (id: string) => Pet | null;
  
  // Evolution
  checkEvolution: (petId: string) => boolean;
  
  // Data management
  exportData: () => string;
  importData: (data: string) => void;
  resetData: () => void;
}

const getInitialPetStats = (species: PetSpeciesType) => {
  const baseStats = {
    level: 1,
    experience: 0,
    happiness: 80,
    hunger: 40,
    energy: 90,
    evolutionStage: 0,
  };

  // Species-specific stat variations
  switch (species) {
    case PetSpecies.DOG:
      return { ...baseStats, happiness: 85, energy: 95 };
    case PetSpecies.CAT:
      return { ...baseStats, happiness: 75, energy: 85 };
    case PetSpecies.RABBIT:
      return { ...baseStats, happiness: 90, energy: 100 };
    case PetSpecies.HAMSTER:
      return { ...baseStats, happiness: 88, energy: 95 };
    case PetSpecies.PARROT:
      return { ...baseStats, happiness: 82, energy: 88 };
    case PetSpecies.FISH:
      return { ...baseStats, happiness: 70, energy: 75 };
    case PetSpecies.TURTLE:
      return { ...baseStats, happiness: 78, energy: 65 };
    default:
      return baseStats;
  }
};

const getExperienceForLevel = (level: number): number => {
  return level * 100; // 100 XP per level
};

export const usePetStore = create<PetStore>()(
  persist(
    (set, get) => ({
      pets: [],
      activePetId: null,

      adoptPet: (petData) => {
        const newPet: Pet = {
          id: nanoid(),
          ...petData,
          ...getInitialPetStats(petData.species),
          isActive: get().pets.length === 0, // First pet becomes active
          adoptedAt: new Date(),
        };

        set((state) => ({
          pets: [...state.pets, newPet],
          activePetId: state.pets.length === 0 ? newPet.id : state.activePetId,
        }));

        return newPet;
      },

      setActivePet: (petId) => {
        set((state) => ({
          pets: state.pets.map(pet => ({
            ...pet,
            isActive: pet.id === petId
          })),
          activePetId: petId,
        }));
      },

      feedPet: (petId) => {
        const now = new Date();
        set((state) => ({
          pets: state.pets.map(pet => 
            pet.id === petId 
              ? {
                  ...pet,
                  hunger: Math.max(0, pet.hunger - 30),
                  happiness: Math.min(100, pet.happiness + 10),
                  lastFed: now,
                }
              : pet
          ),
        }));
      },

      playWithPet: (petId) => {
        const now = new Date();
        set((state) => ({
          pets: state.pets.map(pet => 
            pet.id === petId 
              ? {
                  ...pet,
                  happiness: Math.min(100, pet.happiness + 20),
                  energy: Math.max(0, pet.energy - 15),
                  lastPlayed: now,
                }
              : pet
          ),
        }));
      },

      petPet: (petId) => {
        const now = new Date();
        set((state) => ({
          pets: state.pets.map(pet => 
            pet.id === petId 
              ? {
                  ...pet,
                  happiness: Math.min(100, pet.happiness + 15),
                  lastPetted: now,
                }
              : pet
          ),
        }));
      },

      addExperience: (petId, xp) => {
        set((state) => ({
          pets: state.pets.map(pet => {
            if (pet.id !== petId) return pet;
            
            const newExperience = pet.experience + xp;
            const newLevel = Math.floor(newExperience / 100) + 1;
            const leveledUp = newLevel > pet.level;
            
            return {
              ...pet,
              experience: newExperience,
              level: Math.min(10, newLevel),
              happiness: leveledUp ? Math.min(100, pet.happiness + 25) : pet.happiness,
            };
          }),
        }));
        
        // Check for evolution after leveling up
        get().checkEvolution(petId);
      },

      updatePetStats: (petId, updates) => {
        set((state) => ({
          pets: state.pets.map(pet => 
            pet.id === petId 
              ? { ...pet, ...updates }
              : pet
          ),
        }));
      },

      getActivePet: () => {
        const { pets, activePetId } = get();
        return pets.find(pet => pet.id === activePetId) || null;
      },

      getPetById: (id) => {
        return get().pets.find(pet => pet.id === id) || null;
      },

      checkEvolution: (petId) => {
        const pet = get().getPetById(petId);
        if (!pet) return false;

        const canEvolve = pet.level >= (pet.evolutionStage + 1) * 3 && pet.evolutionStage < 3;
        
        if (canEvolve) {
          set((state) => ({
            pets: state.pets.map(p => 
              p.id === petId 
                ? { ...p, evolutionStage: p.evolutionStage + 1 }
                : p
            ),
          }));
          return true;
        }
        return false;
      },

      exportData: () => {
        const state = get();
        const exportData = {
          pets: state.pets,
          activePetId: state.activePetId,
          exportedAt: new Date().toISOString(),
          version: "1.0.0"
        };
        return JSON.stringify(exportData, null, 2);
      },

      importData: (data) => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.pets && Array.isArray(parsedData.pets)) {
            set({
              pets: parsedData.pets.map((pet: any) => ({
                ...pet,
                adoptedAt: new Date(pet.adoptedAt),
                lastFed: pet.lastFed ? new Date(pet.lastFed) : undefined,
                lastPlayed: pet.lastPlayed ? new Date(pet.lastPlayed) : undefined,
                lastPetted: pet.lastPetted ? new Date(pet.lastPetted) : undefined,
              })),
              activePetId: parsedData.activePetId || null,
            });
          }
        } catch (error) {
          console.error('Failed to import data:', error);
          throw new Error('Invalid data format');
        }
      },

      resetData: () => {
        set({ pets: [], activePetId: null });
      },
    }),
    {
      name: 'pet-store',
    }
  )
);
