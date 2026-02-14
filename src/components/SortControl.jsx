import { useState, useRef, useEffect } from 'react';
import HashIcon from '../assets/tag.svg?react';
import AlphaIcon from '../assets/text_format.svg?react';

import "../styles/sortControl.css";

const SortSelect = ({ sortBy, setSortBy }) => {
const [open, setOpen] = useState(false);
const containerRef = useRef(null); // referencia al componente

const displayValue = sortBy === 'id' ? <HashIcon /> : <AlphaIcon />;

const handleChange = (e) => {
    setSortBy(e.target.value);
    setOpen(false);
};

const toggleOpen = () => {
    setOpen(prev => !prev);
};

// Detectar click fuera
useEffect(() => {
    const handleClickOutside = (event) => {
    if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
    ) {
        setOpen(false);
    }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);

return (
    <div ref={containerRef} className="container-sort">
    {/* Botón */}
    <button
        onClick={toggleOpen}
        className="button button-sort"
    >
        {displayValue}
    </button>

    {/* Dropdown */}
    {open && (
        <div
        className='container-options-sort'
        >
        <p>Sort by:</p>

        <div className="options-sort" >
            <label >
                <input
                type="radio"
                name="sort"
                value="id"
                checked={sortBy === 'id'}
                onChange={(e) => handleChange(e)}
                />
                Number
            </label>
            <label >
                <input
                type="radio"
                name="sort"
                value="name"
                checked={sortBy === 'name'}
                onChange={(e) => handleChange(e)}
                />
                Name
            </label>
        </div>


        </div>
    )}
    </div>
);
};

export default SortSelect;
