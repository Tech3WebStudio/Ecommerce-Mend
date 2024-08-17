import React from "react";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import { useSelector } from "react-redux";
import Cart from "../../componentes/Ecommerce/Cart/Cart";

const CartPage = () => {
  const products = useSelector((state) => state.cart.cartItems);

  const calculateTotal = () => {
    const total = products.reduce((acc, product) => {
      const price = parseFloat(product.precio);
      const quantity = product.cartQuantity || 1;
      return acc + (isNaN(price) ? 0 : price * quantity);
    }, 0);

    return total.toFixed(2);
  };
  return (
    <div className="w-full">
      <Cart product={products} calcularTotal={calculateTotal} />
    </div>
  );
};

export default CartPage;
