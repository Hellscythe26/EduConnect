import api from "../api/axios";

const obtenerTodas = async () => {
    try {
        const response = await api.get('/citas');
        return response.data;
    } catch (error) {
        console.error("Error en el servicio de citas", error);
        throw error;
    }
};

const citaService = {
    obtenerTodas
};

export const gestionarCita = {
    aceptar: (id) => api.patch(`/citas/${id}/aceptar`),
    rechazar: (id) => api.patch(`/citas/${id}/rechazar`),
    completar: (id) => api.patch(`/citas/${id}/completar`),
    cancelar: (id) => api.patch(`/citas/${id}/cancelar`),
};

export default citaService;