import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import Navigation from "../../componentes/Ecommerce/Nav/Navigation";
import Carrousel from "../../componentes/Ecommerce/Carrousel/Carrousel";
import { fetchSheets, fetchUsers } from "../../redux/actions/actions";
import ProdustHome from "../../componentes/Ecommerce/Products/ProdustHome";

const Home = () => {
  const dispatch = useDispatch();
  const sheetsData = useSelector((state) => state.sheets.sheetsData);
  const [refCarrousel, inViewCarrousel] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [refProducts, inViewProducts] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);

  return (
    <div className="w-full">
      <Navigation />
      <div
        ref={refCarrousel}
        className={`transition-transform duration-1000 ${
          inViewCarrousel
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <Carrousel />
      </div>
      <div
        ref={refProducts}
        className={`flex mt-8 w-full justify-center items-center transition-transform duration-1000 ${
          inViewProducts
            ? "translate-y-0 opacity-100"
            : "translate-y-20 opacity-0"
        }`}
      >
        <ProdustHome allProducts={sheetsData} />
      </div>
    </div>
  );
};

export default Home;
