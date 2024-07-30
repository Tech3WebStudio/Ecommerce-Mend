import CryptoJS from "crypto-js";
import intance from "../../api/axiosConfig";
import toast from "react-hot-toast";

export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const AUTHENTICATE_USER_FROM_SESSION = "AUTHENTICATE_USER_FROM_SESSION";
export const FETCH_SHEETS = "FETCH_SHEETS";
export const AUTH_SHEETS = "AUTH_SHEETS";
export const ADD_SHEET_ROW = "ADD_SHEET_ROW";
export const UPDATE_SHEET_ROW = "UPDATE_SHEET_ROW";
export const DELETE_SHEET_ROW = "DELETE_SHEET_ROW";

export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const loginWithGoogle = (userInfo) => ({
  type: LOGIN_WITH_GOOGLE,
  payload: userInfo,
});

export const authenticateUserFromSession = () => {
  return (dispatch) => {
    const hashedUserInfo = sessionStorage.getItem("user");

    if (hashedUserInfo) {
      try {
        const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
        const bytes = CryptoJS.AES.decrypt(hashedUserInfo, secretKey);
        const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        dispatch({
          type: AUTHENTICATE_USER_FROM_SESSION,
          payload: userInfo,
        });
      } catch (error) {
        console.error(
          "Error desencriptando la información del usuario:",
          error
        );
        toast.error("Error autenticando usuario");
      }
    }
  };
};

export const uploadImages = (formData) => async (dispatch) => {
  try {
    const response = await intance.post(
      `/api/sheets/images`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    if (response.data) {
      toast.success("Imagen cargada");
      dispatch({ type: UPLOAD_IMAGES_SUCCESS, payload: response.data.links });
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    dispatch({
      type: UPLOAD_IMAGES_FAILURE,
      payload: "Error uploading images",
    });
  }
};

export const fetchSheets = () => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.get(`/api/sheets/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: FETCH_SHEETS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addSheetRow = (rowData) => async (dispatch) => {
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.post(`/api/sheets/data`, rowData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.put(`/api/sheets/update`, rowData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
  const token = localStorage.getItem("authToken");
  try {
    const res = await intance.delete(
      `/api/sheets/delete/${rowIndex}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
