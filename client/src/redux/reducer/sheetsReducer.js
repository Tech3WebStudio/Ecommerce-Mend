// sheetsReducer.js

import {
  FETCH_SHEETS,
  ADD_SHEET_ROW,
  UPDATE_SHEET_ROW,
  DELETE_SHEET_ROW,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  CLEAR_IMAGES,
  CLEAR_FILTER,
  FILTER_CATEGORY,
  GET_CATEGORIES,
  SET_CONDITION,
  GET_CASH_FLOW,
  ADD_CASH_FLOW_ENTRY
} from "../actions/actions";

const initialState = {
  sheetsData: [],
  images: [],
  loading: false,
  error: null,
  rCondition: "allProducts",
  filterProducts: [],
  categories: [],
  cashFlow: [],
};

const sheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SHEETS:
      return {
        ...state,
        sheetsData: action.payload,
        loading: false,
      };
    case ADD_SHEET_ROW:
      return {
        ...state,
        sheetsData: [...state.sheetsData, action.payload],
      };
    case UPDATE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.map((row) =>
          row[0] === action.payload[0] ? action.payload : row
        ),
      };
    case DELETE_SHEET_ROW:
      return {
        ...state,
        sheetsData: state.sheetsData.filter(
          (row) => row[0] !== action.payload // Utiliza el ID para filtrar
        ),
      };
    case UPLOAD_IMAGES_SUCCESS:
      return {
        ...state,
        images: [...state.images, action.payload],
        error: null,
      };
    case UPLOAD_IMAGES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_IMAGES: // Caso para limpiar imágenes
      return {
        ...state,
        images: [],
      };

    case SET_CONDITION:
        return { ...state, rCondition: action.payload };  

    case FILTER_CATEGORY: // Productos filtrados por categoria  
      return {
        ...state,
        filterProducts: action.payload,
      }

    case CLEAR_FILTER:
      return {...state, 
        filterProducts: []}  

    case GET_CATEGORIES: // Obtener todas las categorias
      return {
        ...state,
        categories: action.payload,
      };  

    case GET_CASH_FLOW:
        return {
          ...state,
          cashFlow: action.payload,
        };
        
    case ADD_CASH_FLOW_ENTRY:
      return {
        ...state,
        cashFlow: [...state.cashFlow, action.payload],
      };    
    default:
      return state;
  }
};

export default sheetsReducer;
