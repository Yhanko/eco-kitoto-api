enum typeUserEnum {
    administrador = "Administrador",
    administradora = "Administradora",
    voluntario = "Voluntário",
    voluntaria = "Voluntária",
    cidadao = "Cidadão"
}

export class User {
    
    constructor(
        public name : string,
        public email : string,
        public password : string,
        public telephone : string,
        public typeUser : typeUserEnum,
        public districtId : string,
        public iduser? : string
    ) {}

}