import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/actions";
import toast from "react-hot-toast";

const DisplayProductDashboard = ({ products }) => {
  const dispatch = useDispatch();
 console.log (products);
  // console.log(products[5]);
  const handleAddToCart = (product) => {
    const available = product[5];

    const data = {
      id: product[0],
      categoria: product[1],
      nombre: product[2],
      color: product[3],
      talle: product[4],
      cantidad: product[5],
      precio: product[6],
      imagen: product[7],
      sku: product[8]
    }

    if (available > 0) {
      toast.success("Se agregó al carrito");
      dispatch(addToCart(data));
    } else {
      toast.error("Producto sin stock");
    }
  };
  return (
    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products &&
        products?.map((product, i) => {
          const imageUrls = product[7]?.split(", ");

          return (
            <button
              key={i}
              onClick={() => handleAddToCart(product)}
              className="flex cursor-pointer shadow-md rounded-md p-2 flex-col items-center justify-center w-full max-w-lg mx-auto hover:shadow-xl active:shadow-lg active:translate-y-[2px]"
            >
              {imageUrls?.length > 3 ? (
                <div className="flex">
                  {imageUrls?.map((img, ind) => (
                    <img
                      key={ind}
                      className="object-cover w-full rounded-md h-24 xl:h-32"
                      src={img}
                      alt={`${product[2]}-${ind}`}
                    />
                  ))}
                </div>
              ) : (
                <img
                  className="object-cover w-full rounded-md h-24 xl:h-32"
                  src={imageUrls[0]}
                  alt={`${product[2]}-1`}
                />
              )}
              <h4 className="mt-2 text-lg font-medium text-black dark:text-gray-200">
                {product[2]}
              </h4>
              <p className="text-blue-500">${product[6]}</p>
            </button>
          );
        })}
    </div>
  );
};

export default DisplayProductDashboard;
