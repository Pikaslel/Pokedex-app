import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName } from "../api/pokemonApi";

export const usePokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const base = await getPokemons();

                // Limitar para rendimiento
                const limited = base.slice(0, 40);

                const enriched = await Promise.all(
                    limited.map(async (p) => {
                        const detail = await getPokemonByName(p.name);

                        return {
                            name: detail.name,
                            id: detail.id,
                            types: detail.types.map(t => t.type.name),
                            img: detail.sprites.front_default
                        };
                    })
                );

                setPokemons(enriched);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { pokemons, loading, error };
};
