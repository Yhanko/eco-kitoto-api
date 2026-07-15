import { pgEnum, pgTable, uuid, varchar, timestamp, text, date, integer, jsonb } from "drizzle-orm/pg-core";

//enums
export const typeUserEnum = pgEnum("tipo_usuario", ["Administrador", "Administradora", "Voluntário", "Voluntária", "Cidadão"])
export const criticalLevelEnum = pgEnum("nivel_criticidade", ["Baixo", "Médio", "Alto"])
export const criticalStatusEnum = pgEnum("estado_areaCritica", ["Pendente", "Em Limpeza", "Resolvido"])
export const clearEventStatusEnum = pgEnum("estado_limpeza", ["Agendado", "Em Andamento", "Concluído"])
export const participationStatusEnum = pgEnum("estado_participacao", ["Em Espera", "Confirmado", "Concluído"])
export const levelEnum = pgEnum("level_logs", ["INFO", "WARN", "ERROR"])
export const IACategoryEnum = pgEnum("categoria_IA", ["Higiene", "Reciclagem", "Saúde", "Outros"])

// province table
export const provinceTable = pgTable("provincia", {
    idprovince : uuid("id_provincia").defaultRandom().primaryKey(),
    name : varchar("nome", { length : 45 }).notNull(),
});

// municipality table
export const municipalityTable = pgTable("municipio", {
    idmunicipality : uuid("id_municipality").defaultRandom().primaryKey(),
    name : varchar("nome", { length : 45 }).notNull(),
    provinceId : uuid("provinciaId").notNull().references( () => provinceTable.idprovince, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }) 
});

//district table
export const districtTable = pgTable("distrito", {
    id_district : uuid("id_distrito").defaultRandom().primaryKey(),
    name : varchar("nome", { length : 45 }).notNull(),
    municipalityId : uuid("municipioId").notNull().references( () => municipalityTable.idmunicipality, {
        onDelete : "cascade",
        onUpdate : "cascade"
    })
});

//user table
export const userTable = pgTable("usuario", {
    iduser : uuid("id_usuario").defaultRandom().primaryKey(),
    name : varchar("nome", { length : 60 }).notNull(),
    email : varchar("email", { length : 100 }).notNull().unique(),
    password : varchar("senha", { length : 100 }).notNull(),
    telephone : varchar("telefone", { length : 20 }),
    typeUser : typeUserEnum("tipoConta").notNull().default("Cidadão"),
    districtId : uuid("distrito_id").notNull().references( () => districtTable.id_district, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    createdAt : timestamp("dtCadastro").defaultNow()
});

//critical area table
export const criticalAreaTable = pgTable("areaCritica", {
    idcriticalArea : uuid("id_areaCritica").defaultRandom().primaryKey(),
    districtId : uuid("distrito_id").notNull().references( () => districtTable.id_district, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    descrition : text("descricao"),
    coordenaties : text("coordenada"), //GeoJSON
    critical_level : criticalLevelEnum("nivel_criticidade").notNull().default("Baixo"),
    image_1 : varchar("imagem_1", { length : 254 }).notNull(),
    image_2 : varchar("imagem_2", { length : 254 }),
    image_3 : varchar("imagem_3", { length : 254 }),
    estatus : criticalStatusEnum("estado").notNull().default("Pendente"),
    createdAt : timestamp("dtCadastro").defaultNow()
});

// cleaning event table
export const clearEventTable = pgTable("eventoLimpeza", {
    id_event : uuid("id_evento").defaultRandom().primaryKey(),
    title : varchar("titulo", { length : 100 }).notNull(),
    areaId : uuid("id_area").notNull().references( () => criticalAreaTable.idcriticalArea, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    responsibleId : uuid("id_usuario").notNull().references( () => userTable.iduser, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    eventDate : date("data_evento").notNull(),
    eventTime : varchar("hora_evento").notNull(),
    descrition : text("descricao").notNull(),
    max_volunteer : integer("total_voluntario").default(30),
    current_volunteer : integer("voluntarios_atual").default(0),
    meeting_point : varchar("ponto_encontro", { length : 100 }).notNull(),
    estatus :  clearEventStatusEnum("estado").notNull().default("Agendado"),
    createdAt : timestamp("dtcadastro").defaultNow()
});

//material table
    export const materialTable = pgTable("material", {
        id_material : uuid("id_material").defaultRandom().primaryKey(),
        eventId : uuid("id_evento").notNull().references( () => criticalAreaTable.idcriticalArea, {
            onDelete : "cascade",
            onUpdate : "cascade"
        }),
        name : varchar("nome", { length : 100 }).notNull()
    })

//participation table
export const participationTable = pgTable("participacao", {
    id_participation : uuid("id_participacao").defaultRandom().primaryKey(),
    eventId : uuid("id_evento").notNull().references( () => clearEventTable.id_event, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    volunteerId : uuid("id_usuario").notNull().references( () => userTable.iduser, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    pontuation : integer("pontuacao").default(0),
    estatus : participationStatusEnum("estado").notNull().default("Em Espera")
});

//relatory table
export const relatoryTable = pgTable("relatorio", {
    id_relatory : uuid("id_relatorio").defaultRandom().primaryKey(),
    eventId : uuid("id_evento").notNull().references( () => clearEventTable.id_event, {
        onDelete : "cascade",
        onUpdate : "cascade"
    }),
    before_image : varchar("antes", { length : 254 }).notNull(),
    after_image : varchar("depois", { length : 254 }).notNull(),
    observation : text("observacao").notNull(),
    date_send : timestamp("data_envio").defaultNow()
});

// IA comentary
export const comentaryIATable = pgTable("dicaAI", {
    id_comentaryIA : uuid("id_dica").defaultRandom().primaryKey(),
    title : varchar("titulo", { length : 100 }),
    description : text("descricao"),
    category : IACategoryEnum("categoria").notNull().default("Higiene")
})

//auditLogs
export const logsTable = pgTable("logs", {
    id_log : uuid("id_log").defaultRandom().primaryKey(),
    createdAt : timestamp("dtCadastro").defaultNow(),
    level : levelEnum("nivel").notNull().default("INFO"),
    message : text("mensagem").notNull(),
    metadata : jsonb("metadata").notNull()
})