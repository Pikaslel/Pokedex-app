import { useEffect, useState, useContext } from "react";
import { getPokemonByName, getPokemonSpecies } from "../api/pokemonApi";
import { FavoritesContext } from "../context/FavoritesContext";
import StatsBar from "../components/StatsBar"; 

const PokemonDetail = ({ name, onBack }) => {
    const [pokemon, setPokemon] = useState(null);
    const [generation, setGeneration] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

    const favorite = pokemon && isFavorite(pokemon.name);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                setLoading(true);

                const data = await getPokemonByName(name);
                const species = await getPokemonSpecies(name);

                setPokemon(data);
                setGeneration(species.generation.name);

                const entry = species.flavor_text_entries.find(
                    e => e.language.name === "en"
                );

                if (entry) {
                    const cleaned = entry.flavor_text
                        .replace(/\f/g, " ")
                        .replace(/\n/g, " ");

                    setDescription(cleaned);
                }

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

    // Transformación de stats para StatsBar
    const formattedStats = pokemon.stats.map(stat => ({
        name: stat.stat.name
            .replace("special-attack", "satk")
            .replace("special-defense", "sdef")
            .replace("attack", "atk")
            .replace("defense", "def")
            .replace("speed", "spd")
            .replace("hp", "hp")
            .toUpperCase(),
        value: stat.base_stat
    }));

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

            <p>
                <strong>Descripción:</strong> {description}
            </p>

            <p><strong>Altura:</strong> {pokemon.height}</p>
            <p><strong>Peso:</strong> {pokemon.weight}</p>

            <p>
                <strong>Tipos:</strong>{" "}
                {pokemon.types.map(t => t.type.name).join(", ")}
            </p>

            <p><strong>Generación:</strong> {generation}</p>

            {/* ⭐ Stats con barra visual */}
            <h3>Stats</h3>
            <StatsBar stats={formattedStats} />

        </div>
    );
};

export default PokemonDetail;
