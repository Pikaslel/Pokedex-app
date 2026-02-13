import PokemonCard from "./PokemonCard";
const PokemonList = ({ pokemons, onSelect }) => {
    console.log("PokemonList", pokemons);
    return (
    <div>
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
