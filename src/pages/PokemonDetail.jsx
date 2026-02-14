import { useParams, useNavigate, useLocation } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";

import PokemonDetail from "../components/PokemonDetail";
import "../styles/global.css";


const PokemonDetailPage = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { pokemons } = usePokemon();

    // De dónde vino el usuario
    const from = location.state?.from || "/";

    const handleBack = () => {
        navigate(from);
    };

    const setSelectedPokemon = (nextName) => {
        navigate(`/pokemon/${nextName}`, {
        state: { from }
        });
    };

    return (
        <div className="container-main">
            <PokemonDetail
            name={name}
            onBack={handleBack}
            pokemons={pokemons}
            setSelectedPokemon={setSelectedPokemon}
            />
        </div>
    );
};

export default PokemonDetailPage;
