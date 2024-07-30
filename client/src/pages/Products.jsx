import React, { useEffect, useState } from "react";
import { Layout } from "../componentes/Layout/Layout";
import SheetsData from "../componentes/Sheets/SheetsData";
import TabFormCreateProduct from "../componentes/Popup/TabFormCreateProduct";
import TabDeleteRowButton from "../componentes/Popup/TabDeleteRowButton"; // Importar TabDeleteRowButton
import { useDispatch, useSelector } from "react-redux";
import { fetchSheets } from "../redux/actions/actions";

const Products = () => {
  const [activeForm, setActiveForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.sheets.sheetsData);

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);

  const toggleModal = (product = null) => {
    setSelectedProduct(product);
    setActiveForm(!activeForm);
  };

  const toggleDeleteModal = (index = null) => {
    setDeleteRowIndex(index);
  };

  return (
    <Layout isAuth={isAuth}>
      {activeForm && (
        <TabFormCreateProduct
          isOpen={activeForm}
          onClose={toggleModal}
          product={selectedProduct}
        />
      )}
      {deleteRowIndex !== null && (
        <TabDeleteRowButton
          rowIndex={deleteRowIndex}
          onClose={() => toggleDeleteModal(null)}
        />
      )}
      <div className="flex justify-between">
        <h1 className="text-xl text-gray-500">Products</h1>
        <button
          onClick={() => toggleModal()}
          className="p-2 border border-gray-200 rounded-md hover:bg-teal-300 hover:text-white active:translate-y-[2px] shadow-sm hover:shadow-md"
        >
          Crear nuevo producto
        </button>
      </div>
      <div className="mt-8">
        <SheetsData
          data={data}
          toggleModal={toggleModal}
          toggleDeleteModal={toggleDeleteModal}
        />{" "}
        {/* Pasar la nueva función */}
      </div>
    </Layout>
  );
};

export default Products;
