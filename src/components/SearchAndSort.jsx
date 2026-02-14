import SearchBar from './SearchBar';
import SortFilter from './SortControl';

import '../styles/SearchAndSort.css';

const SearchAndSort = ({ search, setSearch, sortBy, setSortBy }) => {
return (
    <div className='container-search-sort'>
        <SearchBar search={search} setSearch={setSearch} />
        <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
    </div>
);
};

export default SearchAndSort;
