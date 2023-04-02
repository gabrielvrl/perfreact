import { useMemo } from 'react';
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  totalPrice: number;
  onAddToWishlist: (id: number) => void;
}

export const SearchResults = ({ results, totalPrice, onAddToWishlist }: SearchResultsProps) => {
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