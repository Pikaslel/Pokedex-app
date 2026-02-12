import { useEffect, useState } from "react";
import { getPokemonByName, getPokemonSpecies } from "../api/pokemonApi";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";


const PokemonDetail = ({ name, onBack }) => {
    const [pokemon, setPokemon] = useState(null);
    const [generation, setGeneration] = useState("");
    const [loading, setLoading] = useState(true);
    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

    const favorite = pokemon && isFavorite(pokemon.name);
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const data = await getPokemonByName(name);
                const species = await getPokemonSpecies(name);

                setPokemon(data);
                setGeneration(species.generation.name);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [name]);

    const handleFavorite = () => {
        if (favorite) {
            removeFavorite(name);
        } else {
            addFavorite(name);
        }
    };


    if (loading) return <p>Cargando detalle...</p>;
    if (!pokemon) return <p>No encontrado</p>;

    return (
        <div>
            <button onClick={onBack}>Volver</button>

            <h2>{pokemon.name}</h2>
            <button onClick={handleFavorite}>
                {favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
            </button>

            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
            />

            <p><strong>Altura:</strong> {pokemon.height}</p>
            <p><strong>Peso:</strong> {pokemon.weight}</p>

            <p>
                <strong>Tipos:</strong>{" "}
                {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>

            <p><strong>Generación:</strong> {generation}</p>
        </div>
    );
};

export default PokemonDetail;
