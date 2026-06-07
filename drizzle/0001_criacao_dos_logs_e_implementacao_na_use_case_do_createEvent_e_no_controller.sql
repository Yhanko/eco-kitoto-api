CREATE TYPE "public"."level_logs" AS ENUM('INFO', 'WARN', 'ERROR');--> statement-breakpoint
CREATE TABLE "logs" (
	"id_log" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"dtCadastro" timestamp DEFAULT now(),
	"nivel" "level_logs" DEFAULT 'INFO' NOT NULL,
	"mensagem" text NOT NULL,
	"metadata" jsonb NOT NULL
);
