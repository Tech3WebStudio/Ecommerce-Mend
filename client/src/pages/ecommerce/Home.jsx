// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import Carrousel from "../../componentes/Ecommerce/Carrousel/Carrousel";
import { useEffect } from "react";
import { fetchSheets } from "../../redux/actions/actions";
import ProdustHome from "../../componentes/Ecommerce/Products/ProdustHome";

const Home = () => {
  const dispatch = useDispatch();
  const sheetsData = useSelector((state) => state.sheets.sheetsData);

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Navigation />
      <Carrousel/>
      <div className="flex mt-8 w-full justify-center items-center">
        <ProdustHome allProducts={sheetsData} />
      </div>
    </div>
  );
};

export default Home;
