import { useState, useContext, useMemo, useEffect } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import { getPokemonByName } from "../api/pokemonApi";

import PokemonList from "../components/PokemonList";
import PokemonDetail from "../components/PokemonDetail";

import SearchBar from "../components/SearchBar";
import TypeFilter from "../components/TypeFilter";
import SortControl from "../components/SortControl";

const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [favoriteData, setFavoriteData] = useState([]);

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

    // Fetch data completa de favoritos
    useEffect(() => {
        const fetchFavorites = async () => {
            if (favorites.length === 0) {
                setFavoriteData([]);
                return;
            }
            console.log("Fetching data for favorites:", favorites);
            const results = await Promise.all(
                favorites.map(fav => getPokemonByName(fav.name))
            );

            setFavoriteData(results);
        };

        fetchFavorites();
    }, [favorites]);

    // Pipeline filtros + sort
    const processedFavorites = useMemo(() => {
        let result = [...favoriteData];

        // Search
        if (search) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Type
        if (type) {
            result = result.filter(p =>
                p.types.some(t => t.type.name === type)
            );
        }

        // Sort
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
    }, [favoriteData, search, type, sortBy]);

    return (
        <div>
            <h1>Favoritos</h1>

            {selectedPokemon ? (
                <PokemonDetail
                    name={selectedPokemon}
                    onBack={handleBack}
                />
            ) : (
                <>
                    <SearchBar search={search} setSearch={setSearch} />
                    <SortControl sortBy={sortBy} setSortBy={setSortBy} />
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
