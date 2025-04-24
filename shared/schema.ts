import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model for authentication and Twitter info
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  twitterId: text("twitter_id"),
  twitterUsername: text("twitter_username"),
  displayName: text("display_name"),
  profileImageUrl: text("profile_image_url"),
  accessToken: text("access_token"),
  accessTokenSecret: text("access_token_secret"),
  lastLogin: timestamp("last_login"),
});

// Fan score model to track user engagement
export const fanScores = pgTable("fan_scores", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  overallScore: integer("overall_score").notNull().default(0),
  socialInteractions: integer("social_interactions").notNull().default(0),
  eventPresence: integer("event_presence").notNull().default(0),
  contentEngagement: integer("content_engagement").notNull().default(0),
  teamLoyalty: integer("team_loyalty").notNull().default(0),
  lastUpdated: timestamp("last_updated").notNull().defaultNow(),
});

// User feedback on their score
export const scoreFeedback = pgTable("score_feedback", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  feedback: text("feedback").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  twitterId: true,
  twitterUsername: true,
  displayName: true,
  profileImageUrl: true,
  accessToken: true,
  accessTokenSecret: true,
});

export const insertFanScoreSchema = createInsertSchema(fanScores).pick({
  userId: true,
  overallScore: true,
  socialInteractions: true,
  eventPresence: true,
  contentEngagement: true,
  teamLoyalty: true,
});

export const insertScoreFeedbackSchema = createInsertSchema(scoreFeedback).pick({
  userId: true,
  feedback: true,
  comment: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFanScore = z.infer<typeof insertFanScoreSchema>;
export type FanScore = typeof fanScores.$inferSelect;

export type InsertScoreFeedback = z.infer<typeof insertScoreFeedbackSchema>;
export type ScoreFeedback = typeof scoreFeedback.$inferSelect;
