import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../componentes/Layout/Layout";
import DisplayProductDashboard from "../componentes/Products/DisplayProductDashboard";
import { useEffect, useState } from "react";
import { fetchSheets } from "../redux/actions/actions";
import Cart from "../componentes/Cart/Cart";

const Dashboard = () => {
  const [showCart, setShowCart] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const products = useSelector((state) => state.sheets.sheetsData);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => {
      const precio = parseInt(product.precio);
      const quantity = product.cantidad || 1;
      return acc + (isNaN(precio) ? 0 : precio * quantity);
    }, 0);

    return total.toFixed(2);
  };

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);
  return (
    <Layout isAuth={isAuth}>
      {showCart && <Cart product={cartItems} calcularTotal={calculateTotal} onClose={toggleCart} />}
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-300">Dashboard</h1>
        <button
          onClick={() => toggleCart()}
          className="p-2 border border-gray-200 rounded-lg hover:bg-teal-300 hover:text-white shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          {cartItems?.length > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center absolute top-4 right-4">
              {cartItems?.length}
            </span>
          )}
        </button>
      </div>
      <div className="mt-8 lg:px-2 border p-4 w-full">
        <DisplayProductDashboard products={products} />
      </div>
    </Layout>
  );
};

export default Dashboard;
