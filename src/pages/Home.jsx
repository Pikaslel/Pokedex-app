import { usePokemon } from "../hooks/usePokemon";
import PokemonList from "../components/PokemonList";

const Home = () => {
    const { pokemons, loading, error } = usePokemon();

    const handleSelect = (name) => {
        console.log("Seleccionado:", name);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <PokemonList pokemons={pokemons} onSelect={handleSelect} />
        </div>
    );
};

export default Home;
