import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createSale, removeFromCart } from "../../redux/actions/actions";

const Cart = ({ product, calcularTotal, onClose }) => {
  const dispatch = useDispatch();
  const [formaPago, setFormaPago] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");

  const handleFormaPagoChange = (forma) => {
    setFormaPago(forma);
  };

  const handleNombreClienteChange = (e) => {
    setNombreCliente(e.target.value);
  };

  const handleCreateVenta = () => {
    const venta = {
      productos: product.map((prod) => ({
        id: prod.id,
        sku: prod.sku,
        nombre: prod.nombre,
        talle: prod.talle,
        color: prod.color,
        precio: prod.precio,
        cantidad: prod.cantidad,
      })),
      total: calcularTotal(),
      formaPago,
      nombreCliente,
    };
    if (venta.formaPago === "") {
      toast.error("Falta forma de pago");
    } else if (venta.productos.length === 0) {
      toast.error("El carrito está vacío");
    } else if (venta.nombreCliente.trim() === "") {
      toast.error("Falta nombre del cliente");
    } else {
      toast.success("Venta creada exitosamente...");
      dispatch(createSale(venta));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="fixed inset-1 z-50 flex items-center justify-center bg-white bg-opacity-50 transition duration-150 ease-in-out">
      <div className="bg-white h-full text-center shadow-md p-6 rounded-xl w-2/3 m-2 flex flex-col">
        Carrito
        <div
          className={`border border-gray-500 p-2 mt-4 ${
            product.length > 0
              ? "overflow-y-scroll"
              : "h-full flex justify-center items-center"
          }`}
        >
          {product.length > 0 ? (
            product.map((prod, i) => {
              const imagenes = prod.imagen.split(",");

              return (
                <div
                  key={i}
                  className="md:flex items-strech py-8 md:py-10 lg:py-8 border-t border-gray-500"
                >
                  <div className="md:w-4/12 2xl:w-1/4 w-full border gap-2 p-1 flex justify-center items-center">
                    {imagenes?.length > 1 ? (
                      imagenes?.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="Black Leather Purse"
                          className="h-24 object-center border p-2 rounded-md object-cover md:block hidden"
                        />
                      ))
                    ) : (
                      <img
                        src={prod.imagen}
                        alt="Black Leather Purse"
                        className="h-24 object-center border p-2 rounded-md object-cover md:block hidden"
                      />
                    )}
                  </div>
                  <div className="md:pl-3 md:w-8/12 2xl:w-3/4 flex flex-col justify-center">
                    <p className="text-base leading-3 text-gray-800 md:pt-0 pt-4">
                      <span className="font-black">SKU:</span> {prod.sku}
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-base font-black leading-none text-gray-800">
                        {prod.nombre}
                      </p>
                    </div>
                    <p className="text-base leading-3 text-gray-600 pt-2">
                      <span className="font-black">Talle:</span> {prod.talle}
                    </p>
                    <p className="text-base leading-3 text-gray-600 py-4">
                      <span className="font-black">Color:</span> {prod.color}
                    </p>
                    <p className="text-base leading-3 text-gray-800 py-4">
                      <span className="font-black">Cantidad:</span>{" "}
                      {prod.cantidad}
                    </p>
                    <div className="flex items-center justify-between pt-5">
                      <div className="flex items-center">
                        <button
                          onClick={() => handleRemove(prod.id)}
                          className="text-xs leading-3 p-4 border shadow-md hover:shadow-lg active:translate-y-[2px] border-red-500 rounded-full text-red-500 cursor-pointer"
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-base font-black leading-none text-gray-800">
                        Subtotal: ${prod.precio * prod.cantidad},000
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center">
              Carrito vacío, llénalo y podrás concretar una venta
            </p>
          )}
        </div>
      </div>

      <div className="bg-white opacity-95 h-full text-center shadow-md p-6 rounded-xl w-1/3 m-2 flex flex-col justify-between">
        <button
          onClick={onClose}
          className="text-gray-800 flex text-3xl hover:text-gray-500"
        >
          &times;
        </button>
        <h1 className="text-xl text-black">Resumen</h1>
        <div className="p-2 mt-4">
          Nombre del cliente
          <input
            type="text"
            value={nombreCliente}
            onChange={handleNombreClienteChange}
            className="border p-2 w-full mt-2"
            placeholder="Nombre del cliente"
          />
        </div>
        <div className="p-2 mt-4">
          Forma de pago
          <div className="flex gap-2 mt-2 justify-center items-center">
            <button
              onClick={() => handleFormaPagoChange("Efectivo")}
              className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
                formaPago === "Efectivo" ? "border-teal-300" : "border-gray-400"
              }`}
            >
              Efectivo
            </button>
            <button
              onClick={() => handleFormaPagoChange("Mercado Pago")}
              className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
                formaPago === "Mercado Pago"
                  ? "border-teal-300"
                  : "border-gray-400"
              }`}
            >
              Mercado Pago
            </button>
            <button
              onClick={() => handleFormaPagoChange("Transferencia")}
              className={`border p-2 text-gray-500 w-40 hover:bg-gray-100 shadow-md active:translate-y-[2px] ${
                formaPago === "Transferencia"
                  ? "border-teal-300"
                  : "border-gray-400"
              }`}
            >
              Transferencia
            </button>
          </div>
        </div>
        <div className="p-2 mt-4">
          Total: ${calcularTotal()},000
        </div>
        <div className="p-2 mt-4">
          <button
            onClick={handleCreateVenta}
            className="border p-2 text-white bg-gray-800 w-full hover:bg-gray-700"
          >
            Crear Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
