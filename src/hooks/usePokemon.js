import { useEffect, useState } from "react";
import { getPokemons, getPokemonByName } from "../api/pokemonApi";

const CACHE_KEY = "pokemon_cache_v1";

export const usePokemon = () => {
    const [pokemons, setPokemons] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const PER_PAGE = 40;

    useEffect(() => {
        const load = async () => {

            // 1 — Revisar cache
            const cached = localStorage.getItem(CACHE_KEY);

            if (cached) {
                setPokemons(JSON.parse(cached));
                setLoading(false);
                return;
            }

            // 2 — Traer API solo una vez
            const base = await getPokemons();

            const enriched = await Promise.all(
                base.map(async (p) => {
                    const detail = await getPokemonByName(p.name);

                    return {
                        name: detail.name,
                        id: detail.id,
                        types: detail.types.map(t => t.type.name),
                        img: detail.sprites.front_default
                    };
                })
            );

            // Guardar cache
            localStorage.setItem(CACHE_KEY, JSON.stringify(enriched));

            setPokemons(enriched);
            setLoading(false);
        };

        load();
    }, []);


    return { pokemons, loading, error: null };
};
