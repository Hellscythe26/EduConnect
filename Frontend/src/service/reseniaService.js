import api from "../api/axios";

export const crearResenia = async (resenia) => {
    try {
        const response = await api.post('/resenias', resenia);
        return response.data;
    } catch (error) {
        console.error("Error al guardar la reseña", error);
        throw error;
    }
};