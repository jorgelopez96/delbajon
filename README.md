# Del Bajón - Menú Online

Proyecto de menú online con panel admin para hamburguerías.
Stack: React + Vite + Tailwind CSS + Supabase

---

## Setup inicial

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
El archivo `.env` ya tiene las claves de Supabase para Del Bajón.
Para un nuevo cliente, editá `.env`:
```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

### 3. Crear tablas en Supabase
- Entrá a tu proyecto en supabase.com
- Andá a **SQL Editor**
- Pegá y ejecutá el contenido de `supabase_setup.sql`

### 4. Crear usuario admin
- En Supabase andá a **Authentication > Users > Add user**
- Creá el usuario con email y contraseña
- Ese usuario va a poder acceder a `/admin`

### 5. Correr en desarrollo
```bash
npm run dev
```

---

## Configuración por cliente

Todo lo que cambia por cliente está en `src/config/store.js`:
- Nombre del local, tagline
- Número de WhatsApp
- Dirección y link de Maps
- Instagram
- Horarios
- CBU y alias para transferencias
- Colores del tema

---

## Deploy en Vercel

1. Subí el proyecto a GitHub
2. Importá el repo en vercel.com
3. En **Environment Variables** agregá:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy automático

Para dominio custom: en Vercel > Settings > Domains

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Menú con buscador |
| `/como-pedir` | Instrucciones paso a paso |
| `/carrito` | Carrito y checkout por WhatsApp |
| `/contacto` | Dirección, teléfono, horarios |
| `/admin` | Panel de administración |

---

## Agregar nuevo cliente

1. Crear nuevo proyecto en Supabase
2. Ejecutar `supabase_setup.sql`
3. Copiar este repo y actualizar `.env` y `src/config/store.js`
4. Nuevo deploy en Vercel con dominio del cliente
