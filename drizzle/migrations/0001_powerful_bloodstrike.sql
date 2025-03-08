ALTER TABLE "servers" DROP CONSTRAINT "servers_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "servers" DROP COLUMN "website";--> statement-breakpoint
ALTER TABLE "servers" DROP COLUMN "created_by";