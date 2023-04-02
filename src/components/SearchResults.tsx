import { List, ListRowRenderer } from 'react-virtualized';

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
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return(
    <div>
      <h2>{results.length} Produtos encontrados</h2>
      <h3>{totalPrice}</h3>

      {/* <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      /> */}
    </div>
  )
}