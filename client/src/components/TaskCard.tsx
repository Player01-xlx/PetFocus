import { Task, TaskPriority, TaskStatus } from '@shared/schema';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTaskStore } from '@/stores/taskStore';
import { usePetStore } from '@/stores/petStore';
import { cn } from '@/lib/utils';
import { CheckCircle, Play, Pause, Clock, Star } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  showActions?: boolean;
}

const priorityColors = {
  [TaskPriority.HIGH]: 'bg-destructive/10 text-destructive',
  [TaskPriority.MEDIUM]: 'bg-secondary/10 text-secondary',
  [TaskPriority.LOW]: 'bg-muted/10 text-muted-foreground',
};

const priorityLabels = {
  [TaskPriority.HIGH]: 'High',
  [TaskPriority.MEDIUM]: 'Med',
  [TaskPriority.LOW]: 'Low',
};

export default function TaskCard({ task, showActions = true }: TaskCardProps) {
  const { completeTask, startTask, updateTask } = useTaskStore();
  const { getActivePet, addExperience } = usePetStore();

  const handleComplete = () => {
    const { xp, treats } = completeTask(task.id);
    const activePet = getActivePet();
    if (activePet && xp > 0) {
      addExperience(activePet.id, xp);
    }
  };

  const handleStart = () => {
    startTask(task.id);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Due today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Due tomorrow';
    } else {
      return `Due ${date.toLocaleDateString()}`;
    }
  };

  const isCompleted = task.status === TaskStatus.COMPLETED;
  const isInProgress = task.status === TaskStatus.IN_PROGRESS;

  return (
    <Card 
      className={cn(
        "p-4 border transition-colors cursor-pointer",
        isCompleted 
          ? "bg-primary/5 border-primary/20" 
          : isInProgress 
          ? "bg-accent/5 border-accent/20"
          : "bg-background border-border hover:border-primary/50"
      )}
      data-testid={`task-card-${task.id}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={cn(
            "font-medium text-foreground",
            isCompleted && "line-through"
          )} data-testid={`task-title-${task.id}`}>
            {task.title}
          </h4>
          
          {task.description && (
            <p className="text-sm text-muted-foreground mt-1" data-testid={`task-description-${task.id}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center gap-2 mt-2">
            {task.dueDate && (
              <span className="text-sm text-muted-foreground">
                <Clock className="w-3 h-3 inline mr-1" />
                {formatDate(task.dueDate)}
              </span>
            )}
            
            <Badge 
              className={cn("text-xs", priorityColors[task.priority])}
              data-testid={`task-priority-${task.id}`}
            >
              {priorityLabels[task.priority]}
            </Badge>
          </div>
          
          {/* Progress bar for in-progress tasks */}
          {isInProgress && (
            <div className="mt-2">
              <Progress value={65} className="h-2" />
            </div>
          )}
          
          {/* Rewards display */}
          {isCompleted && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-primary font-medium">+{task.xpReward} XP</span>
              {task.treatReward > 0 && (
                <span className="text-xs text-secondary">+{task.treatReward} Treat{task.treatReward > 1 ? 's' : ''}</span>
              )}
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        {showActions && (
          <div className="flex items-center gap-2 ml-4">
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-primary" data-testid={`task-completed-${task.id}`} />
            ) : isInProgress ? (
              <Button
                size="sm"
                variant="outline"
                onClick={handleComplete}
                data-testid={`button-complete-${task.id}`}
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleStart}
                  data-testid={`button-start-${task.id}`}
                >
                  <Play className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleComplete}
                  data-testid={`button-complete-${task.id}`}
                >
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
