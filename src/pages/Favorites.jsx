import { useState, useContext, useMemo } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

import PokemonList from "../components/PokemonList";
import PokemonDetail from "../components/PokemonDetail";

import SearchAndSort from "../components/SearchAndSort";
import TypeFilter from "../components/TypeFilter";

import '../styles/global.css';
import PokeballIcon from '../assets/pokeball.svg?react';


const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);

    const [selectedPokemon, setSelectedPokemon] = useState(null);

    // filtros
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [sortBy, setSortBy] = useState("name");

    const types = [
        "fire",
        "water",
        "grass",
        "electric",
        "bug",
        "normal",
        "poison"
    ];

    const handleBack = () => setSelectedPokemon(null);

    // Usarfavorites (local storage o context) para mostrar solo los favoritos
    const processedFavorites = useMemo(() => {
        let result = [...favorites];

        // 🔎 Search
        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // 🔥 Type filter
        if (type) {
            result = result.filter(p =>
                p.types?.includes(type)
            );
        }

        // ↕ Sort
        result.sort((a, b) => {
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }

            if (sortBy === "id") {
                return a.id - b.id;
            }

            return 0;
        });

        return result;
    }, [favorites, search, type, sortBy]);

    return (
        <div className="container-main">
            <div className="title-row">
                <PokeballIcon className="pokeball-icon" />
                <h1>Favoritos</h1>
            </div>

            {selectedPokemon ? (
                <PokemonDetail
                    name={selectedPokemon}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <SearchAndSort
                        search={search}
                        setSearch={setSearch}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                    <TypeFilter
                        selectedType={type}
                        setSelectedType={setType}
                        types={types}
                    />

                    {favorites.length === 0 && (
                        <p>No tienes favoritos aún</p>
                    )}

                    <PokemonList
                        pokemons={processedFavorites}
                        onSelect={setSelectedPokemon}
                    />
                </>
            )}
        </div>
    );
};

export default Favorites;
