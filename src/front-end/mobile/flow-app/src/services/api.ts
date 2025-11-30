import axios from "axios";

export const api = axios.create({
    baseURL: "http://192.168.0.47:3333" // Inserir o IP do seu computador aqui
});