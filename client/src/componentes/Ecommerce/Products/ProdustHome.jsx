import React from "react";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/actions/actions";
import toast from "react-hot-toast";

const ProdustHome = ({ allProducts }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    toast.success("Agregado al carrito");
    dispatch(addToCart(product));
  };

  // const handleAddToFav = (product) => {
  //   const id_product = product.id_product;
  //   const isFavorite = favoriteIds.includes(id_product);
  //   if (!id_user) {
  //     toast.error(t("toast.notLogin"));
  //   } else if ((id_user, isFavorite)) {
  //     toast.success(t("favorites.removed"));
  //     dispatch(removeFromFavorites(product));
  //     dispatch(deleteFavoriteItem(id_product, id_user));
  //   } else {
  //     toast.success(t("favorites.added"));
  //     dispatch(addToFavorites(product));
  //     dispatch(sendFavorites(id_product, id_user));
  //   }
  // };
  return (
    <div className="h-full mb-8">
      <div className="max-w-screen grid grid-cols-1 mb-8 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {allProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.nombre}
            url={product.url}
            sku={product.sku}
            price={product.precio}
            onAddToCart={() => handleAddToCart(product)}
            // onAddToFav={() => handleAddToFav(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProdustHome;
