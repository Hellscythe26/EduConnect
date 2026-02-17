import api from "../api/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import citaService, { gestionarCita } from "../service/citaService";
import ProfilePanel from "./ProfilePanel";
import AgendarCita from "./AgendarCita";
import FormularioResenia from "./FormularioResenia";

const Dashboard = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [vistaActual, setVistaActual] = useState('inicio');
  const [reseniaTarget, setReseniaTarget] = useState(null);
  const [resenias, setResenias] = useState([]);

  const cargarDatos = async () => {
    try {
      const data = await citaService.obtenerTodas();
      setCitas(data);
      const res = await api.get('/resenias');
      setResenias(res.data);
    } catch (error) {
      console.error("Error al traer las citas del servidor", error);
    }
  };


  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');

    if (loggedInUser && loggedInUser !== "undefined" && loggedInUser !== "null") {
      try {
        const parsedUser = JSON.parse(loggedInUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al parsear el usuario:", error);
        localStorage.removeItem('user');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (user) {
      cargarDatos();
    }
  }, [user]);

  if (!user) return <div className="flex justify-center items-center h-screen">Cargando...</div>;

  const formatFecha = (fechaRaw) => {
    if (!fechaRaw) return "Sin fecha";
    const fecha = new Date(fechaRaw);
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(fecha);
  };

  const citasRealizadas = citas.filter(c => c.estado === 'COMPLETADA').length;

  const proximaCitaObejeto = citas
    .filter(c => c.estado === 'ACEPTADA' || c.estado === 'PENDIENTE')
    .sort((a, b) => new Date(a.fechaHoraCita) - new Date(b.fechaHoraCita))[0];

  const proximaCitaTexto = proximaCitaObejeto
    ? formatFecha(proximaCitaObejeto.fechaHoraCita)
    : "Sin citas pendientes";

  const getBadgeColor = (estado) => {
    switch (estado) {
      case 'CONFIRMADA': return 'bg-blue-100 text-blue-700';
      case 'COMPLETADA': return 'bg-green-100 text-green-700';
      case 'PENDIENTE': return 'bg-yellow-100 text-yellow-700';
      case 'CANCELADA': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleAccion = async (id, accion) => {
    try {
      await gestionarCita[accion](id);
      const dataActualizada = await citaService.obtenerTodas();
      setCitas(dataActualizada);
    } catch (error) {
      console.error("Error al ejecutar acción:", error);
      alert("No se pudo realizar la acción");
    }
  };

  const refrescarUsuario = () => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white hidden md:block min-h-screen shadow-xl">
        <div className="p-6 text-2xl font-bold tracking-tight border-b border-indigo-800">
          EduConnect
        </div>

        <nav className="mt-6 px-4 space-y-3">
          {/* Botón Dashboard */}
          <button
            onClick={() => setVistaActual('inicio')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 
            ${vistaActual === 'inicio'
                ? 'bg-white text-indigo-900 shadow-md font-semibold'
                : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span>Dashboard</span>
          </button>

          {/* Botón Mi Perfil */}
          <button
            onClick={() => setVistaActual('perfil')}
            className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 
            ${vistaActual === 'perfil'
                ? 'bg-white text-indigo-900 shadow-md font-semibold'
                : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Mi Perfil</span>
          </button>

          {/* Botón Agendar Cita */}
          {user.rol.toUpperCase() === 'ESTUDIANTE' && (
            <button
              onClick={() => setVistaActual('agendar')}
              className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 
      ${vistaActual === 'agendar'
                  ? 'bg-white text-indigo-900 shadow-md font-semibold'
                  : 'text-indigo-100 hover:bg-indigo-800 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z" />
              </svg>
              <span>Agendar Cita</span>
            </button>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {vistaActual === 'inicio' && (
          <>
            <header className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Bienvenido, {user.nombre}</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full">{user.rol}</span>
                <button
                  onClick={() => { localStorage.clear(); navigate('/login'); }}
                  className="text-sm text-red-500 hover:underline">
                  Cerrar Sesión
                </button>
              </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-indigo-500">
                <h3 className="text-gray-500 text-sm font-medium">Próxima Cita</h3>
                <p className="text-2xl font-bold mt-2">{proximaCitaTexto}</p>
                <p className="text-sm text-indigo-600 font-medium mt-1">
                  {proximaCitaObejeto?.mentor?.nombre}
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-b-4 border-purple-500">
                <h3 className="text-gray-500 text-sm font-medium">Citas Realizadas</h3>
                <p className="text-2xl font-bold mt-2">{citasRealizadas}</p>
              </div>
            </section>

            {/* Tabla de Tutorías */}
            <div className="bg-white rounded-[30px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div className="p-8 pb-4">
                <h2 className="text-xl font-bold text-slate-800">Mis Tutorías</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50">
                      <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Tutor / Estudiante</th>
                      <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Fecha y Hora</th>
                      <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Estado</th>
                      <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {citas.map((cita) => (
                      <tr key={cita.citaID} className="hover:bg-gray-50/80 transition-colors group">
                        {/* Localiza esta parte dentro de la tabla de Dashboard.jsx */}
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                              {/* 1. Icono dinámico basado en quién debe ver a quién */}
                              {(user.rol === 'Mentor' ? cita.estudiante?.nombre : cita.mentor?.nombre)?.charAt(0)}
                            </div>
                            <div>
                              {/* 2. Nombre dinámico: Si soy Mentor, muestro Estudiante. Si soy Estudiante, muestro Mentor */}
                              <div className="text-sm font-bold text-gray-800">
                                {user.rol === 'Mentor'
                                  ? cita.estudiante?.nombre
                                  : cita.mentor?.nombre}
                              </div>
                              <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                                {user.rol === 'Mentor' ? 'Estudiante' : 'Mentor'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm text-gray-600 font-medium">{formatFecha(cita.fechaHoraCita)}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getBadgeColor(cita.estado)}`}>
                            {cita.estado}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex justify-center gap-2">
                            {/* Acciones para el Mentor */}
                            {user.rol === 'Mentor' && (
                              <>
                                {/* Si está pendiente, puede decidir si tomarla */}
                                {cita.estado === 'PENDIENTE' && (
                                  <>
                                    <button onClick={() => handleAccion(cita.citaID, 'aceptar')} className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs font-bold hover:bg-green-200 transition">Aceptar</button>
                                    <button onClick={() => handleAccion(cita.citaID, 'rechazar')} className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs font-bold hover:bg-red-200 transition">Rechazar</button>
                                  </>
                                )}

                                {/* Si ya está aceptada/confirmada, puede terminarla */}
                                {(cita.estado === 'ACEPTADA' || cita.estado === 'CONFIRMADA') && (
                                  <button
                                    onClick={() => handleAccion(cita.citaID, 'completar')}
                                    className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-xs font-bold hover:bg-indigo-200 transition"
                                  >
                                    Finalizar Tutoría
                                  </button>
                                )}
                              </>
                            )}

                            {/* Acciones para el Estudiante */}
                            {user.rol === 'Estudiante' && cita.estado !== 'COMPLETADA' && cita.estado !== 'CANCELADA' && (
                              <button onClick={() => handleAccion(cita.citaID, 'cancelar')} className="text-gray-400 hover:text-red-500 text-xs font-medium transition">Cancelar cita</button>
                            )}
                            {/* Dentro de la tabla de Dashboard.jsx */}
                            {/* Dentro del map de citas en Dashboard.jsx */}
                            {user.rol === 'Estudiante' && cita.estado === 'COMPLETADA' && (
                              // Verificamos si existe alguna reseña asociada a esta cita
                              !resenias.some(r => r.cita?.citaID === cita.citaID) ? (
                                <button
                                  onClick={() => {
                                    setReseniaTarget(cita);
                                    setVistaActual('resenia');
                                  }}
                                  className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-xs font-bold hover:bg-yellow-200 transition"
                                >
                                  Dejar Reseña
                                </button>
                              ) : (
                                <span className="text-gray-400 text-xs italic font-medium">
                                  Reseña enviada ✅
                                </span>
                              )
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Renderizado de Paneles */}
        {vistaActual === 'perfil' && <ProfilePanel onUpdate={refrescarUsuario} />}
        {vistaActual === 'agendar' && <AgendarCita onSuccess={() => {
          cargarDatos();
          setVistaActual('inicio');
        }} />}
        {vistaActual === 'resenia' && (
          <FormularioResenia
            cita={reseniaTarget}
            onCancel={() => setVistaActual('inicio')}
            onSuccess={() => {
              cargarDatos();
              setVistaActual('inicio');
            }}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;