import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../componentes/Layout/Layout";
import DisplayProductDashboard from "../componentes/Products/DisplayProductDashboard";
import { useEffect } from "react";
import { fetchSheets } from "../redux/actions/actions";

const Dashboard = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const products = useSelector((state) => state.sheets.sheetsData);
  const filterProducts = useSelector((state) => state.sheets.filterProducts);

  const dispatch = useDispatch();
 

  

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);
  
  return (
    <Layout isAuth={isAuth}>
      {/* {showCart && <Cart product={cartItems} calcularTotal={calculateTotal} onClose={toggleCart} />} */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-pink-100">Dashboard</h1>
      </div>
      <div className="mt-8 w-full">
        <DisplayProductDashboard products={products} />
      </div>
    </Layout>
  );
};

export default Dashboard;
