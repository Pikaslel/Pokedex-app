import React, { useState } from 'react';

const SortSelect = ({ sortBy, setSortBy }) => {
const [open, setOpen] = useState(false); // controla si el div está visible

const displayValue = sortBy === 'id' ? '#' : 'A̱';

const handleChange = (e) => {
    setSortBy(e.target.value);
    setOpen(false); // cierra el div después de seleccionar
};

const toggleOpen = () => {
    setOpen(!open);
};

return (
    <div style={{ display: 'inline-block', fontFamily: 'sans-serif', position: 'relative', marginBottom: '15px' }}>
    {/* Botón principal */}
    <button
        onClick={toggleOpen}
        style={{
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        cursor: 'pointer',
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        }}
    >
        {displayValue}
    </button>

    {/* Contenedor que se muestra/oculta */}
    {open && (
        <div
        style={{
            position: 'absolute',
            top: '40px', // separa del botón
            left: 0,
            padding: '12px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            zIndex: 10,
        }}
        >
        <p style={{ margin: '0 0 8px 0' }}>Sort by:</p>
        <select
            value={sortBy}
            onChange={handleChange}
            style={{
            padding: '6px 10px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            cursor: 'pointer',
            }}
        >
            <option value="id">Number</option>
            <option value="name">Name</option>
        </select>
        </div>
    )}
    </div>
);
};

export default SortSelect;
