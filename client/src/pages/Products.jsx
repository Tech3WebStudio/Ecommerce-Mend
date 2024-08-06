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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [visiblePages, setVisiblePages] = useState([1, 2, 3, 4]);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.sheets.sheetsData);

  useEffect(() => {
    dispatch(fetchSheets());
  }, [dispatch]);

  const toggleModal = (product) => {
    setSelectedProduct(product);
    setActiveForm(!activeForm);
  };

  const toggleDeleteModal = (index) => {
    setDeleteRowIndex(index);
  };

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    updateVisiblePages(pageNumber);
  };

  const updateVisiblePages = (pageNumber) => {
    let startPage, endPage;
    if (totalPages <= 4) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (pageNumber <= 2) {
        startPage = 1;
        endPage = 4;
      } else if (pageNumber >= totalPages - 1) {
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        startPage = pageNumber - 1;
        endPage = pageNumber + 2;
      }
    }
    setVisiblePages([...Array(endPage - startPage + 1).keys()].map(i => startPage + i));
  };

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [totalPages]);

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
          className="p-2 border border-secondary bg-secondary text-white rounded-md hover:bg-primary hover:text-white active:translate-y-[2px] shadow-sm hover:shadow-md"
        >
          Crear nuevo producto
        </button>
      </div>
      <div className="mt-8 h-screen">
        <SheetsData
          data={currentItems}
          toggleModal={toggleModal}
          toggleDeleteModal={toggleDeleteModal}
        />
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
          >
            Anterior
          </button>
          {visiblePages.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-4 py-2 mx-1 border border-gray-400 rounded-md ${currentPage === number ? 'bg-primary text-white' : 'bg-white'}`}
            >
              {number}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-1 bg-pink-400 text-white border border-gray-400 rounded-md disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
