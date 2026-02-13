import "../styles/PokemonCard.css";

const PokemonCard = ({ name, id, img, onClick }) => {
    return (
    <div
        onClick={() => onClick(name)}
        className="pokemon-card"
    >   
        <span>#{id}</span>
        <img src={img} alt={name} />
        <h3>{name}</h3>
    </div>
    );
};

export default PokemonCard;
