import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { usePetStore } from '@/stores/petStore';
import { useTaskStore } from '@/stores/taskStore';
import { useTimerStore } from '@/stores/timerStore';
import { exportAllData, importAllData, clearAllData, getDataSize } from '@/lib/storage';
import { 
  Download, 
  Upload, 
  AlertTriangle, 
  Database,
  FileCheck,
  Trash2,
  HardDrive
} from 'lucide-react';

export default function DataManagement() {
  const { toast } = useToast();
  const { pets } = usePetStore();
  const { tasks, getCompletionStats } = useTaskStore();
  const { focusSessions, totalFocusTime } = useTimerStore();
  
  const [isImporting, setIsImporting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const taskStats = getCompletionStats();
  const dataSize = getDataSize();

  const handleExport = () => {
    try {
      exportAllData();
      toast({
        title: "Export successful!",
        description: "Your data has been downloaded as a backup file.",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "There was an error exporting your data.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    
    setIsImporting(true);
    try {
      await importAllData(selectedFile);
      toast({
        title: "Import successful!",
        description: "Your data has been restored. The page will reload.",
      });
    } catch (error) {
      toast({
        title: "Import failed", 
        description: error instanceof Error ? error.message : "Invalid backup file format",
        variant: "destructive",
      });
    } finally {
      setIsImporting(false);
      setSelectedFile(null);
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      clearAllData();
      toast({
        title: "Data cleared",
        description: "All your data has been removed.",
      });
    }
  };

  const lastExportKey = 'lastExportDate';
  const lastExport = localStorage.getItem(lastExportKey);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Data Management</h2>
        <p className="text-muted-foreground">Export, import, and manage your pet progress data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Export Data */}
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Export Your Data</h3>
            <p className="text-muted-foreground">Download all your pet progress, tasks, and achievements in a single file</p>
          </div>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <span className="text-foreground">Pet collection & stats</span>
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <span className="text-foreground">Task history</span>
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <span className="text-foreground">Focus time records</span>
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border">
              <span className="text-foreground">Achievements & badges</span>
              <FileCheck className="w-5 h-5 text-primary" />
            </div>
          </div>
          
          <Button 
            onClick={handleExport}
            className="w-full bg-primary hover:bg-primary/90 py-3"
            data-testid="button-export-data"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data (petfocus-backup.json)
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            File size: ~{dataSize}KB • Last export: {lastExport ? new Date(lastExport).toLocaleDateString() : 'Never'}
          </p>
        </Card>

        {/* Import Data */}
        <Card className="p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Import Your Data</h3>
            <p className="text-muted-foreground">Restore your pet progress from a previously exported backup file</p>
          </div>
          
          {/* File Upload Area */}
          <Card 
            className="border-2 border-dashed border-border p-8 text-center mb-6 hover:border-accent/50 hover:bg-accent/5 transition-colors cursor-pointer"
            onClick={() => document.getElementById('import-file')?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">Drop your backup file here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
            <Button
              variant="outline"
              size="sm"
              data-testid="button-choose-file"
            >
              Choose File
            </Button>
            <input 
              type="file" 
              accept=".json" 
              className="hidden" 
              id="import-file"
              onChange={handleFileSelect}
              data-testid="input-import-file"
            />
          </Card>
          
          {selectedFile && (
            <Alert className="mb-4">
              <FileCheck className="h-4 w-4" />
              <AlertDescription>
                Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)}KB)
              </AlertDescription>
            </Alert>
          )}
          
          <Alert className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Importing data will replace your current progress. Make sure to export your current data first if you want to keep it.
            </AlertDescription>
          </Alert>
          
          <Button
            onClick={handleImport}
            disabled={!selectedFile || isImporting}
            className="w-full bg-accent hover:bg-accent/90 py-3"
            data-testid="button-import-data"
          >
            <Upload className="w-4 h-4 mr-2" />
            {isImporting ? 'Importing...' : 'Import Data'}
          </Button>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Supported format: .json files only
          </p>
        </Card>
      </div>

      {/* Data Statistics */}
      <Card className="bg-gradient-to-br from-muted/10 to-accent/5 p-8 border-border">
        <h3 className="text-xl font-semibold text-foreground mb-6">Your Data Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1" data-testid="stat-total-pets">
              {pets.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Pets</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1" data-testid="stat-tasks-completed">
              {taskStats.completed}
            </div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent mb-1" data-testid="stat-focus-time">
              {Math.round(totalFocusTime / 60)}h
            </div>
            <div className="text-sm text-muted-foreground">Total Focus Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-muted mb-1" data-testid="stat-focus-sessions">
              {focusSessions.filter(s => s.completedAt).length}
            </div>
            <div className="text-sm text-muted-foreground">Focus Sessions</div>
          </div>
        </div>
        
        {/* Data Management Actions */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-lg font-semibold text-foreground mb-4">Advanced Options</h4>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={handleClearData}
              className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
              data-testid="button-clear-data"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All Data
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HardDrive className="w-4 h-4" />
              <span>Storage used: {dataSize}KB</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
