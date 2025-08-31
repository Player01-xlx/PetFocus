import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePetStore } from '@/stores/petStore';
import { useTaskStore } from '@/stores/taskStore';
import { useTimerStore } from '@/stores/timerStore';
import PetCard from '@/components/PetCard';
import FocusTimer from '@/components/FocusTimer';
import TaskCard from '@/components/TaskCard';
import { TaskStatus, PetSpecies } from '@shared/schema';
import { Plus, CheckSquare } from 'lucide-react';
import { Link } from 'wouter';

export default function Dashboard() {
  const { pets, getActivePet, adoptPet, setActivePet } = usePetStore();
  const { getTasksByStatus } = useTaskStore();
  const { getTodaysFocusTime: getTimerFocusTime } = useTimerStore();
  
  const activePet = getActivePet();
  const quickTasks = getTasksByStatus(TaskStatus.TODO).slice(0, 3);
  const completedTasks = getTasksByStatus(TaskStatus.COMPLETED);
  const todaysFocusMinutes = getTimerFocusTime();
  
  const handleAdoptFirstPet = () => {
    const newPet = adoptPet({
      name: 'Buddy',
      species: PetSpecies.DOG,
    });
    setActivePet(newPet.id);
  };

  const formatFocusTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Welcome back! 🌱
            </h2>
            <p className="text-muted-foreground mb-6">
              {activePet 
                ? `Your pet ${activePet.name} is eagerly waiting for some focus time. Complete tasks and focus sessions to keep them happy and help them evolve!`
                : "Ready to adopt your first virtual companion? They'll help keep you motivated and productive!"
              }
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground">Today's Focus</div>
                <div className="text-2xl font-bold text-primary" data-testid="stat-todays-focus">
                  {formatFocusTime(todaysFocusMinutes)}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground">Tasks Done</div>
                <div className="text-2xl font-bold text-secondary" data-testid="stat-tasks-done">
                  {completedTasks.length}
                </div>
              </div>
              {activePet && (
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="text-sm text-muted-foreground">Happiness</div>
                  <div className="text-2xl font-bold text-accent" data-testid="stat-pet-happiness">
                    {activePet.happiness}%
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-center">
            {activePet ? (
              <PetCard 
                pet={activePet} 
                isActive={true}
                showActions={true}
              />
            ) : (
              <div className="space-y-4">
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center mx-auto">
                  <Plus className="w-12 h-12 text-primary/50" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">No Pet Yet</h3>
                  <p className="text-muted-foreground mb-4">Adopt your first companion!</p>
                  <Button 
                    onClick={handleAdoptFirstPet}
                    className="bg-primary hover:bg-primary/90"
                    data-testid="button-adopt-first-pet"
                  >
                    Adopt Buddy
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Focus Timer & Quick Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <FocusTimer />
        </div>
        
        <div>
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Quick Tasks</h3>
              <Link href="/tasks">
                <Button variant="ghost" size="sm" data-testid="link-view-all-tasks">
                  View All
                </Button>
              </Link>
            </div>
            
            {quickTasks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No tasks yet!</p>
                <Link href="/tasks">
                  <Button className="mt-2" size="sm" data-testid="button-add-first-task">
                    Add your first task
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {quickTasks.map((task) => (
                  <TaskCard 
                    key={task.id} 
                    task={task}
                    showActions={true}
                  />
                ))}
                <Link href="/tasks">
                  <Button 
                    variant="ghost" 
                    className="w-full mt-4 text-primary hover:text-primary/80"
                    data-testid="button-add-new-task"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add new task
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Pet Collection Preview */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-foreground">Your Pet Family</h3>
          <Link href="/pets">
            <Button variant="ghost" data-testid="link-view-all-pets">
              View All
            </Button>
          </Link>
        </div>
        
        {pets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary/30 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary/50" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">No pets yet!</h4>
            <p className="text-muted-foreground mb-4">Adopt your first virtual companion to get started</p>
            <Button 
              onClick={handleAdoptFirstPet}
              data-testid="button-adopt-first-pet-preview"
            >
              Adopt Your First Pet
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pets.slice(0, 3).map((pet) => (
              <div key={pet.id} className="relative">
                <PetCard 
                  pet={pet}
                  isActive={pet.id === activePet?.id}
                  showActions={false}
                  onClick={() => setActivePet(pet.id)}
                />
              </div>
            ))}
            
            {/* Adopt New Pet */}
            <Link href="/pets">
              <Card className="p-4 border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full mx-auto mb-2 bg-muted/20 flex items-center justify-center">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-muted-foreground">Adopt Pet</h4>
                  <p className="text-xs text-muted-foreground">New friend?</p>
                </div>
              </Card>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
}
