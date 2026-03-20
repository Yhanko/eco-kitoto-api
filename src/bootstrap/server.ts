import { app } from "./app"

const API_PORT = process.env.API_PORT ?? 3030

app.listen(API_PORT, () => {
    console.log("Servidor rodando na porta localhost:" + API_PORT)
})