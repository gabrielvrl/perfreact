import { SearchResults } from '@/components/SearchResults';
import { Inter } from 'next/font/google'
import { useCallback, useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(search);

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    setResults(data);
  }

  const handleAddToWishlist = useCallback(async (id: number) => {
    console.log(id);
  }, [])
  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults 
        results={results} 
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  )
}
