import React, { useEffect, useState } from "react";
import { Layout } from "../componentes/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSaleInfo, getSales } from "../redux/actions/actions";
import SheetsSales from "../componentes/Sheets/SheetsSales";
import TabViewSale from "../componentes/Popup/TabViewSale";

const Sales = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const sales = useSelector((state) => state.cart.sales);
  const sale = useSelector((state) => state.cart.saleInfo);

  const toggleModal = (saleInfo) => {
    dispatch(getSaleInfo(saleInfo.id));
    setOpenModal(!openModal);
  };

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  return (
    <Layout isAuth={isAuth}>
      {openModal && (
        <TabViewSale
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          sale={sale}
          infoVentas={sales}
        />
      )}
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Ventas</h1>
      </div>
      <div className="mt-8">
        <SheetsSales data={sales} onViewSale={toggleModal} />
      </div>
    </Layout>
  );
};

export default Sales;
