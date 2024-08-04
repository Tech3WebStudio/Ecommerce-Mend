import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  cleanCart,
  createSale,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../../redux/actions/actions";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

const DisplayProductDashboard = ({ products }) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [formaPago, setFormaPago] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const dispatch = useDispatch();

  console.log(cartItems);

  const calculateTotal = () => {
    const total = cartItems.reduce((acc, product) => {
      const precio = parseInt(product.precio);
      const quantity = product.cantidad || 1;
      return acc + (isNaN(precio) ? 0 : precio * quantity);
    }, 0);

    return total.toFixed(2);
  };
  const handleFormaPagoChange = (forma) => {
    setFormaPago(forma);
  };

  const handleNombreClienteChange = (e) => {
    setNombreCliente(e.target.value);
  };

  const handleCreateVenta = () => {
    const venta = {
      productos: cartItems.map((prod) => ({
        id: prod.id,
        sku: prod.sku,
        nombre: prod.nombre,
        talle: prod.talle,
        color: prod.color,
        precio: prod.precio,
        cantidad: prod.cantidad,
      })),
      total: calculateTotal(),
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
      console.log(venta);
    }
  };

  const handleAddToCart = (product) => {
    const available = product.cantidad;

    const data = {
      id: product.id,
      categoria: product.categoria,
      nombre: product.nombre,
      color: product.color,
      talle: product.talle,
      cantidad: 1, // Empezamos con 1 porque lo vamos a agregar al carrito
      precio: product.precio,
      imagen: product.url,
      sku: product.sku,
    };

    if (available > 0) {
      toast.success("Se agregó al carrito");
      dispatch(addToCart(data));
    } else {
      toast.error("Producto sin stock");
    }
  };

  const handleQuantityChange = (index, action) => {
    const productId = cartItems[index].id;
    if (action === "increase") {
      dispatch(incrementQuantity(productId));
    } else if (action === "decrease") {
      dispatch(decrementQuantity(productId));
    }
  };

  const handleRemoveFromCart = (index) => {
    const productId = cartItems[index].id;
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="container mx-auto  bg-white">
      <div className="flex lg:flex-row flex-col-reverse shadow-lg">
        {/* Productos */}
        <div className="w-full lg:w-3/5 h-screen overflow-y-scroll shadow-lg">
          {/* ... */}
          <div className="flex flex-row justify-between items-center px-5 mt-5">
            <div className="text-gray-800">
              <div className="font-bold text-xl flex gap-2 justify-center items-center">
                <img
                  src="ninalogo.webp"
                  className="w-12 h-12 rounded-full"
                  alt=""
                />
                NINA Showroom
              </div>
              <span className="text-xs">Location ID#MEND007</span>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-center mr-4">
                <div className="font-light text-gray-500">last synced</div>
                <span className="font-semibold">3 mins ago</span>
              </div>
              <div>
                <span className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded">
                  Help
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-row px-5">
            <span className="px-5 py-1 bg-primary rounded-2xl text-white text-sm mr-4">
              All items
            </span>
          </div>
          <div className="grid grid-cols-3 px-3 py-3 gap-4 mt-5 overflow-y-auto h-auto">
            {products &&
              products?.map((product, i) => {
                const imageUrls = product?.url?.split(", ");
                return (
                  <button
                    key={i}
                    onClick={() => handleAddToCart(product)}
                    className="flex border cursor-pointer shadow-md rounded-md p-2 flex-col items-center justify-center w-full max-w-lg mx-auto hover:shadow-xl active:shadow-lg active:translate-y-[2px]"
                  >
                    {imageUrls?.length > 1 ? (
                      <div className="flex">
                        <LazyLoadImage
                          className="object-cover w-24 rounded-md h-24 xl:h-32"
                          src={imageUrls[0]}
                          alt={`${product.nombre}`}
                        />
                      </div>
                    ) : (
                      <LazyLoadImage
                        className="object-cover w-full rounded-md h-24 xl:h-32"
                        src={product.url}
                        alt={`${product.nombre}-1`}
                      />
                    )}
                    <h4 className="mt-2 text-sm font-medium text-primary">
                      {product.nombre}
                    </h4>
                    <p className="text-tertiary mt-2 text-sm">
                      ${product.precio}
                    </p>
                  </button>
                );
              })}
          </div>
        </div>
        {/* Carrito */}
        <div className="w-full lg:w-2/5 h-screen">
          <div className="flex flex-row items-center justify-between px-5 mt-5">
            <div className="font-bold text-xl">Current Order</div>
            <div className="font-semibold flex gap-2">
              <span
                onClick={() => dispatch(cleanCart())}
                className="px-4 py-2 hover:text-pink-200 rounded-md bg-secondary text-white cursor-pointer"
              >
                Clear All
              </span>
              {/* <span className="px-4 py-2 rounded-md bg-gray-100 text-gray-800">
                Setting
              </span> */}
            </div>
          </div>
          <div className="px-5 py-4 mt-5 overflow-y-auto h-64">
            {cartItems?.length > 0
              ? cartItems?.map((item, i) => {
                  const imgUrl = item?.imagen?.split(",")
                  console.log(imgUrl);
                  return (
                    <div
                      key={i}
                      className="flex flex-row justify-between items-center mb-4"
                    >
                      <div className="flex flex-row items-center w-2/5">
                        <LazyLoadImage
                          src={imgUrl[0]}
                          className="w-12 h-12 object-cover rounded-md"
                          alt={`${item.nombre}-${i}`}
                        />
                        <span className="ml-4 font-semibold text-sm text-primary text-center">
                          {item?.nombre}
                        </span>
                      </div>
                      <div className="w-24 flex justify-between items-center">
                        <button
                          onClick={() => handleQuantityChange(i, "decrease")}
                          className="px-3 py-1 rounded-md bg-gray-300"
                        >
                          -
                        </button>
                        <span className="font-semibold mx-4">
                          {item?.cantidad}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(i, "increase")}
                          className="px-3 py-1 rounded-md bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <div className="font-semibold text-lg w-16 text-center">
                        ${item?.precio * item?.cantidad}
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(i)}
                        className="text-red-500 font-semibold"
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
                  );
                })
              : "Carrito vacío"}
          </div>
          <div className="px-5 mt-5">
            <div className="py-4 border border-gray-300 rounded-md shadow-lg">
              <div className="px-4 flex justify-between">
                <span className="font-semibold text-sm">Subtotal</span>
                <span className="font-bold">${calculateTotal()}</span>
              </div>
              <div className="py-4 px-4 flex flex-col">
                <input
                  type="text"
                  placeholder="Nombre del cliente"
                  value={nombreCliente}
                  onChange={handleNombreClienteChange}
                  className="border p-2 rounded-md mb-2"
                />
                <div className="flex flex-row justify-between mb-2">
                  <span className="font-semibold">Forma de Pago</span>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => handleFormaPagoChange("Efectivo")}
                      className={`px-4 py-2 rounded-md ${
                        formaPago === "Efectivo"
                          ? "bg-secondary text-white"
                          : "bg-pink-200 text-white"
                      }`}
                    >
                      Efectivo
                    </button>
                    <button
                      onClick={() => handleFormaPagoChange("Tarjeta")}
                      className={`px-4 py-2 rounded-md ${
                        formaPago === "Tarjeta"
                          ? "bg-secondary text-white"
                          : "bg-pink-200 text-white"
                      }`}
                    >
                      Tarjeta
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleCreateVenta}
                  className="px-4 py-2 bg-primary hover:bg-secondary text-white rounded-md w-full"
                >
                  Confirmar Venta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProductDashboard;
