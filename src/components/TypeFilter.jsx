const TypeFilter = ({ selectedType, setSelectedType, types }) => {

const handleClick = (type) => {
    setSelectedType(selectedType === type ? "" : type);
};

return (
    <div style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px"
    }}>
    {types.map((type) => {

        const active = selectedType === type;

        return (
        <button
            key={type}
            onClick={() => handleClick(type)}
            style={{
                padding: "6px 14px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                cursor: "pointer",
                background: active ? "#ff1f4b" : "#fff",
                color: active ? "#fff" : "#333",
                fontWeight: "bold"
            }}
        >
            {type}
        </button>
        );
    })}
    </div>
);
};

export default TypeFilter;
