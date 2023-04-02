import { memo, useState } from "react";
import dynamic from "next/dynamic";

import lodash from 'lodash';
// import { AddProductToWishList } from "./AddProductToWishList";

import { AddProductToWishListProps } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(() => {
  return import ('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  },
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent ({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return(
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      {
        isAddingToWishlist &&
        (
          <AddProductToWishList 
            onAddToWishlist={() => onAddToWishlist(product.id)} 
            onRequestClose={() => setIsAddingToWishlist(false)} 
          />
        )
      }
    </div>
  );
};

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
})