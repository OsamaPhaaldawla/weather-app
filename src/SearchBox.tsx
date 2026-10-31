export default function SearchBox({search, onSearch}) {
    return <div>
        <input value={search} type="text" onChange={(e) => onSearch(e.target.value)} />
    </div>
}