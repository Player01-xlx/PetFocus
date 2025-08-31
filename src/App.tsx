import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Dashboard from "@/pages/Dashboard";
import MyPets from "@/pages/MyPets";
import Tasks from "@/pages/Tasks";
import Support from "@/pages/Support";
import DataManagement from "@/pages/DataManagement";
import NotFound from "@/pages/not-found";
import { Button } from "@/components/ui/button";
import { useTimerStore } from "@/stores/timerStore";
import { Play } from "lucide-react";

function FloatingActionButton() {
  const { startTimer, isRunning } = useTimerStore();
  
  const handleQuickFocus = () => {
    if (!isRunning) {
      startTimer(25); // Start 25-minute focus session
    }
  };

  return (
    <Button
      onClick={handleQuickFocus}
      disabled={isRunning}
      className="fixed bottom-6 right-6 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50"
      data-testid="fab-quick-focus"
    >
      <Play className="w-6 h-6" />
    </Button>
  );
}

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Switch>
          <Route path="/" component={Dashboard} />
          <Route path="/pets" component={MyPets} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/support" component={Support} />
          <Route path="/data" component={DataManagement} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <FloatingActionButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
