import { useDispatch, useSelector } from "react-redux";
import { clearFilteredProducts, filterByCategory, renderCondition } from "../../redux/actions/actions";
import { useState, useRef } from "react";

const Filter = () => {
  const categories = useSelector((state) => state.sheets.categories);
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
 

  const handleFilter = (event) => {
    const category = event.target.value;
    
    if (category !== "Todos") {
      dispatch(filterByCategory(category));
      dispatch(renderCondition("filteredProducts"));
    } else {
      dispatch(renderCondition("allProducts"));
      dispatch(clearFilteredProducts());
    }
  };

  const scrollLeft = () => {
    carouselRef.current.scrollBy({
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center mt-5 flex-row px-1 overflow-x-hidden max-w-3xl">

      <div
        className="flex overflow-x-scroll scrollbar-hide space-x-2 py-0.5" // Agrega espacio entre los botones y oculta el scrollbar
        ref={carouselRef}
        style={{ maxWidth: "90%" }} // Limita el ancho máximo del contenedor
      >
        <button
            value={"Todos"}
            onClick={handleFilter}
            className="px-4 py-2 bg-primary rounded-2xl text-white text-xs whitespace-nowrap" >
                Todos
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            value={category}
            onClick={handleFilter}
            className="px-3 py-1 bg-primary rounded-2xl text-white text-xs whitespace-nowrap" // Ajusta padding y font-size
          >
            {category}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Filter;
