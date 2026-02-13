const SortControl = ({ sortBy, setSortBy }) => {
return (
    <div style={{
    border: "1px solid #ddd",
    padding: "12px",
    borderRadius: "12px",
    marginBottom: "15px"
    }}>

    <strong>Sort by:</strong>

    <div>
        <label>
        <input
            type="radio"
            value="id"
            checked={sortBy === "id"}
            onChange={() => setSortBy("id")}
        />
        Number
        </label>
    </div>

    <div>
        <label>
        <input
            type="radio"
            value="name"
            checked={sortBy === "name"}
            onChange={() => setSortBy("name")}
        />
        Name
        </label>
    </div>

    </div>
);
};

export default SortControl;
