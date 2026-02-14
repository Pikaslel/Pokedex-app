import { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";

import PokemonList from "../components/PokemonList";
import PokemonDetail from "../components/PokemonDetail";

import SearchAndSort from "../components/SearchAndSort";
import TypeFilter from "../components/TypeFilter";

import '../styles/global.css';
import PokeballIcon from '../assets/pokeball.svg?react';

const Home = () => {
    const { pokemons, loading, error } = usePokemon();

    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [sortBy, setSortBy] = useState("name");

    // Tipos temporales
    const types = [
        "fire",
        "water",
        "grass",
        "electric",
        "bug",
        "normal",
        "poison",
    ];

    const handleSelect = (name) => {
        setSelectedPokemon(name);
    };

    const handleBack = () => {
        setSelectedPokemon(null);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    // ===============================
    // PROCESAMIENTO DE LISTA
    // ===============================

    // Filtrar por nombre
    let processedPokemons = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filtrar por tipo
    if (type) {
        processedPokemons = processedPokemons.filter((pokemon) =>
        pokemon.types?.includes(type)
        );
    }

    // Ordenar
    processedPokemons = [...processedPokemons].sort((a, b) => {
        if (sortBy === "name") {
        return a.name.localeCompare(b.name);
        }

        if (sortBy === "id") {
        return a.id - b.id;
        }

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

        {/* TYPE FILTER */}
        <TypeFilter
            selectedType={type}
            setSelectedType={setType}
            types={types}
        />

        {/* LIST / DETAIL */}
        {selectedPokemon ? (
            <PokemonDetail
            name={selectedPokemon}
            onBack={handleBack}
            />
        ) : (
            <PokemonList
            pokemons={processedPokemons}
            onSelect={handleSelect}
            />
        )}
        </div>
    );
};

export default Home;
