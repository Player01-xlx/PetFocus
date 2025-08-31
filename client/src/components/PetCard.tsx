import { Pet } from '@shared/schema';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getPetImageUrl, getSpeciesInfo } from '@/lib/petData';
import { usePetStore } from '@/stores/petStore';
import { Bone, Gamepad2, Heart } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  isActive?: boolean;
  showActions?: boolean;
  onClick?: () => void;
}

export default function PetCard({ pet, isActive = false, showActions = true, onClick }: PetCardProps) {
  const { feedPet, playWithPet, petPet } = usePetStore();
  const speciesInfo = getSpeciesInfo(pet.species);
  const currentStage = speciesInfo.evolutionStages[pet.evolutionStage];
  
  const handleFeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    feedPet(pet.id);
  };
  
  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    playWithPet(pet.id);
  };
  
  const handlePet = (e: React.MouseEvent) => {
    e.stopPropagation();
    petPet(pet.id);
  };

  return (
    <Card 
      className={cn(
        "p-6 shadow-lg transition-all cursor-pointer hover:shadow-xl",
        isActive 
          ? "border-2 border-primary/20 bg-primary/5" 
          : "border border-border hover:border-primary/50 hover:bg-primary/5"
      )}
      onClick={onClick}
      data-testid={`pet-card-${pet.id}`}
    >
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <img 
            src={getPetImageUrl(pet.species, pet.evolutionStage)}
            alt={`${pet.name} - ${currentStage.name}`}
            className={cn(
              "w-24 h-24 rounded-full mx-auto border-4 transition-transform hover:scale-110",
              isActive ? "border-primary animate-float" : "border-muted"
            )}
            data-testid={`pet-image-${pet.id}`}
          />
          {isActive && (
            <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              {pet.level}
            </div>
          )}
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-bold text-foreground" data-testid={`pet-name-${pet.id}`}>
            {pet.name}
          </h3>
          <p className="text-muted-foreground" data-testid={`pet-info-${pet.id}`}>
            {currentStage.name} • Level {pet.level}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Pet Stats */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Happiness</span>
            <div className="flex items-center gap-2">
              <Progress value={pet.happiness} className="w-24 h-2" />
              <span className="text-sm font-medium text-foreground" data-testid={`pet-happiness-${pet.id}`}>
                {pet.happiness}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Energy</span>
            <div className="flex items-center gap-2">
              <Progress value={pet.energy} className="w-24 h-2" />
              <span className="text-sm font-medium text-foreground" data-testid={`pet-energy-${pet.id}`}>
                {pet.energy}%
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Hunger</span>
            <div className="flex items-center gap-2">
              <Progress value={pet.hunger} className="w-24 h-2" />
              <span className="text-sm font-medium text-foreground" data-testid={`pet-hunger-${pet.id}`}>
                {pet.hunger}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        {showActions && (
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="p-2 h-auto flex flex-col gap-1"
              onClick={handleFeed}
              data-testid={`button-feed-${pet.id}`}
            >
              <Bone className="w-4 h-4" />
              <span className="text-xs">Feed</span>
            </Button>
            <Button
              className="p-2 h-auto flex flex-col gap-1 bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
              onClick={handlePlay}
              data-testid={`button-play-${pet.id}`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="text-xs">Play</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="p-2 h-auto flex flex-col gap-1"
              onClick={handlePet}
              data-testid={`button-pet-${pet.id}`}
            >
              <Heart className="w-4 h-4" />
              <span className="text-xs">Pet</span>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
