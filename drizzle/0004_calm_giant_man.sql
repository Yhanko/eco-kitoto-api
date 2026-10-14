CREATE TABLE "comentario" (
	"id_comentario" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"comentario" text NOT NULL,
	"reacao" integer DEFAULT 0,
	"id_usuario" uuid NOT NULL,
	"id_publicacao" uuid NOT NULL,
	"dtcadastro" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_publicacao_publicacao_id_publicacao_fk" FOREIGN KEY ("id_publicacao") REFERENCES "public"."publicacao"("id_publicacao") ON DELETE cascade ON UPDATE cascade;