# 🎓 EduConnect | Sistema de Mentorías Académicas

**EduConnect** es una solución Full-Stack diseñada para conectar estudiantes con mentores experimentados, optimizando el aprendizaje personalizado mediante una gestión eficiente de tutorías y retroalimentación directa.

## Funcionalidades Clave
* ** Gestión de Citas Inteligente: Agendamiento de tutorías en tiempo real con selección dinámica de mentores y horarios.
* ** Workflow de Estados: Control total sobre el ciclo de vida de la cita:
  * ** Pendiente: Solicitudes nuevas en espera de respuesta.
  * ** Aceptada/Rechazada: Gestión directa por parte del mentor.
  * ** Completada: Cierre de sesión para habilitar la retroalimentación.
* ** Sistema de Reseñas: * Feedback: Los estudiantes pueden calificar la experiencia con estrellas y comentarios.
  * ** Validación: El sistema impide reseñas duplicadas (Error 409) para garantizar la integridad de los datos.
* ** Perfiles Adaptativos: Vistas diferenciadas según el rol del usuario (Mentor o Estudiante), permitiendo gestionar habilidades y biografías.

---

## Stack Tecnológico

### Backend
* **Java 17** con **Spring Boot**
* **Spring Data JPA** para la persistencia
* **MySQL** como base de datos relacional
* **Arquitectura DTO** para optimización de transferencia de datos

### Frontend
* **React 18** (Vite)
* **Tailwind CSS** para un diseño moderno y responsive
* **React Router DOM** para navegación SPA
* **Hooks Personalizados** para lógica desacoplada

---

## Arquitectura del Proyecto

El sistema utiliza una separación clara de responsabilidades:
- **Backend:** Centraliza la lógica de negocio (validación de estados y restricciones de reseñas) exponiendo endpoints REST protegidos.
- **Frontend:** Gestiona el estado de forma modular, con una estructura basada en servicios y componentes reutilizables para una experiencia de usuario fluida.

---

## Instalación y Configuración

### Requisitos previos
* JDK 17+
* Node.js 18+
* MySQL Server

### Pasos para ejecutar
1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/Hellscythe26/EduConnect.git](https://github.com/tu-usuario/EduConnect.git)
