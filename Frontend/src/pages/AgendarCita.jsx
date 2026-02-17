import { useState, useEffect } from 'react';
import api from '../api/axios';

const AgendarCita = ({ onSuccess }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [mentores, setMentores] = useState([]);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const [nuevaCita, setNuevaCita] = useState({
        mentorId: '',
        fechaHoraCita: ''
    });

    useEffect(() => {
        const obtenerMentores = async () => {
            try {
                const res = await api.get('/usuarios');
                console.log("Datos recibidos de /usuarios:", res.data);
                const listaMentores = res.data.filter(u => {
                    const rolTipo = u.rol?.tipo
                    return rolTipo?.toUpperCase() == 'MENTOR'
                });
                setMentores(listaMentores);
            } catch (err) {
                console.error("Error cargando mentores", err);
            }
        };
        obtenerMentores();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.id) {
            setMensaje({ tipo: 'error', texto: "Sesión inválida. Reintenta el login." });
            return;
        }
        const fechaFormateada = nuevaCita.fechaHoraCita.includes(':') && nuevaCita.fechaHoraCita.split(':').length === 2
            ? `${nuevaCita.fechaHoraCita}:00`
            : nuevaCita.fechaHoraCita;
        try {
            const citaParaEnviar = {
                fechaHoraCita: fechaFormateada,
                estudiante: {
                    usuarioID: user.id
                },
                mentor: {
                    usuarioID: parseInt(nuevaCita.mentorId)
                },
                estado: 'PENDIENTE'
            };

            await api.post('/citas', citaParaEnviar);
            setMensaje({ tipo: 'success', texto: '¡Cita agendada con éxito!' });
            setNuevaCita({ mentorId: '', fechaHoraCita: '' });
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1500);
            }
        } catch (err) {
        }
    };
    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Agendar nueva asesoría</h2>
            {mensaje.texto && (
                <div className={`p-4 mb-4 rounded-lg ${mensaje.tipo === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {mensaje.texto}
                </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selecciona tu Mentor</label>
                    <select
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={nuevaCita.mentorId}
                        onChange={(e) => setNuevaCita({ ...nuevaCita, mentorId: e.target.value })}
                    >
                        <option value="">Elegir mentor...</option>
                        {mentores.map(m => (
                            <option key={m.usuarioID} value={m.usuarioID}>
                                {m.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                    <input
                        type="datetime-local"
                        required
                        className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={nuevaCita.fechaHoraCita}
                        onChange={(e) => setNuevaCita({ ...nuevaCita, fechaHoraCita: e.target.value })}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    Confirmar Cita
                </button>
            </form>
        </div>
    );
};

export default AgendarCita;