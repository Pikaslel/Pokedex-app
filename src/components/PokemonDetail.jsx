import { useEffect, useState, useContext } from "react";
import { getPokemonByName, getPokemonSpecies } from "../api/pokemonApi";
import { FavoritesContext } from "../context/FavoritesContext";

const PokemonDetail = ({ name, onBack }) => {
    const [pokemon, setPokemon] = useState(null);
    const [generation, setGeneration] = useState("");
    const [loading, setLoading] = useState(true);

    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

    // 🔹 ahora validamos usando el nombre del pokemon cargado
    const favorite = pokemon && isFavorite(pokemon.name);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);

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
        if (!pokemon) return;

        if (favorite) {
            removeFavorite(pokemon.name);
        } else {
            // Guardamos solo la información necesaria para mostrar en favoritos
            addFavorite({
                name: pokemon.name,
                id: pokemon.id,
                types: pokemon.types.map(t => t.type.name),
                img: pokemon.sprites.front_default
            });
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
