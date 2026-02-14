import SearchIcon from '../assets/search.svg?react';
import '../styles/global.css';

import '../styles/SearchBar.css';
const SearchBar = ({ search, setSearch }) => {
return (
    <div className="container-search">
    <SearchIcon className="search-icon" />
    <input
        name='search'
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    </div>
);
};

export default SearchBar;
