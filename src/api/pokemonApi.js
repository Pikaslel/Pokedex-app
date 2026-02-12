const BASE_URL = "https://pokeapi.co/api/v2";

export const getPokemons = async () => {
    const response = await fetch(`${BASE_URL}/pokemon?limit=151`);
    const data = await response.json();

    return data.results.sort((a, b) => a.name.localeCompare(b.name));
};

export const getPokemonByName = async (name) => {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`);
    return await response.json();
};

export const getPokemonSpecies = async (name) => {
    const response = await fetch(`${BASE_URL}/pokemon-species/${name}`);
    return await response.json();
};