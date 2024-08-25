import { useDispatch } from 'react-redux';
import React from 'react'
import { useSelector } from 'react-redux'
import { getProductsByColor, renderCondition } from '../../../redux/actions/actions';

const FilterColor = () => {

    const allColors = useSelector((state) => state.sheets.colors);
    const dispatch = useDispatch();

    const handleColorFilter = (event) => {
        const color = event.target.value;
    
    if (color!=="Todos"){
      dispatch (getProductsByColor(color));
      dispatch(renderCondition("filteredColor"));
    }else{
      dispatch(renderCondition("allProducts"));

    }}


  return (
    <div className="flex items-center mt-5 flex-row px-1 overflow-x-hidden">

      <div
        className="flex overflow-x-scroll scrollbar-hide space-x-2 p-4 rounded-md mr-2" // Agrega espacio entre los botones y oculta el scrollbar
        
      >
        <button
            value={"Todos"}
            onClick={handleColorFilter}
            className="px-4 py-2 bg-primary rounded-2xl text-white text-xs whitespace-nowrap" >
                Todos
        </button>
        {allColors.map((color, index) => (
          <button
            key={index}
            value={color}
            onClick={handleColorFilter}
            className="px-3 py-1 bg-primary rounded-2xl text-white text-xs whitespace-nowrap" // Ajusta padding y font-size
          >
            {color}
          </button>
        ))}
      </div>

    </div>
  )
}

export default FilterColor