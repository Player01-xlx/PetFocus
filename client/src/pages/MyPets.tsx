import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePetStore } from '@/stores/petStore';
import PetCard from '@/components/PetCard';
import { PetSpecies, PetSpeciesType } from '@shared/schema';
import { getPetImageUrl, getSpeciesInfo, getAllSpecies } from '@/lib/petData';
import { PawPrint, Star, Heart, Plus } from 'lucide-react';

export default function MyPets() {
  const { pets, adoptPet, setActivePet } = usePetStore();
  const [isAdoptDialogOpen, setIsAdoptDialogOpen] = useState(false);
  const [newPetName, setNewPetName] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpeciesType | ''>('');

  const handleAdoptPet = () => {
    if (newPetName.trim() && selectedSpecies) {
      adoptPet({
        name: newPetName.trim(),
        species: selectedSpecies as PetSpeciesType,
      });
      setNewPetName('');
      setSelectedSpecies('');
      setIsAdoptDialogOpen(false);
    }
  };

  const stats = {
    totalPets: pets.length,
    averageLevel: pets.length > 0 ? Math.round(pets.reduce((sum, pet) => sum + pet.level, 0) / pets.length * 10) / 10 : 0,
    averageHappiness: pets.length > 0 ? Math.round(pets.reduce((sum, pet) => sum + pet.happiness, 0) / pets.length) : 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">My Pet Collection</h2>
        <p className="text-muted-foreground">Manage and interact with all your virtual companions</p>
      </div>

      {/* Pet Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Pets</p>
              <p className="text-2xl font-bold text-primary" data-testid="stat-total-pets">{stats.totalPets}</p>
            </div>
            <PawPrint className="w-8 h-8 text-primary/50" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5 p-6 border-secondary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Level</p>
              <p className="text-2xl font-bold text-secondary" data-testid="stat-average-level">{stats.averageLevel}</p>
            </div>
            <Star className="w-8 h-8 text-secondary/50" />
          </div>
        </Card>
        
        <Card className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Happiness</p>
              <p className="text-2xl font-bold text-accent" data-testid="stat-average-happiness">{stats.averageHappiness}%</p>
            </div>
            <Heart className="w-8 h-8 text-accent/50" />
          </div>
        </Card>
      </div>

      {/* Pet Grid */}
      {pets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              isActive={pet.isActive}
              showActions={true}
              onClick={() => setActivePet(pet.id)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center mx-auto mb-6">
            <PawPrint className="w-8 h-8 text-primary/50" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No pets yet!</h3>
          <p className="text-muted-foreground mb-6">Adopt your first virtual companion to start your productivity journey</p>
        </Card>
      )}

      {/* Adopt New Pet Section */}
      <Card className="bg-gradient-to-br from-muted/10 to-accent/5 p-8 border-border">
        <h3 className="text-xl font-semibold text-foreground mb-4">Adopt a New Pet</h3>
        <p className="text-muted-foreground mb-6">Choose your next companion from our collection of adorable creatures</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {getAllSpecies().map((species) => {
            const info = getSpeciesInfo(species);
            return (
              <Card 
                key={species}
                className="p-4 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedSpecies(species);
                  setIsAdoptDialogOpen(true);
                }}
                data-testid={`adoptable-${species}`}
              >
                <img 
                  src={getPetImageUrl(species, 0)}
                  alt={`Adoptable ${info.name}`}
                  className="w-16 h-16 rounded-full mx-auto mb-2"
                />
                <h4 className="font-medium text-foreground">{info.name}</h4>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Dialog open={isAdoptDialogOpen} onOpenChange={setIsAdoptDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-primary hover:bg-primary/90"
                data-testid="button-open-adopt-dialog"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adopt New Pet
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adopt a New Pet</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="pet-name">Pet Name</Label>
                  <Input
                    id="pet-name"
                    placeholder="Enter a name for your new pet"
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    data-testid="input-pet-name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pet-species">Species</Label>
                  <Select value={selectedSpecies} onValueChange={(value) => setSelectedSpecies(value as PetSpeciesType)}>
                    <SelectTrigger data-testid="select-pet-species">
                      <SelectValue placeholder="Choose a species" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAllSpecies().map((species) => {
                        const info = getSpeciesInfo(species);
                        return (
                          <SelectItem key={species} value={species}>
                            {info.emoji} {info.name}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedSpecies && (
                  <div className="text-center p-4 bg-muted/10 rounded-lg">
                    <img 
                      src={getPetImageUrl(selectedSpecies as PetSpeciesType, 0)}
                      alt={`Preview of ${getSpeciesInfo(selectedSpecies as PetSpeciesType).name}`}
                      className="w-20 h-20 rounded-full mx-auto mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {getSpeciesInfo(selectedSpecies as PetSpeciesType).description}
                    </p>
                  </div>
                )}
                
                <Button
                  onClick={handleAdoptPet}
                  disabled={!newPetName.trim() || !selectedSpecies}
                  className="w-full"
                  data-testid="button-confirm-adopt"
                >
                  Adopt Pet
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}
