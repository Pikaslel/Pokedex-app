import PokemonCard from "./PokemonCard";

const PokemonList = ({ pokemons, onSelect }) => {
    return (
    <div>
        {pokemons.map((pokemon) => (
            <PokemonCard
                key={pokemon.name}
                name={pokemon.name}
                onClick={onSelect}
            />
        ))}
    </div>
    );
};

export default PokemonList;
