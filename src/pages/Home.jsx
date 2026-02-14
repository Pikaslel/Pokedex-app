import { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";
import { useNavigate } from "react-router-dom";

import PokemonList from "../components/PokemonList";
import SearchAndSort from "../components/SearchAndSort";
import TypeFilter from "../components/TypeFilter";

import "../styles/global.css";
import PokeballIcon from "../assets/pokeball.svg?react";

const Home = () => {
    const { pokemons, loading, error } = usePokemon();
    const navigate = useNavigate();

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

    // Navegación a página de detalle
    const handleSelect = (name) => {
        navigate(`/pokemon/${name}`, {
        state: { from: "/" },
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // ===============================
    // PROCESAMIENTO
    // ===============================

    let processedPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (type) {
        processedPokemons = processedPokemons.filter((pokemon) =>
        pokemon.types?.includes(type)
        );
    }

    processedPokemons = [...processedPokemons].sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "id") return a.id - b.id;
        return 0;
    });

  // ===============================

    return (
        <div className="container-main">
        <div className="title-row">
            <PokeballIcon className="pokeball-icon" />
            <h1>Pokédex</h1>
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

        <PokemonList
            pokemons={processedPokemons}
            onSelect={handleSelect}
        />
        </div>
    );
};

export default Home;
