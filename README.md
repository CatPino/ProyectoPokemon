Pokémon Discovery & Team Builder

Aplicación fullstack para explorar Pokémon y gestionar un equipo de Favoritos, desarrollada con NestJS en el backend y Next.js en el frontend.
El backend consume la PokeAPI, aplica lógica de negocio y caché, mientras que el frontend se encarga de la interfaz y experiencia de usuario.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Requerimientos Generales

Backend: NestJS (TypeScript)
Frontend: Next.js (App Router, TypeScript)
Estilos: Tailwind CSS
Consumo de API: Axios (backend) y Fetch (frontend)
Control de Versiones: Git (GitHub)

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Instalación de dependencias
El proyecto utiliza npm como gestor de dependencias.
Para instalar las dependencias del backend y frontend se debe ejecutar:

Backend (NestJS):
cd backend_pokemon
npm install

Frontend (Next.js + Tailwind CSS):
cd frontend_pokemon
npm install

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Funcionalidades:

Backend (NestJS)
Servicio que consume la PokeAPI
Endpoint principal:
GET /pokemon/:name

El endpoint retorna un objeto transformado con la siguiente información:
Incluye:
Nombre
ID
Tipos (array de strings)
Imagen oficial (official-artwork)
Hasta 3 habilidades principales

Caché en memoria:
Se implementa una caché simple en memoria utilizando Map
Duración de la caché: 2 minutos
Si un Pokémon se consulta nuevamente dentro de ese tiempo, no se realiza una nueva petición a la PokeAPI
Esto mejora el rendimiento y reduce llamadas innecesarias

Frontend (Next.js)

Home:
Listado inicial de los primeros 20 Pokémon
Uso de componentes reutilizables (PokemonCard)
Barra de búsqueda por nombre
Manejo de Pokémon no encontrado
Opción para volver al listado principal

Detalle:
Al hacer clic en un Pokémon se muestra su detalle
La información se obtiene exclusivamente desde el backend NestJS
Se muestran imagen, tipos y habilidades

Favoritos:
Permite “Capturar” Pokémon
Los favoritos se almacenan en LocalStorage
Persisten al recargar la página
Vista dedicada /favorites para visualizar el equipo capturado

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Ejecución en modo desarrollo:

Backend
cd backend_pokemon
npm run start:dev

Backend disponible en:
http://localhost:3000

Endpoint:
GET /pokemon/:name

Frontend
archivo .env.local en frontend_pokemon:
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000

Luego ejecutar:
cd frontend_pokemon
npm run dev

Frontend disponible en:
http://localhost:3001/home

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Decisiones técnicas tomadas

Se utilizó una arquitectura desacoplada, donde el frontend consume únicamente el backend propio.
El backend en NestJS actúa como intermediario entre el frontend y la PokeAPI, transformando los datos a un formato simple y controlado.
Se implementó una caché en memoria para optimizar rendimiento y evitar llamadas repetidas a la API externa.
Se utilizó Next.js App Router por su manejo moderno de rutas y layouts.
Los favoritos se almacenan en LocalStorage, solución simple y persistente adecuada para un MVP.
Tailwind CSS fue elegido para mantener un diseño limpio, consistente y sin CSS complejo.














