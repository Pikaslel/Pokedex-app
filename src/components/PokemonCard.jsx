const PokemonCard = ({ name, onClick }) => {
    return (
    <div
        onClick={() => onClick(name)}
        style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px",
            cursor: "pointer"
        }}
    >
        <h3>{name}</h3>
    </div>
    );
};

export default PokemonCard;
