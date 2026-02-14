import '../styles/PokemonDetail.css';

const StatsBar = ({ stats }) => {
const maxStat = 150; // límite visual (puedes ajustarlo)

return (
    <div style={{ width: "320px"}}>
    {stats.map((stat) => (
        <div
        className='container-bar-stats'
        key={stat.name}
        >
        {/* Nombre */}
        <p >
            {stat.name.toUpperCase()}
        </p>

        {/* Valor */}
        <span>{stat.value.toString().padStart(3, "0")}</span>

        {/* Barra */}
        <div
            className='bar-stat-background'
        >
            <div
            className='bar-stat-fill'
            style={{
                width: `${(stat.value / maxStat) * 100}%`,
            }}
            />
        </div>
        </div>
    ))}
    </div>
);
};

export default StatsBar;
