// Storage interface for pet focus app
// This app uses client-side storage, so server storage is minimal

export interface IStorage {
  // Placeholder for future server-side features
  ping(): Promise<string>;
}

export class MemStorage implements IStorage {
  constructor() {
    // Memory storage placeholder
  }

  async ping(): Promise<string> {
    return "pong";
  }
}

export const storage = new MemStorage();
