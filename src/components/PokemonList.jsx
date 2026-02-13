import PokemonCard from "./PokemonCard";
import "../styles/PokemonList.css";
const PokemonList = ({ pokemons, onSelect }) => {
    console.log("PokemonList", pokemons);
    return (
    <div className="pokemon-list">
        {pokemons.map((pokemon) => (
            <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                id={pokemon.id}
                img={pokemon.img}
                onClick={onSelect}
            />
        ))}
    </div>
    );
};

export default PokemonList;
