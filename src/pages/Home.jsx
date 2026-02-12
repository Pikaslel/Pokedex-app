import { usePokemon } from "../hooks/usePokemon";

const Home = () => {
    const { pokemons, loading, error } = usePokemon();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Pokémon List</h1> 
            <ul>
                {pokemons.map((pokemon) => (
                    <li key={pokemon.name}>{pokemon.name}</li>
                ))}
            </ul>            
        </div>
    );
}

export default Home;