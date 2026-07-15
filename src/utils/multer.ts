import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
    files : 3 //limita o envio de 3 arquivos no maximo por requisição
  },
});