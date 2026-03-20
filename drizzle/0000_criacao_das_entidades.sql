CREATE TYPE "public"."categoria_IA" AS ENUM('Higiene', 'Reciclagem', 'Saúde', 'Outros');--> statement-breakpoint
CREATE TYPE "public"."estado_limpeza" AS ENUM('Agendado', 'Em Andamento', 'Concluído');--> statement-breakpoint
CREATE TYPE "public"."nivel_criticidade" AS ENUM('Baixo', 'Médio', 'Alto');--> statement-breakpoint
CREATE TYPE "public"."estado_areaCritica" AS ENUM('Pendente', 'Em Limpeza', 'Resolvido');--> statement-breakpoint
CREATE TYPE "public"."estado_participacao" AS ENUM('Em Espera', 'Confirmado', 'Concluído');--> statement-breakpoint
CREATE TYPE "public"."tipo_usuario" AS ENUM('Administrador', 'Administradora', 'Voluntário', 'Voluntária', 'Cidadão');--> statement-breakpoint
CREATE TABLE "eventoLimpeza" (
	"id_evento" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titulo" varchar(100) NOT NULL,
	"id_area" uuid NOT NULL,
	"id_usuario" uuid NOT NULL,
	"data_evento" date NOT NULL,
	"hora_evento" varchar NOT NULL,
	"descricao" text NOT NULL,
	"total_voluntario" integer DEFAULT 30,
	"voluntarios_atual" integer DEFAULT 0,
	"ponto_encontro" varchar(100) NOT NULL,
	"estado" "estado_limpeza" DEFAULT 'Agendado' NOT NULL,
	"dtcadastro" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "dicaAI" (
	"id_dica" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"titulo" varchar(100),
	"descricao" text,
	"categoria" "categoria_IA" DEFAULT 'Higiene' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "areaCritica" (
	"id_areaCritica" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"distrito_id" uuid NOT NULL,
	"descricao" text,
	"coordenada" text,
	"nivel_criticidade" "nivel_criticidade" DEFAULT 'Baixo' NOT NULL,
	"imagem" varchar(254) NOT NULL,
	"estado" "estado_areaCritica" DEFAULT 'Pendente' NOT NULL,
	"dtCadastro" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "distrito" (
	"id_distrito" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(45) NOT NULL,
	"municipioId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "material" (
	"id_material" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_evento" uuid NOT NULL,
	"nome" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "municipio" (
	"id_municipality" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(45) NOT NULL,
	"provinciaId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "participacao" (
	"id_participacao" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_evento" uuid NOT NULL,
	"id_usuario" uuid NOT NULL,
	"pontuacao" integer DEFAULT 0,
	"estado" "estado_participacao" DEFAULT 'Em Espera' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "provincia" (
	"id_provincia" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(45) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "relatorio" (
	"id_relatorio" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_evento" uuid NOT NULL,
	"antes" varchar(254) NOT NULL,
	"depois" varchar(254) NOT NULL,
	"observacao" text NOT NULL,
	"data_envio" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "usuario" (
	"id_usuario" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" varchar(60) NOT NULL,
	"email" varchar(100) NOT NULL,
	"senha" varchar(100) NOT NULL,
	"telefone" varchar(20),
	"tipoConta" "tipo_usuario" DEFAULT 'Cidadão' NOT NULL,
	"distrito_id" uuid NOT NULL,
	"dtCadastro" timestamp DEFAULT now(),
	CONSTRAINT "usuario_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "eventoLimpeza" ADD CONSTRAINT "eventoLimpeza_id_area_areaCritica_id_areaCritica_fk" FOREIGN KEY ("id_area") REFERENCES "public"."areaCritica"("id_areaCritica") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "eventoLimpeza" ADD CONSTRAINT "eventoLimpeza_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "areaCritica" ADD CONSTRAINT "areaCritica_distrito_id_distrito_id_distrito_fk" FOREIGN KEY ("distrito_id") REFERENCES "public"."distrito"("id_distrito") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "distrito" ADD CONSTRAINT "distrito_municipioId_municipio_id_municipality_fk" FOREIGN KEY ("municipioId") REFERENCES "public"."municipio"("id_municipality") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "material" ADD CONSTRAINT "material_id_evento_areaCritica_id_areaCritica_fk" FOREIGN KEY ("id_evento") REFERENCES "public"."areaCritica"("id_areaCritica") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "municipio" ADD CONSTRAINT "municipio_provinciaId_provincia_id_provincia_fk" FOREIGN KEY ("provinciaId") REFERENCES "public"."provincia"("id_provincia") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "participacao" ADD CONSTRAINT "participacao_id_evento_eventoLimpeza_id_evento_fk" FOREIGN KEY ("id_evento") REFERENCES "public"."eventoLimpeza"("id_evento") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "participacao" ADD CONSTRAINT "participacao_id_usuario_usuario_id_usuario_fk" FOREIGN KEY ("id_usuario") REFERENCES "public"."usuario"("id_usuario") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "relatorio" ADD CONSTRAINT "relatorio_id_evento_eventoLimpeza_id_evento_fk" FOREIGN KEY ("id_evento") REFERENCES "public"."eventoLimpeza"("id_evento") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_distrito_id_distrito_id_distrito_fk" FOREIGN KEY ("distrito_id") REFERENCES "public"."distrito"("id_distrito") ON DELETE cascade ON UPDATE cascade;