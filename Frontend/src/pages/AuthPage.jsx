import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../service/authService.js';

const AuthPage = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Credenciales incorrectas. Intenta de nuevo.');
            console.error(err);
        }
    };

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        rol: { rolId: 1 }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rol") {
            setFormData({
                ...formData,
                rol: { rolId: parseInt(value) }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            alert("Usuario creado con éxito");
            setIsRightPanelActive(false);
        } catch (err) {
            setError('Error al crear la cuenta. Intenta de nuevo.');
            console.error(err);
        }
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-100 font-sans">
            <div className={`relative overflow-hidden bg-white rounded-[30px] shadow-2xl w-[768px] max-w-full min-h-[480px] transition-all`}>
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 opacity-0 z-[1] 
          ${isRightPanelActive ? "translate-x-full opacity-100 z-[5] animate-show" : ""}`}>
                    <form onSubmit={handleRegister} className="flex flex-col items-center justify-center h-full px-12 text-center bg-white">
                        <h1 className="mb-4 text-3xl font-bold">Crear Cuenta</h1>
                        <input
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            type="text"
                            placeholder="Nombre"
                            className="w-full p-3 my-2 text-sm bg-gray-100 border-none rounded-lg focus:outline-none"
                            required
                        />
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            className="w-full p-3 my-2 text-sm bg-gray-100 border-none rounded-lg focus:outline-none"
                            required
                        />
                        <input
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Contraseña"
                            className="w-full p-3 my-2 text-sm bg-gray-100 border-none rounded-lg focus:outline-none"
                            required
                        />
                        <div className="mb-4 w-full">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Tipo de Usuario
                            </label>
                            <select
                                name="rol"
                                value={formData.rol.rolID}
                                onChange={handleChange}
                                className="w-full bg-white border border-gray-300 py-3 px-4 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="2">Mentor</option>
                                <option value="3">Estudiante</option>
                            </select>
                        </div>
                        <button type="submit" className="px-11 py-3 mt-4 text-[12px] font-bold tracking-widest text-white uppercase transition-transform duration-75 ease-in bg-indigo-600 rounded-lg active:scale-95">
                            Registrarse
                        </button>
                    </form>
                </div>
                <div className={`absolute top-0 h-full transition-all duration-700 ease-in-out left-0 w-1/2 z-[2] 
          ${isRightPanelActive ? "translate-x-full" : ""}`}>
                    <form onSubmit={handleLogin} className="flex flex-col items-center justify-center h-full px-12 text-center bg-white">
                        <h1 className="mb-4 text-3xl font-bold">Iniciar Sesión</h1>
                        {error && <p className='text-red-500 text-xs'>{error}</p>}
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 my-2 text-sm bg-gray-100 border-none rounded-lg focus:outline-none" required />
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 my-2 text-sm bg-gray-100 border-none rounded-lg focus:outline-none" required />
                        <button type="submit" className="px-11 py-3 text-[12px] font-bold tracking-widest text-white uppercase 
                            transition-transform duration-75 ease-in bg-indigo-600 rounded-lg active:scale-95">
                            Entrar
                        </button>
                    </form>
                </div>
                <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-[100] 
                                ${isRightPanelActive ? "-translate-x-full" : ""}`}>
                    <div className={`relative h-full text-white transition-transform duration-700 ease-in-out bg-gradient-to-br from-[#6366f1] 
                        to-[#a855f7] left-[-100%] w-[200%] ${isRightPanelActive ? "translate-x-1/2" : "translate-x-0"}`}>
                        <div className="flex h-full">
                            <div className={`absolute flex flex-col items-center justify-center w-1/2 h-full px-10 text-center 
                                transition-transform duration-700 ease-in-out ${isRightPanelActive ? "translate-x-0" : "-translate-x-[20%]"}`}>
                                <h1 className="text-3xl font-bold">¡Bienvenido!</h1>
                                <p className="my-6 text-sm leading-relaxed">Para mantenerte conectado con nosotros,
                                    inicia sesión con tus datos personales</p>
                                <button
                                    onClick={() => setIsRightPanelActive(false)}
                                    className="px-10 py-2 text-[12px] font-bold tracking-widest uppercase bg-transparent border 
                                        border-white rounded-lg active:scale-95 hover:bg-white hover:text-indigo-600 transition-all"
                                >
                                    Ir al Login
                                </button>
                            </div>
                            <div className={`absolute right-0 flex flex-col items-center justify-center w-1/2 h-full px-10 text-center 
                                transition-transform duration-700 ease-in-out ${isRightPanelActive ? "translate-x-[20%]" : "translate-x-0"}`}>
                                <h1 className="text-3xl font-bold">¡Hola, Amigo!</h1>
                                <p className="my-6 text-sm leading-relaxed">Regístrate con tus datos personales
                                    y comienza tu viaje con nosotros</p>
                                <button
                                    onClick={() => setIsRightPanelActive(true)}
                                    className="px-10 py-2 text-[12px] font-bold tracking-widest uppercase bg-transparent border 
                                        border-white rounded-lg active:scale-95 hover:bg-white hover:text-indigo-600 transition-all"
                                >
                                    Crear Cuenta
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;