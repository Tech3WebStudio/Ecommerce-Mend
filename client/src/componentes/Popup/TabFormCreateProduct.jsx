import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSheetRow, updateRow } from "../../redux/actions/actions";

const TabFormCreateProduct = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    tamaño: "",
    cantidad: "",
    color: "",
    precio: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id: product[0] || "",
        categoria: product[1] || "",
        nombre: product[2] || "",
        color: product[3] || "",
        tamaño: product[4] || "",
        cantidad: product[5] || "",
        precio: product[6] || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = [
      formData.categoria,
      formData.nombre,
      formData.color,
      formData.tamaño,
      formData.cantidad,
      formData.precio,
    ];
    if (product) {
      const updatedRow = [
        formData.id,
        formData.categoria,
        formData.nombre,
        formData.color,
        formData.tamaño,
        formData.cantidad,
        formData.precio,
      ];
      dispatch(updateRow(updatedRow));
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    } else {
      dispatch(addSheetRow(newRow));
      setTimeout(() => {
        window.location.reload()
      }, 2000);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        className="bg-white h-auto text-center shadow-md p-6 rounded-xl w-1/3 m-2 flex flex-col"
        onSubmit={handleSubmit}
      >
        <button
          onClick={onClose}
          className="text-gray-400 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <div className="mt-2">
          <label htmlFor="nombre">Nombre</label>
          <input
            className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div className="mt-2">
          <label htmlFor="categoria">Categoría</label>
          <input
            className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder=""
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="mt-2 w-1/2">
            <label htmlFor="tamaño">Tamaño</label>
            <input
              className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
              type="text"
              id="tamaño"
              name="tamaño"
              value={formData.tamaño}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          <div className="mt-2 w-1/2">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
              type="text"
              id="cantidad"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              placeholder=""
            />
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="mt-2 w-1/2">
            <label htmlFor="color">Color</label>
            <input
              className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder=""
            />
          </div>
          <div className="mt-2 w-1/2">
            <label htmlFor="precio">Precio</label>
            <input
              className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
              type="text"
              id="precio"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
              placeholder=""
            />
          </div>
        </div>
        <button
          type="submit"
          className="p-4 shadow-lg bg-blue-300 text-gray-500 rounded-md text-center border mt-2 hover:bg-blue-500 hover:text-white active:translate-y-1 active:bg-blue-500 w-full"
        >
          {product ? "Editar" : "Crear"} producto
        </button>
      </form>
    </div>
  );
};

export default TabFormCreateProduct;
