import { useEffect, useState, useContext } from "react";
import { getPokemonByName, getPokemonSpecies } from "../api/pokemonApi";
import { FavoritesContext } from "../context/FavoritesContext";
import StatsBar from "../components/StatsBar"; 

import '../styles/PokemonDetail.css';
import ArrowBack from '../assets/arrow_back.svg?react';
import HeartFavorites from '../assets/Heart.svg?react';
import ArrowLeft from '../assets/chevron_left.svg?react';
import ArrowRight from '../assets/chevron_right.svg?react';





const PokemonDetail = ({
    name,
    onBack,
    pokemons,
    setSelectedPokemon
}) => {
    const [pokemon, setPokemon] = useState(null);
    const [generation, setGeneration] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);

    const favorite = pokemon && isFavorite(pokemon.name);

    const currentIndex = pokemons.findIndex(p => p.name === name);

    const isFirst = currentIndex === 0;
    const isLast = currentIndex === pokemons.length - 1;

    const goPrev = () => {
    if (!isFirst) {
        setSelectedPokemon(pokemons[currentIndex - 1].name);
        }
    };

    const goNext = () => {
        if (!isLast) {
            setSelectedPokemon(pokemons[currentIndex + 1].name);
        }
    };


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
        <div className="contain-pokemon-detail">
            <div className="pokemon-detail-header" >
                <button onClick={onBack}><ArrowBack /></button>
                <h1>{pokemon.name}</h1>
                <span>#{pokemon.id}</span>
                <button className="favorites" onClick={handleFavorite}>
                    {favorite ? <HeartFavorites style={{fill: "red"}}/> : <HeartFavorites style={{fill: "white"}}/>}
                </button>
            </div>

            <div className="pokemon-detail-card">
                <div className="pokemon-detail-img">
                
                <button onClick={goPrev} disabled={isFirst}>
                    <ArrowLeft />
                </button>

                
                <div>
                    <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                    />
                    <div className="contain-pokemon-type">
                        {pokemon.types.map(t => (
                            <span key={t.type.name} className="pokemon-type">
                                {t.type.name}
                            </span>
                        ))}
                    </div>
                    
                </div>
                
                <button onClick={goNext} disabled={isLast}>
                    <ArrowRight />
                </button>

            </div>

            <div className="pokemon-detail-content">
                <h2>About</h2>
                <div className="pokemon-detail-content__characteristics">
                    <div >
                        <p>{pokemon.weight}</p>
                        <span>Weight</span>   
                    </div>
                    <div>
                        <p>{pokemon.height}</p>
                        <span>Height</span>
                    </div>
                    <div>
                        {pokemon.abilities.map(a => (
                            <p key={a.ability.name}>
                                {a.ability.name}
                            </p>
                        ))}
                        <span>Moves</span>
                    </div>
                </div>
                <div className="pokemon-detail-content__data">
                    <p>
                        {description}
                    </p>
                    <h3>Base Stats</h3>
                    <StatsBar stats={formattedStats} />
                </div>
            </div>
            </div>

        </div>
    );
};

export default PokemonDetail;
