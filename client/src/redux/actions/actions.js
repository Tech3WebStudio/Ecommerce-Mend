import axios from "axios";
import rutaBack from "./rutaBack";
import toast from "react-hot-toast";

export const FETCH_SHEETS = "FETCH_SHEETS";
export const AUTH_SHEETS = "AUTH_SHEETS";
export const ADD_SHEET_ROW = "ADD_SHEET_ROW";
export const UPDATE_SHEET_ROW = "UPDATE_SHEET_ROW";
export const DELETE_SHEET_ROW = "DELETE_SHEET_ROW";

export const fetchSheets = () => async (dispatch) => {
  try {
    const res = await axios.get(`${rutaBack}/api/sheets/data`);
    dispatch({
      type: FETCH_SHEETS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSheetRow = (rowData) => async (dispatch) => {
  try {
    const res = await axios.post(`${rutaBack}/api/sheets/data`, rowData);
    if (res.status === 200) {
      toast.success("Creado exitosamente");
      dispatch({
        type: ADD_SHEET_ROW,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateRow = (rowData) => async (dispatch) => {
  try {
    const res = await axios.post(`${rutaBack}/api/sheets/update`, rowData);

    if (res.status === 200) {
      toast.success("Editado exitosamente");

      dispatch({
        type: UPDATE_SHEET_ROW,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteSheetRow = (rowIndex) => async (dispatch) => {
  try {
    const res = await axios.delete(`${rutaBack}/api/sheets/delete/${rowIndex}`);

    if (res.status === 200) {
      toast.success("Eliminado exitosamente");
      dispatch({
        type: DELETE_SHEET_ROW,
        payload: rowIndex,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
