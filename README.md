# Documentación del Sistema de Gestión de Call Center (DOV Agent Backend)

## 1. Descripción General

Esta aplicación es una solución integral para la gestión de operaciones de Call Center, diseñada para facilitar la interacción entre Administradores y Agentes. Permite la distribución eficiente de leads, el seguimiento de llamadas y el análisis de rendimiento en tiempo real, integrándose con la telefonía de RingCentral.

---

## 2. Nueva Arquitectura Modular y Seguridad (Actualización V1)

El sistema ha sido refactorizado para mejorar la escalabilidad, el mantenimiento y la seguridad del código.

### Frontend (Modular y Ofuscado)

- **Arquitectura Modular**: El código fuente se encuentra en `public/js/modules/`.
  - `main.js`: Punto de entrada y configuración de seguridad.
  - `auth.js`, `admin.js`, `agent.js`: Lógica separada por funcionalidad.
  - `state.js`, `config.js`, `utils.js`: Gestión de estado y utilidades compartidas.
- **Bundling & Ofuscación**:
  - Se utiliza **Webpack** para empaquetar todos los módulos en un solo archivo: `public/js/dist/bundle.js`.
  - El código es **ofuscado** (vía `webpack-obfuscator`) para proteger la lógica de negocio, haciendo imposible su lectura o ingeniería inversa.
- **Seguridad HTML**:
  - **Minificación de HTML**: El servidor comprime el HTML antes de enviarlo, eliminando espacios y comentarios.
  - **Protección Anti-Inspección**: Scripts que bloquean el clic derecho y atajos de desarrollador (F12, Ctrl+Shift+I).
- **Plantillas EJS**: El antiguo `index.html` ha sido migrado a `views/index.ejs` y dividido en componentes reutilizables (`partials/`).

### Backend (Motor)

- **Tecnología**: Node.js con Express.js.
- **Base de Datos**: MongoDB con optimización para grandes volúmenes de datos (`allowDiskUse`).
- **Seguridad**: Headers HTTP seguros (Helmet), autenticación JWT y limpieza de HTML.
- **Tiempo Real**: Socket.io para actualizaciones instantáneas entre agentes y administradores.

---

## 3. Guía de Desarrollo

### Instalación

```bash
npm install
```

### Ejecutar en Desarrollo

```bash
npm start
```

### Modificar el Frontend

**IMPORTANTE**: No edite `public/js/dist/bundle.js` directamente.

1. Realice cambios en los archivos fuente dentro de `public/js/modules/`.
2. Compile los cambios ejecutando:
   ```bash
   npm run build
   ```
3. Recargue la página para ver los cambios.

---

## 4. Funcionalidades Clave

### Para el Administrador

- **Gestión de Usuarios**: Crear, editar y eliminar cuentas de agentes.
- **Gestión de Leads**: Carga masiva (CSV), asignación inteligente y filtrado avanzado.
- **Dashboard de Analítica**: Métricas en tiempo real y estadísticas de RingCentral.

### Para el Agente

- **Interfaz Unificada**: Todo lo necesario en una sola pantalla.
- **Gestión de Llamadas**: Historial automático, agenda de callbacks y métricas personales.

---

## 5. Integraciones

- **RingCentral API**: Sincronización de datos de telefonía.
- **Socket.io**: Comunicación bidireccional en tiempo real.
