import { PetSpecies, PetSpeciesType } from '@shared/schema';

export interface PetSpeciesInfo {
  name: string;
  description: string;
  emoji: string;
  evolutionStages: {
    name: string;
    description: string;
    requiredLevel: number;
  }[];
  preferences: {
    favoriteFood: string;
    favoriteActivity: string;
    personality: string;
  };
}

export const PET_SPECIES_DATA: Record<PetSpeciesType, PetSpeciesInfo> = {
  [PetSpecies.DOG]: {
    name: 'Golden Retriever',
    description: 'Loyal and energetic companion',
    emoji: '🐕',
    evolutionStages: [
      { name: 'Small Puppy', description: 'Tiny, fluffy, and playful', requiredLevel: 1 },
      { name: 'Growing Dog', description: 'Bigger, stronger, more confident', requiredLevel: 3 },
      { name: 'Strong Adult', description: 'Muscular, powerful, and wise', requiredLevel: 6 },
      { name: 'Alpha Dog', description: 'Largest, strongest, pack leader', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Premium dog food',
      favoriteActivity: 'Playing fetch',
      personality: 'Loyal and energetic'
    }
  },
  [PetSpecies.CAT]: {
    name: 'Maine Coon',
    description: 'Independent and graceful',
    emoji: '🐱',
    evolutionStages: [
      { name: 'Tiny Kitten', description: 'Small, curious, and fluffy', requiredLevel: 1 },
      { name: 'Young Cat', description: 'Agile, sleek, and confident', requiredLevel: 3 },
      { name: 'Large Cat', description: 'Big, strong, and majestic', requiredLevel: 6 },
      { name: 'Giant Maine Coon', description: 'Massive, powerful, regal feline', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Fresh fish',
      favoriteActivity: 'Hunting and napping',
      personality: 'Independent and graceful'
    }
  },
  [PetSpecies.RABBIT]: {
    name: 'Flemish Giant',
    description: 'Gentle and peaceful',
    emoji: '🐰',
    evolutionStages: [
      { name: 'Small Bunny', description: 'Tiny, soft, and adorable', requiredLevel: 1 },
      { name: 'Medium Rabbit', description: 'Bigger, faster, more athletic', requiredLevel: 3 },
      { name: 'Large Rabbit', description: 'Strong, robust, and confident', requiredLevel: 6 },
      { name: 'Giant Rabbit', description: 'Massive, powerful, impressive size', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Fresh vegetables',
      favoriteActivity: 'Hopping and exploring',
      personality: 'Gentle and peaceful'
    }
  },
  [PetSpecies.HAMSTER]: {
    name: 'Syrian Hamster',
    description: 'Small but energetic',
    emoji: '🐹',
    evolutionStages: [
      { name: 'Baby Hamster', description: 'Tiny, pink, and vulnerable', requiredLevel: 1 },
      { name: 'Young Hamster', description: 'Fluffy, active, and growing', requiredLevel: 3 },
      { name: 'Adult Hamster', description: 'Chunky, strong, and confident', requiredLevel: 6 },
      { name: 'Alpha Hamster', description: 'Largest, strongest, territory ruler', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Sunflower seeds',
      favoriteActivity: 'Running on wheel',
      personality: 'Energetic and curious'
    }
  },
  [PetSpecies.PARROT]: {
    name: 'Macaw',
    description: 'Colorful and intelligent',
    emoji: '🦜',
    evolutionStages: [
      { name: 'Baby Chick', description: 'Small, fluffy, learning to fly', requiredLevel: 1 },
      { name: 'Young Parrot', description: 'Colorful feathers, strong wings', requiredLevel: 3 },
      { name: 'Adult Macaw', description: 'Large, magnificent, powerful beak', requiredLevel: 6 },
      { name: 'Giant Macaw', description: 'Massive wingspan, commanding presence', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Tropical fruits',
      favoriteActivity: 'Flying and talking',
      personality: 'Smart and social'
    }
  },
  [PetSpecies.FISH]: {
    name: 'Goldfish',
    description: 'Peaceful swimmer',
    emoji: '🐠',
    evolutionStages: [
      { name: 'Tiny Fry', description: 'Small, delicate, just learning to swim', requiredLevel: 1 },
      { name: 'Young Fish', description: 'Growing fins, stronger swimmer', requiredLevel: 3 },
      { name: 'Large Fish', description: 'Big, healthy, graceful movements', requiredLevel: 6 },
      { name: 'Giant Goldfish', description: 'Massive size, tank dominator', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Fish flakes',
      favoriteActivity: 'Swimming in circles',
      personality: 'Calm and peaceful'
    }
  },
  [PetSpecies.TURTLE]: {
    name: 'Red-Eared Slider',
    description: 'Wise and patient',
    emoji: '🐢',
    evolutionStages: [
      { name: 'Baby Turtle', description: 'Tiny shell, vulnerable and cute', requiredLevel: 1 },
      { name: 'Young Turtle', description: 'Stronger shell, more confident', requiredLevel: 3 },
      { name: 'Adult Turtle', description: 'Large shell, wise and strong', requiredLevel: 6 },
      { name: 'Ancient Turtle', description: 'Massive shell, incredible wisdom', requiredLevel: 9 },
    ],
    preferences: {
      favoriteFood: 'Lettuce and crickets',
      favoriteActivity: 'Basking in sun',
      personality: 'Patient and wise'
    }
  },
};

export const getPetImageUrl = (species: PetSpeciesType, evolutionStage: number = 0): string => {
  // Using unsplash images that show size progression - in production these would be actual sprite assets
  const imageMap: Record<PetSpeciesType, string[]> = {
    [PetSpecies.DOG]: [
      'https://images.unsplash.com/photo-1552053831-71594a27632d?w=150&h=150&fit=crop&crop=faces', // Small puppy
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=170&h=170&fit=crop&crop=faces', // Growing dog
      'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=190&h=190&fit=crop&crop=faces', // Strong adult
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=220&h=220&fit=crop&crop=faces'  // Alpha dog
    ],
    [PetSpecies.CAT]: [
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop&crop=faces', // Tiny kitten
      'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=170&h=170&fit=crop&crop=faces', // Young cat
      'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=190&h=190&fit=crop&crop=faces', // Large cat
      'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=220&h=220&fit=crop&crop=faces'  // Giant Maine Coon
    ],
    [PetSpecies.RABBIT]: [
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=150&h=150&fit=crop&crop=faces', // Small bunny
      'https://images.unsplash.com/photo-1606316717415-82ddb7b85035?w=170&h=170&fit=crop&crop=faces', // Medium rabbit
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=190&h=190&fit=crop&crop=faces', // Large rabbit
      'https://images.unsplash.com/photo-1612198537475-6b9af16de104?w=220&h=220&fit=crop&crop=faces'  // Giant rabbit
    ],
    [PetSpecies.HAMSTER]: [
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=150&h=150&fit=crop&crop=faces', // Baby hamster
      'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=170&h=170&fit=crop&crop=faces', // Young hamster
      'https://images.unsplash.com/photo-1589634577374-57d35d3ddfb7?w=190&h=190&fit=crop&crop=faces', // Adult hamster
      'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=220&h=220&fit=crop&crop=faces'  // Alpha hamster
    ],
    [PetSpecies.PARROT]: [
      'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=150&h=150&fit=crop&crop=faces', // Baby chick
      'https://images.unsplash.com/photo-1544768679-dbe1a6b5c9c3?w=170&h=170&fit=crop&crop=faces', // Young parrot
      'https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?w=190&h=190&fit=crop&crop=faces', // Adult macaw
      'https://images.unsplash.com/photo-1562169029-a83df4a55119?w=220&h=220&fit=crop&crop=faces'  // Giant macaw
    ],
    [PetSpecies.FISH]: [
      'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=150&h=150&fit=crop&crop=center', // Tiny fry
      'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=170&h=170&fit=crop&crop=center', // Young fish
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=190&h=190&fit=crop&crop=center', // Large fish
      'https://images.unsplash.com/photo-1559827268-20ba04c24aa8?w=220&h=220&fit=crop&crop=center'  // Giant goldfish
    ],
    [PetSpecies.TURTLE]: [
      'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=150&h=150&fit=crop&crop=center', // Baby turtle
      'https://images.unsplash.com/photo-1520985244272-9d0b8730bb3b?w=170&h=170&fit=crop&crop=center', // Young turtle
      'https://images.unsplash.com/photo-1613364542777-b9bcc42b4f5b?w=190&h=190&fit=crop&crop=center', // Adult turtle
      'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8f8?w=220&h=220&fit=crop&crop=center'  // Ancient turtle
    ],
  };

  return imageMap[species][Math.min(evolutionStage, imageMap[species].length - 1)];
};

export const getSpeciesInfo = (species: PetSpeciesType): PetSpeciesInfo => {
  return PET_SPECIES_DATA[species];
};

export const getAllSpecies = (): PetSpeciesType[] => {
  return Object.values(PetSpecies);
};
