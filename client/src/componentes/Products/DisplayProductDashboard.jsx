import React from "react";

const DisplayProductDashboard = ({ products }) => {
  return (
    <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products &&
        products.map((product, i) => {
          const imageUrls = product[7].split(", ");

          return (
            <div
              key={i}
              className="flex cursor-pointer shadow-md rounded-md p-2 flex-col items-center justify-center w-full max-w-lg mx-auto"
            >
              {imageUrls.length > 3 ? (
                <div className="flex">
                  {imageUrls.map((img, ind) => (
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
            </div>
          );
        })}
    </div>
  );
};

export default DisplayProductDashboard;
