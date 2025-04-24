import { 
  users, type User, type InsertUser,
  fanScores, type FanScore, type InsertFanScore,
  scoreFeedback, type ScoreFeedback, type InsertScoreFeedback 
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByTwitterId(twitterId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Fan score operations
  getFanScore(userId: number): Promise<FanScore | undefined>;
  createFanScore(score: InsertFanScore): Promise<FanScore>;
  updateFanScore(userId: number, updates: Partial<FanScore>): Promise<FanScore | undefined>;
  
  // Feedback operations
  createScoreFeedback(feedback: InsertScoreFeedback): Promise<ScoreFeedback>;
  getScoreFeedbackByUserId(userId: number): Promise<ScoreFeedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private fanScores: Map<number, FanScore>;
  private scoreFeedbacks: ScoreFeedback[];
  private userCurrentId: number;
  private scoreCurrentId: number;
  private feedbackCurrentId: number;

  constructor() {
    this.users = new Map();
    this.fanScores = new Map();
    this.scoreFeedbacks = [];
    this.userCurrentId = 1;
    this.scoreCurrentId = 1;
    this.feedbackCurrentId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async getUserByTwitterId(twitterId: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.twitterId === twitterId,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      lastLogin: now 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Fan score methods
  async getFanScore(userId: number): Promise<FanScore | undefined> {
    return Array.from(this.fanScores.values()).find(
      (score) => score.userId === userId,
    );
  }

  async createFanScore(insertScore: InsertFanScore): Promise<FanScore> {
    const id = this.scoreCurrentId++;
    const now = new Date();
    const score: FanScore = {
      ...insertScore,
      id,
      lastUpdated: now,
    };
    this.fanScores.set(id, score);
    return score;
  }

  async updateFanScore(userId: number, updates: Partial<FanScore>): Promise<FanScore | undefined> {
    const score = Array.from(this.fanScores.values()).find(
      (score) => score.userId === userId,
    );
    
    if (!score) return undefined;

    const now = new Date();
    const updatedScore: FanScore = { 
      ...score, 
      ...updates,
      lastUpdated: now,
    };
    
    this.fanScores.set(score.id, updatedScore);
    return updatedScore;
  }

  // Feedback methods
  async createScoreFeedback(insertFeedback: InsertScoreFeedback): Promise<ScoreFeedback> {
    const id = this.feedbackCurrentId++;
    const now = new Date();
    
    const feedback: ScoreFeedback = {
      ...insertFeedback,
      id,
      createdAt: now,
    };
    
    this.scoreFeedbacks.push(feedback);
    return feedback;
  }

  async getScoreFeedbackByUserId(userId: number): Promise<ScoreFeedback[]> {
    return this.scoreFeedbacks.filter(feedback => feedback.userId === userId);
  }
}

export const storage = new MemStorage();
