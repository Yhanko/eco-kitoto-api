ALTER TABLE "areaCritica" RENAME COLUMN "imagem" TO "imagem_1";--> statement-breakpoint
ALTER TABLE "areaCritica" ADD COLUMN "imagem_2" varchar(254);--> statement-breakpoint
ALTER TABLE "areaCritica" ADD COLUMN "imagem_3" varchar(254);