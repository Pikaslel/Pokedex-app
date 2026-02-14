import { useState, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext";

import PokemonList from "../components/PokemonList";
import SearchAndSort from "../components/SearchAndSort";
import TypeFilter from "../components/TypeFilter";

import "../styles/global.css";
import PokeballIcon from "../assets/pokeball.svg?react";

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
    const navigate = useNavigate();

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
        "poison",
    ];

    // Navegar al detalle
    const handleSelect = (name) => {
        navigate(`/pokemon/${name}`, {
        state: { from: "/favorites" },
        });
    };

    // Procesar favoritos
    const processedFavorites = useMemo(() => {
        let result = [...favorites];

        if (search) {
        result = result.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase())
        );
        }

        if (type) {
        result = result.filter((p) =>
            p.types?.includes(type)
        );
        }

        result.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "id") return a.id - b.id;
        return 0;
        });

        return result;
    }, [favorites, search, type, sortBy]);

    return (
        <div className="container-main">
        <div className="title-row">
            <PokeballIcon className="pokeball-icon" />
            <h1>Favorites</h1>
        </div>

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

        {favorites.length === 0 ? (
            <p>You have no favorites yet</p>
        ) : (
            <PokemonList
            pokemons={processedFavorites}
            onSelect={handleSelect}
            />
        )}
        </div>
    );
};

export default Favorites;
