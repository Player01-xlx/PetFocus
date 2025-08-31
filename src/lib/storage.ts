// Utility functions for data export/import
export const exportAllData = () => {
  const data = {
    pets: localStorage.getItem('pet-store'),
    tasks: localStorage.getItem('task-store'),
    timer: localStorage.getItem('timer-store'),
    exportedAt: new Date().toISOString(),
    version: '1.0.0'
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `petfocus-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importAllData = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.version !== '1.0.0') {
          throw new Error('Unsupported data version');
        }
        
        // Restore all store data
        if (data.pets) localStorage.setItem('pet-store', data.pets);
        if (data.tasks) localStorage.setItem('task-store', data.tasks);
        if (data.timer) localStorage.setItem('timer-store', data.timer);
        
        // Reload the page to refresh all stores
        window.location.reload();
        resolve();
      } catch (error) {
        reject(new Error('Invalid backup file format'));
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

export const clearAllData = () => {
  localStorage.removeItem('pet-store');
  localStorage.removeItem('task-store');  
  localStorage.removeItem('timer-store');
  window.location.reload();
};

export const getDataSize = () => {
  const pets = localStorage.getItem('pet-store') || '';
  const tasks = localStorage.getItem('task-store') || '';
  const timer = localStorage.getItem('timer-store') || '';
  
  const totalSize = pets.length + tasks.length + timer.length;
  return Math.round(totalSize / 1024 * 100) / 100; // KB
};
