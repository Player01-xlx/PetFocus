import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTaskStore } from '@/stores/taskStore';
import TaskCard from '@/components/TaskCard';
import { TaskStatus, TaskPriority, TaskPriorityType } from '@shared/schema';
import { Plus, Clock, Play, CheckCircle } from 'lucide-react';

export default function Tasks() {
  const { tasks, addTask, getTasksByStatus, getCompletionStats } = useTaskStore();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<TaskPriorityType>(TaskPriority.MEDIUM);

  const todoTasks = getTasksByStatus(TaskStatus.TODO);
  const inProgressTasks = getTasksByStatus(TaskStatus.IN_PROGRESS);
  const completedTasks = getTasksByStatus(TaskStatus.COMPLETED);
  const stats = getCompletionStats();

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask({
        title: newTaskTitle.trim(),
        priority: newTaskPriority,
        status: TaskStatus.TODO,
      });
      setNewTaskTitle('');
      setNewTaskPriority(TaskPriority.MEDIUM);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Task Management</h2>
        <p className="text-muted-foreground">Complete tasks to earn rewards and keep your pets happy</p>
      </div>

      {/* Task Creation */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Add New Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Task description"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            className="col-span-2"
            data-testid="input-new-task"
          />
          <Select value={newTaskPriority} onValueChange={(value: TaskPriorityType) => setNewTaskPriority(value)}>
            <SelectTrigger data-testid="select-task-priority">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={TaskPriority.LOW}>Low Priority</SelectItem>
              <SelectItem value={TaskPriority.MEDIUM}>Medium Priority</SelectItem>
              <SelectItem value={TaskPriority.HIGH}>High Priority</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            onClick={handleAddTask}
            disabled={!newTaskTitle.trim()}
            data-testid="button-add-task"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </Button>
        </div>
      </Card>

      {/* Task Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* To Do */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Clock className="w-5 h-5 text-primary mr-2" />
            To Do ({todoTasks.length})
          </h3>
          
          {todoTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No pending tasks!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todoTasks.map((task) => (
                <TaskCard key={task.id} task={task} showActions={true} />
              ))}
            </div>
          )}
        </Card>

        {/* In Progress */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Play className="w-5 h-5 text-accent mr-2" />
            In Progress ({inProgressTasks.length})
          </h3>
          
          {inProgressTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No active tasks!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {inProgressTasks.map((task) => (
                <TaskCard key={task.id} task={task} showActions={true} />
              ))}
            </div>
          )}
        </Card>

        {/* Completed */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-primary mr-2" />
            Completed ({completedTasks.length})
          </h3>
          
          {completedTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No completed tasks yet!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedTasks.slice(0, 10).map((task) => (
                <TaskCard key={task.id} task={task} showActions={false} />
              ))}
              {completedTasks.length > 10 && (
                <p className="text-center text-sm text-muted-foreground pt-4">
                  And {completedTasks.length - 10} more completed tasks...
                </p>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
