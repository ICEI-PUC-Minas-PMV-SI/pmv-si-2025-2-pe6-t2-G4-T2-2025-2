import axios from "axios";

export const api = axios.create({
    baseURL: "http://XXX.XXX.X.XXX:3333" // Inserir o IP do seu computador aqui
});
