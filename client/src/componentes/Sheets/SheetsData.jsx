import { LazyLoadImage } from "react-lazy-load-image-component";

const SheetsData = ({ data, toggleModal, toggleDeleteModal }) => {
  return (
    <div className="overflow-x-auto custom-scroll">
      <table className="basic mt-2">
        <thead>
          <tr className="border border-gray-500">
            <th>ID</th>
            <th>Categoría</th>
            <th>Nombre</th>
            <th>Color</th>
            <th>Talle</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>SKU</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.length > 0 ? (
            data.map((row, index) => {
              const imgUrl = row?.url?.split(", ");

              const rowClass = row.cantidad === "0" ? "bg-red-300" : "";

              return (
                <tr
                  key={index}
                  className={`border border-gray-600 ${rowClass}`}
                >
                  <td>{row.id}</td>
                  <td>{row.categoria}</td>
                  <td>{row.nombre}</td>
                  <td>{row.color}</td>
                  <td>{row.talle}</td>
                  <td>{row.cantidad}</td>
                  <td>{row.precio}</td>
                  <td className="flex">
                    {imgUrl?.length > 1 ? (
                      imgUrl?.map((url, imgIndex) => (
                        <LazyLoadImage
                          key={imgIndex}
                          src={url}
                          alt={`Imagen ${index}-${imgIndex}`}
                          className="w-16 h-16 rounded-full mr-[-36px] object-cover mb-2"
                        />
                      ))
                    ) : (
                      <LazyLoadImage
                        src={row?.url}
                        alt={`Imagen ${row?.url}-${index}`}
                        className="w-16 h-16 rounded-full mr-[-36px] object-cover mb-2"
                      />
                    )}
                  </td>
                  <td>{row.sku}</td>
                  <td className="gap-2">
                    <button
                      className="hover:text-green-500"
                      onClick={() => toggleModal(row)}
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l9.686-9.687Zm0 0 2.651 2.652m-4.5-.75 2.25 2.25M18 12v6.375a2.625 2.625 0 0 1-2.625 2.625H6.75A2.625 2.625 0 0 1 4.125 18V8.625A2.625 2.625 0 0 1 6.75 6h6.375"
                        />
                      </svg>
                    </button>
                    <button
                      className="hover:text-red-500"
                      onClick={() => toggleDeleteModal(index)}
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
                          d="M19.5 7.5 4.5 7.5M12 9v6m0 0 3-3m-3 3-3-3m9 0h-6m0 0H7.5"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="10">No se encontraron productos</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SheetsData;
