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

    const addFavorite = (pokemon) => {
        const exists = favorites.find(f => f.name === pokemon.name);

        if (!exists) {
            setFavorites([...favorites, pokemon]);
        }
    };

    const removeFavorite = (name) => {
        setFavorites(favorites.filter(f => f.name !== name));
    };

    const isFavorite = (name) => {
        return favorites.some(f => f.name === name);
    };


    return (
        <FavoritesContext.Provider
        value={{ favorites, addFavorite, removeFavorite, isFavorite }}
        >
        {children}
        </FavoritesContext.Provider>
    );
};
