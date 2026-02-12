import { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
});

// Cada vez que favorites cambie, se guarda en localStorage
useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);

const addFavorite = (name) => {
    if (!favorites.includes(name)) {
    setFavorites((prev) => [...prev, name]);
    }
};

const removeFavorite = (name) => {
    setFavorites((prev) => prev.filter((fav) => fav !== name));
};

const isFavorite = (name) => favorites.includes(name);

return (
    <FavoritesContext.Provider
    value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
    {children}
    </FavoritesContext.Provider>
);
};
