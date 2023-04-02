import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>,
  onAddToWishlist: (id: number) => void;
}

export const SearchResults = ({ results, onAddToWishlist }: SearchResultsProps) => {
  const totalPrice = useMemo(() => {
    return results.reduce((total, product) => {
      return total + product.price;
    }, 0)
  }, [results]);
  
  return(
    <div>
      <h2>{results.length} Produtos encontrados</h2>
      <h3>{totalPrice}</h3>
      {results.map(product => {
        return(
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        );
      })}
    </div>
  )
}