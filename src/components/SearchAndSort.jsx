import SearchBar from './SearchBar';
import SortFilter from './SortControl';

const SearchAndSort = ({ search, setSearch, sortBy, setSortBy }) => {
return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <SearchBar search={search} setSearch={setSearch} />
    <SortFilter sortBy={sortBy} setSortBy={setSortBy} />
    </div>
);
};

export default SearchAndSort;
