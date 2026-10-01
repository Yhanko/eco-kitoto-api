CREATE TYPE "public"."tipo_publicacao" AS ENUM('Limpeza', 'Conquista', 'Denúncia', 'Dica', 'Evento');--> statement-breakpoint
CREATE TABLE "publicacao" (
	"id_publicacao" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_usuario" uuid NOT NULL,
	"tipo_publicacao" "tipo_publicacao" DEFAULT 'Limpeza' NOT NULL,
	"comentario" text NOT NULL,
	"qtd_voluntario" integer,
	"qtd_lixo" integer,
	"reacao" integer DEFAULT 0,
	"imagem_url" text[] DEFAULT '{}',
	"video_url" text,
	"localicacao" text,
	"dtcadastro" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "publicacao" ADD CONSTRAINT "publicacao_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE cascade ON UPDATE cascade;