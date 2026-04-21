export type UserGoal = 'weight-loss' | 'fitness' | 'healthy-eating';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: number;
}

export interface MealAnalysis {
  name: string;
  calories: number;
  healthScore: number;
  tag: 'Healthy' | 'Moderate' | 'Unhealthy';
  betterSwap: string;
  icon: string;
}

export interface UserState {
  name: string;
  goal: UserGoal;
  healthScore: number;
  chatHistory: ChatMessage[];
  lastAnalysis?: MealAnalysis;
}
