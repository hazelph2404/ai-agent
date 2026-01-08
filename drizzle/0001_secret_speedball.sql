ALTER TABLE "meetings" ALTER COLUMN "started_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meetings" ALTER COLUMN "started_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "meetings" ALTER COLUMN "ended_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "meetings" ALTER COLUMN "ended_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "meetings" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;