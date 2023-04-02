import { SearchResults } from '@/components/SearchResults';
import { useCallback, useState } from 'react';

type Results = {
  totalPrice: number;
  data: any[];
}


export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Results>({ totalPrice: 0, data: []});

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(search);

    if(!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map((product: { id: number; price: number; title: string; }) => {
      return {
        id: product.id,
        price: product.price,
        title: product.title,
        priceFormatted: formatter.format(product.price) 
      }
    })

    const totalPrice = data.reduce((total: any, product: { price: any; }) => {
      return total + product.price;
    }, 0)

    setResults({ totalPrice, data: products });
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
        results={results.data} 
        totalPrice={results.totalPrice}
        onAddToWishlist={handleAddToWishlist}
      />
    </div>
  )
}
