import '../styles/TypeFilter.css';

const TypeFilter = ({ selectedType, setSelectedType, types }) => {

const handleClick = (type) => {
    setSelectedType(selectedType === type ? "" : type);
};

return (
    <div className="contain-type-filter">
    {types.map((type) => {

        const active = selectedType === type;

        return (
        <button
            key={type}
            onClick={() => handleClick(type)}
            className='type-button'
        >
            {type}
        </button>
        );
    })}
    </div>
);
};

export default TypeFilter;
