// sheetsReducer.js

import {
  FETCH_SHEETS,
  ADD_SHEET_ROW,
  UPDATE_SHEET_ROW,
  DELETE_SHEET_ROW,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  CLEAR_IMAGES,
  FILTER_CATEGORY,
  GET_CATEGORIES,
} from "../actions/actions";

const initialState = {
  sheetsData: [],
  images: [],
  loading: false,
  error: null,
  filterProducts: [],
  categories: []
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

    case FILTER_CATEGORY: // Productos filtrados por categoria  
      return {
        ...state,
        filterProducts: action.payload,
      }

    case GET_CATEGORIES: // Obtener todas las categorias
      return {
        ...state,
        categories: action.payload,
      };  
    default:
      return state;
  }
};

export default sheetsReducer;
