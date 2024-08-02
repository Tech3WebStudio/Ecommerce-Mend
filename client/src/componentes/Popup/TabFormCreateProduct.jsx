import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSheetRow,
  updateRow,
  uploadImages,
} from "../../redux/actions/actions";
import Spinner from "../Spinner/Spinner";

const TabFormCreateProduct = ({ isOpen, onClose, product }) => {
  const dispatch = useDispatch();
  const [isUploading, setIsUploading] = useState(false);

  const img = useSelector((state) => state.sheets.images);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    tamaño: "",
    cantidad: "",
    color: "",
    precio: "",
    url: [],
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
        url: product[7] ? [product[7]] : [],
      });
    }
  }, [product]);

  useEffect(() => {
    if (img && img.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        url: [...prevData.url, img[img.length - 1][0]],
      }));
    }
  }, [img]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = {
      categoria: formData.categoria,
      nombre: formData.nombre,
      color: formData.color,
      tamaño: formData.tamaño,
      cantidad: formData.cantidad,
      precio: formData.precio,
      url: formData.url,
    };

    if (product) {
      const updatedRow = {
        id: formData.id,
        categoria: formData.categoria,
        nombre: formData.nombre,
        color: formData.color,
        tamaño: formData.tamaño,
        cantidad: formData.cantidad,
        precio: formData.precio,
        url: formData.url,
      };

      dispatch(updateRow(updatedRow));
    } else {
      dispatch(addSheetRow(newRow));
    }
    onClose();
  };

  const handleImageUpload = async (event) => {
    setIsUploading(true);
    const file = event.target.files[0];

    try {
      const formDataImage = new FormData();
      formDataImage.append("file", file);

      dispatch(uploadImages(formDataImage));
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
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
        <div className="flex justify-center items-center">
          <div className="rounded-sm w-full py-2 px-4">
            <div className="mb-2 flex justify-center items-center gap-1">
              <div className="mt-4 cursor-pointer">
                {formData.url.length > 0 &&
                  formData.url.map((url, index) => (
                    <img
                      onClick={handleImageClick}
                      key={index}
                      src={url}
                      alt="Product"
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                  ))}
                {isUploading && <Spinner />}
              </div>

              <div
                className="border cursor-pointer shadow-lg rounded-md p-4 flex justify-center items-center flex-col gap-2 hover:shadow-sm hover:border-blue-400 hover:text-blue-400"
                onClick={handleImageClick}
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
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                <span>Cargar imagen</span>
                <input
                  type="file"
                  id="imageUploadInput"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple={false}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="nombre">Nombre</label>
          <input
            className="bg-white w-full p-2 text-center mt-2 rounded-md border border-gray-400"
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
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
            placeholder="Categoria"
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
              placeholder="Tamaño"
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
              placeholder="Cantidad"
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
              placeholder="Color"
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
              placeholder="Precio"
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
