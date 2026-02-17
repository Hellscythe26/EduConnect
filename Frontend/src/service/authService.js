import api from '../api/axios';

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        const user = {
            id: response.data.usuarioID || response.data.id,
            nombre: response.data.nombre,
            email: response.data.email,
            rol: response.data.rol
        };
        localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
};

export const register = async (userData) => {
    try {
        const response = await api.post('/usuarios', userData); 
        return response.data;
    } catch (error) {
        console.error("Detalle del error 404:", error.response);
        throw error;
    }
};