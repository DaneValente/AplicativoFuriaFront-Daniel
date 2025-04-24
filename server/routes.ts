import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertFanScoreSchema, 
  insertScoreFeedbackSchema 
} from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as TwitterStrategy, Profile } from "passport-twitter";

// For demonstration, generate a random score for new users
function generateRandomFanScore(userId: number) {
  return {
    userId,
    overallScore: Math.floor(Math.random() * 100) + 1,
    socialInteractions: Math.floor(Math.random() * 100) + 1,
    eventPresence: Math.floor(Math.random() * 100) + 1,
    contentEngagement: Math.floor(Math.random() * 100) + 1,
    teamLoyalty: Math.floor(Math.random() * 100) + 1,
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session
  const MemStoreSession = MemoryStore(session);
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "esports-fan-hub-secret",
      resave: true,
      saveUninitialized: true,
      cookie: { 
        secure: false, // Set to false for development
        maxAge: 86400000, // 24 hours
        httpOnly: true 
      },
      store: new MemStoreSession({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
    })
  );

  // Setup Twitter authentication
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Setup Twitter OAuth strategy if environment variables are present
  if (process.env.TWITTER_CONSUMER_KEY && process.env.TWITTER_CONSUMER_SECRET) {
    passport.use(
      new TwitterStrategy(
        {
          consumerKey: process.env.TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
          callbackURL: "/api/auth/twitter/callback",
        },
        async (token: string, tokenSecret: string, profile: Profile, done: any) => {
          try {
            // Check if user exists
            let user = await storage.getUserByTwitterId(profile.id);
            
            if (!user) {
              // Create new user
              user = await storage.createUser({
                username: profile.username,
                password: "", // No password for OAuth users
                twitterId: profile.id,
                twitterUsername: profile.username,
                displayName: profile.displayName,
                profileImageUrl: profile.photos?.[0]?.value,
                accessToken: token,
                accessTokenSecret: tokenSecret,
              });
              
              // Create initial fan score for new users
              await storage.createFanScore(generateRandomFanScore(user.id));
            } else {
              // Update existing user
              user = await storage.updateUser(user.id, {
                displayName: profile.displayName,
                profileImageUrl: profile.photos?.[0]?.value,
                accessToken: token,
                accessTokenSecret: tokenSecret,
                lastLogin: new Date(),
              }) as any;
            }
            
            return done(null, user);
          } catch (error) {
            return done(error as Error);
          }
        }
      )
    );
  }

  // Authentication routes
  app.get("/api/auth/twitter", passport.authenticate("twitter"));
  
  app.get(
    "/api/auth/twitter/callback",
    passport.authenticate("twitter", {
      successRedirect: "/dashboard",
      failureRedirect: "/",
    })
  );

  app.get("/api/auth/logout", (req, res) => {
    req.logout(() => {
      res.redirect("/");
    });
  });

  // Auth status route
  app.get("/api/auth/status", (req, res) => {
    console.log("Auth status check - isAuthenticated:", req.isAuthenticated());
    console.log("Session user:", req.user);
    if (req.isAuthenticated()) {
      res.json({ isAuthenticated: true, user: req.user });
    } else {
      res.json({ isAuthenticated: false });
    }
  });
  
  // Demo login route (for testing without Twitter API keys)
  app.get("/api/auth/demo-login", async (req, res) => {
    try {
      // Create a demo user if it doesn't exist
      let demoUser = await storage.getUserByUsername("demouser");
      
      if (!demoUser) {
        demoUser = await storage.createUser({
          username: "demouser",
          password: "demopassword",
          twitterId: "123456789",
          twitterUsername: "demouser",
          displayName: "Usuário Demo",
          profileImageUrl: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
          accessToken: "",
          accessTokenSecret: "",
        });
        
        // Create initial fan score for demo user
        await storage.createFanScore(generateRandomFanScore(demoUser.id));
      }
      
      // Log in the demo user
      req.login(demoUser, (err) => {
        if (err) {
          console.error("Demo login error:", err);
          return res.status(500).json({ error: "Falha no login demo" });
        }
        
        console.log("Demo login successful, redirecting to dashboard");
        return res.redirect("/dashboard");
      });
    } catch (error) {
      console.error("Demo login error:", error);
      res.status(500).json({ error: "Erro no servidor" });
    }
  });

  // Fan score routes
  app.get("/api/fan-score", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const userId = (req.user as any).id;
      const fanScore = await storage.getFanScore(userId);
      
      if (!fanScore) {
        return res.status(404).json({ message: "Fan score not found" });
      }
      
      res.json(fanScore);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Feedback routes
  app.post("/api/feedback", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const userId = (req.user as any).id;
      const feedbackData = insertScoreFeedbackSchema.parse({
        ...req.body,
        userId,
      });
      
      const feedback = await storage.createScoreFeedback(feedbackData);
      res.status(201).json(feedback);
    } catch (error) {
      res.status(400).json({ message: "Invalid feedback data" });
    }
  });

  app.get("/api/feedback", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const userId = (req.user as any).id;
      const feedback = await storage.getScoreFeedbackByUserId(userId);
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
