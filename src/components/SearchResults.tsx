import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
}

export const SearchResults = ({ results }: SearchResultsProps) => {
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
          />
        );
      })}
    </div>
  )
}