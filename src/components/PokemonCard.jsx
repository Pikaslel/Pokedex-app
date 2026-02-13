const PokemonCard = ({ name, id, img, onClick }) => {
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
        <span>{id}</span>
        <img src={img} alt={name} />
        {console.log("img:", img)}
        <h3>{name}</h3>
    </div>
    );
};

export default PokemonCard;
