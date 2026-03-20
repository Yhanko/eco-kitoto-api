import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name : "imagem-evento-limpeza",
    api_key : "minha key",
    api_secret : "minha api secret"
})

export default cloudinary