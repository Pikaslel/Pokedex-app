import { useState } from "react";
import { usePokemon } from "../hooks/usePokemon";

import PokemonList from "../components/PokemonList";
import PokemonDetail from "../components/PokemonDetail";

const Home = () => {
    const { pokemons, loading, error } = usePokemon();
    const [selectedPokemon, setSelectedPokemon] = useState(null);


    const handleSelect = (name) => {
        setSelectedPokemon(name);
    };

    const handleBack = () => {
        setSelectedPokemon(null);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Pokédex</h1>
            {selectedPokemon ? (
                <PokemonDetail
                    name={selectedPokemon}
                    onBack={handleBack}
                />
            ) : (
                <PokemonList
                pokemons={pokemons}
                onSelect={handleSelect}
                />
            )}
        </div>
    );
};

export default Home;
