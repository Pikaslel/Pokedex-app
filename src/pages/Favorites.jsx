import { useState } from "react";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import PokemonList from "../components/PokemonList";
import PokemonDetail from "../components/PokemonDetail";

const Favorites = () => {
const { favorites } = useContext(FavoritesContext);
const [selectedPokemon, setSelectedPokemon] = useState(null);

// Convertimos names → objetos compatibles con PokemonList
const favoriteObjects = favorites.map(name => ({ name }));

// Función para volver a la lista
const handleBack = () => setSelectedPokemon(null);

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
        {!selectedPokemon && favorites.length === 0 && <p>No tienes favoritos aún</p>}
        <PokemonList
        pokemons={favoriteObjects}
        onSelect={setSelectedPokemon}
        />
    </>
    )}

    </div>
);
};

export default Favorites;
