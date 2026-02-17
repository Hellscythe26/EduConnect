import api from '../api/axios';

export const actualizarPerfil = async (id, datosUsuario) => {
    const response = await api.put(`/usuarios/${id}`, datosUsuario);
    return response.data;
};

export const cambiarPassword = async (id, passwords) => {
    const response = await api.patch(`/usuarios/${id}/password`, passwords);
    return response.data;
};

export const desactivarCuenta = async (id) => {
    const response = await api.patch(`/usuarios/${id}/eliminar`);
    return response.data;
};