# 🧭 Pokédex React App

Una Pokédex interactiva construida con React que permite explorar Pokémon, ver sus detalles, filtrarlos y guardarlos como favoritos.

Este proyecto fue desarrollado como práctica de arquitectura Frontend moderna utilizando:

- Routing dinámico
- Manejo de estado
- Consumo de APIs
- Separación por capas

---

## 📸 Features

- 🔎 Búsqueda por nombre
- 🎯 Filtro por tipo
- ↕ Ordenamiento por nombre o ID
- ❤️ Sistema de favoritos persistente
- 📄 Página de detalle independiente
- ⬅➡ Navegación entre Pokémon
- 🔙 Back inteligente según contexto
- 📱 Diseño responsive

---

## 🛠 Tech Stack

- React
- React Router DOM
- JavaScript (ES6+)
- CSS
- Vite

---

## 📦 Estructura del proyecto

```bash
src/
│
├── api/
├── assets/
├── components/
│   ├── Nav
│   ├── PokemonCard
│   ├── PokemonDetail
│   ├── PokemonList
│   ├── SearchAndSort
│   ├── SearchBar
│   ├── SortControl
│   ├── StatsBar
│   └── TypeFilter
│
├── context/
│   └── FavoritesContext
│
├── hooks/
│   └── usePokemon
│
├── pages/
│   ├── Home
│   ├── Favorites
│   └── PokemonDetail
│
└── App.jsx
```

---

## ⚙️ Instalación

```bash
git clone https://github.com/tuusuario/pokedex.git
cd pokedex
npm install
npm run dev
```

---

## 🌐 API utilizada

PokéAPI  
https://pokeapi.co/

---

## ❤️ Favoritos

Los favoritos se almacenan utilizando:

- React Context
- localStorage

Permite:

- Añadir
- Eliminar
- Filtrar
- Navegar desde favoritos

---

## 🔀 Routing

```
/                  → Home
/favorites         → Lista de favoritos
/pokemon/:name     → Detalle del Pokémon
```

Incluye:

- Navegación contextual
- `location.state`
- Prev/Next navigation

---

## 👨‍💻 Autor

Felipe Matiz  
Frontend Developer  
Shopify / React / JS
