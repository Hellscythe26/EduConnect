import { useState } from 'react';
import { crearResenia } from '../service/reseniaService';

const FormularioResenia = ({ cita, onCancel, onSuccess }) => {
    const [comentario, setComentario] = useState('');
    const [calificacion, setCalificacion] = useState(5);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const reseniaParaEnviar = {
                comentario: comentario,
                estrellas: parseInt(calificacion),
                cita: { citaID: cita.citaID }, // Relación con la cita
                estudiante: { usuarioID: JSON.parse(localStorage.getItem('user')).id } // Quién la hace
            };
            await crearResenia(reseniaParaEnviar);
            alert("¡Gracias por tu reseña!");
            onSuccess();
        } catch (err) {
            alert("Error al enviar la reseña");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Califica tu tutoría</h2>
            <p className="text-sm text-gray-500 mb-6">Mentor: {cita.mentor?.nombre}</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Calificación (1-5)</label>
                    <input 
                        type="number" min="1" max="5" 
                        value={calificacion}
                        onChange={(e) => setCalificacion(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tu comentario</label>
                    <textarea 
                        required
                        className="w-full p-2 border rounded-lg h-24 outline-none focus:ring-2 focus:ring-indigo-500"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        placeholder="¿Cómo fue tu experiencia?"
                    />
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="flex-1 bg-indigo-600 text-white py-2 rounded-xl font-bold">Enviar</button>
                    <button type="button" onClick={onCancel} className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-xl">Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default FormularioResenia;