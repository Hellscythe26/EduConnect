import api from '../api/axios';
import { useState, useEffect } from 'react';
import { actualizarPerfil, cambiarPassword, desactivarCuenta } from '../service/usuarioService';

const ProfilePanel = ({ onUpdate }) => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const userId = userStorage?.id;

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await api.get(`/usuarios/${userId}`);
                const u = response.data;
                setDatos({
                    nombre: u.nombre || '',
                    email: u.email || '',
                    foto: u.foto || '',
                    biografia: u.biografia || '',
                    habilidades: u.habilidades || ''
                });
            } catch (error) {
                console.error("Error al cargar datos del usuario", error);
            }
        };
        if (userId) cargarDatos();
    }, [userId]);

    const [datos, setDatos] = useState({
        nombre: userStorage?.nombre || '',
        foto: userStorage?.foto || '',
        biografia: userStorage?.biografia || '',
        habilidades: userStorage?.habilidades || ''
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const actualizado = await actualizarPerfil(userId, datos);
            const userStorage = JSON.parse(localStorage.getItem('user'));
            localStorage.setItem('user', JSON.stringify({
                ...userStorage,
                nombre: actualizado.nombre,
                email: actualizado.email
            }));
            alert("¡Perfil actualizado con éxito!");
            if (onUpdate) {
                onUpdate();
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Error al actualizar";
            alert(msg);
        }
    };

    const [passData, setPassData] = useState({
        passwordActual: '',
        passwordNueva: ''
    });

    const handleChangePass = async (e) => {
        e.preventDefault();
        try {
            await cambiarPassword(userId, passData);
            alert("Contraseña cambiada con éxito.");
            setPassData({ passwordActual: '', passwordNueva: '' });
        } catch (err) {
            console.error("Error completo del servidor:", err.response);
            alert("Error: " + (err.response?.data || "Verifica los datos"));
        }
    };
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Mi Perfil</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-indigo-600">Información Personal</h3>
                <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={datos.nombre || ''}
                                onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                value={datos.email || ''}
                                onChange={(e) => setDatos({ ...datos, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL de Foto de Perfil</label>
                        <input
                            type="text"
                            placeholder="https://ejemplo.com/tu-foto.jpg"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={datos.foto || ''}
                            onChange={(e) => setDatos({ ...datos, foto: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Habilidades (separadas por comas)</label>
                        <input
                            type="text"
                            placeholder="Java, React, Spring Boot..."
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={datos.habilidades || ''}
                            onChange={(e) => setDatos({ ...datos, habilidades: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                        <textarea
                            rows="4"
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                            placeholder="Cuéntanos un poco sobre ti..."
                            value={datos.biografia || ''}
                            onChange={(e) => setDatos({ ...datos, biografia: e.target.value })}
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all transform active:scale-95">
                        Actualizar Mi Información
                    </button>
                </form>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-6 text-purple-600">Cambiar Contraseña</h3>
                <form onSubmit={handleChangePass} className="space-y-4">
                    <input
                        type="password"
                        placeholder="Contraseña Actual"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                        value={passData.passwordActual}
                        onChange={(e) => setPassData({ ...passData, passwordActual: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Nueva Contraseña"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                        value={passData.passwordNueva}
                        onChange={(e) => setPassData({ ...passData, passwordNueva: e.target.value })}
                    />
                    <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors">
                        Actualizar Seguridad
                    </button>
                </form>
            </div>
            <div className="border-t pt-8">
                <button
                    onClick={() => window.confirm("¿Seguro que quieres eliminar tu cuenta?") && desactivarCuenta(userId)}
                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                >
                    Eliminar mi cuenta permanentemente
                </button>
            </div>
        </div>
    );
};

export default ProfilePanel;