const StatsBar = ({ stats }) => {
const maxStat = 150; // límite visual (puedes ajustarlo)

return (
    <div style={{ width: "320px"}}>
    {stats.map((stat) => (
        <div
        key={stat.name}
        style={{
            display: "grid",
            gridTemplateColumns: "60px 40px 1fr",
            alignItems: "center",
            marginBottom: "8px",
            gap: "8px",
        }}
        >
        {/* Nombre */}
        <strong style={{ color: "#5dbb2f" }}>
            {stat.name.toUpperCase()}
        </strong>

        {/* Valor */}
        <span>{stat.value.toString().padStart(3, "0")}</span>

        {/* Barra */}
        <div
            style={{
            background: "#e0e0e0",
            height: "8px",
            borderRadius: "6px",
            overflow: "hidden",
            }}
        >
            <div
            style={{
                width: `${(stat.value / maxStat) * 100}%`,
                background: "#5dbb2f",
                height: "100%",
            }}
            />
        </div>
        </div>
    ))}
    </div>
);
};

export default StatsBar;
