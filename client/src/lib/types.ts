// Fan score tier definitions
export enum FanScoreTier {
  PANTERA_ALFA = "pantera-alfa",
  DALE_HARDCORE = "dale-hardcore",
  CASUAL_STREAMER = "casual-streamer",
  NOVATO = "novato"
}

// Tier configuration with thresholds and styling
export interface TierConfig {
  tier: FanScoreTier;
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    border: string;
    background: string;
  };
  icon: string;
}

// Fan score categories
export interface FanScoreCategory {
  name: string;
  value: number;
  max: number;
  field: "socialInteractions" | "eventPresence" | "contentEngagement" | "teamLoyalty";
}

// Complete Fan Score data
export interface FanScoreData {
  id: number;
  userId: number;
  overallScore: number;
  socialInteractions: number;
  eventPresence: number;
  contentEngagement: number;
  teamLoyalty: number;
  lastUpdated: string;
}

// Feedback options
export type FeedbackOption = "too-low" | "accurate" | "too-high" | "not-sure";

// User feedback data
export interface UserFeedback {
  feedback: FeedbackOption;
  comment?: string;
}

// Twitter user data
export interface TwitterUser {
  id: number;
  username: string;
  twitterUsername?: string;
  displayName?: string;
  profileImageUrl?: string;
}
