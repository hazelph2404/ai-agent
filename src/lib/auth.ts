import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";
const requiredEnvVars = {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    } as const;
    for (const [key, value] of Object.entries(requiredEnvVars)) {
      if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
      }
    }
export const auth = betterAuth({
    emailAndPassword: {
        enabled:true,
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
        schema, 
    }),
    socialProviders: {
        github: { 
            clientId: requiredEnvVars.GITHUB_CLIENT_ID as string,  
            clientSecret: requiredEnvVars.GITHUB_CLIENT_SECRET as string, 
        }, 
        google: { 
            prompt: "select_account", 
            clientId: requiredEnvVars.GOOGLE_CLIENT_ID as string, 
            clientSecret: requiredEnvVars.GOOGLE_CLIENT_SECRET as string, 
        }, 
    }
});

