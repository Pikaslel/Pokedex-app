const SearchBar = ({ search, setSearch }) => {
return (
    <div style={{ marginBottom: "15px" }}>
    <input
        type="text"
        placeholder="Buscar pokemon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
        padding: "8px",
        width: "220px",
        borderRadius: "8px",
        border: "1px solid #ccc"
        }}
    />
    </div>
);
};

export default SearchBar;
