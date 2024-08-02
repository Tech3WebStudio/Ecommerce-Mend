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

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const UPDATE_CART_ITEM_QUANTITY = "UPDATE_CART_ITEM_QUANTITY";
export const CART_SENT_SUCCESS = "CART_SENT_SUCCESS";
export const CART_SENT_FAILURE = "CART_SENT_FAILURE";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const GET_CART_FAILURE = "GET_CART_FAILURE";
export const CLEAN_CART = "CLEAN_CART";
export const UPDATE_CART = "UPDATE_CART";

export const DELETE_CART_ITEM_SUCCESS = "DELETE_CART_ITEM_SUCCESS";
export const DELETE_CART_ITEM_FAILURE = "DELETE_CART_ITEM_FAILURE";

export const CREATED_SALE = "CREATED_SALE";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const cleanCart = () => ({
  type: CLEAN_CART,
});

export const updateCartItemQuantity = (productId, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { productId, quantity },
});

export const updateCart = (updatedCart) => ({
  type: UPDATE_CART,
  payload: updatedCart,
});

// export const sendCart = (userId, cartItems) => async (dispatch) => {
//   try {
//     if (userId) {
//       const data = {
//         idUser: userId, // Ajusta el nombre de la propiedad a "idUser"
//         arrayProducts: cartItems.map((product) => ({
//           id_product: product.id_product,
//           cartQuantity: product.cartQuantity,
//         })),
//       };
//       // Realizar la petición POST
//       const response = await axios.post(`${rutaBack}/cart/`, data);
//       // Despachar una acción si es necesario
//       dispatch({ type: CART_SENT_SUCCESS, payload: response });
//     } else {
//       console.log("No user is logged in.");
//     }
//   } catch (error) {
//     // console.error("Error sending cart:", error);
//     dispatch({ type: CART_SENT_FAILURE, error });
//   }
// };

// export const getCartByUserId = (userId) => async (dispatch) => {
//   try {
//     // Realizar la petición GET para obtener la información del carrito del usuario
//     const response = await axios.get(`${rutaBack}/cart/id/${userId}`);
//     // Despachar una acción con la información del carrito obtenida
//     dispatch({ type: GET_CART_SUCCESS, payload: response.data.products });
//   } catch (error) {
//     // En caso de error, despachar una acción de error
//     // console.error("Error al obtener el carrito:", error);
//     dispatch({ type: GET_CART_FAILURE, error });
//   }
// };

// export const deleteCartItem = (userId, idProduct) => async (dispatch) => {
//   try {
//     const response = await axios.delete(`${rutaBack}/cart/deleteItem`, {
//       data: { idUser: userId, idProduct },
//     });
//     console.log(response.data)
//     dispatch({ type: DELETE_CART_ITEM_SUCCESS, payload: response.data });

//     // Verifica si el carrito está vacío después de la eliminación
//     const cartResponse = await axios.get(`${rutaBack}/cart/id/${userId}`);
//     if (cartResponse.data.products.length === 0) {
//       dispatch(cleanCart());
//     }
//   } catch (error) {
//     dispatch({
//       type: DELETE_CART_ITEM_FAILURE,
//       error: error.response?.data || error.message,
//     });
//   }
// };

export const createSale = (data) => async (dispatch) => {
  try {
    const res = await intance.get(`/api/sheets/sale`, data);
    console.log(res);
    dispatch({
      type: CREATED_SALE,
      payload: res
    })
  } catch (error) {
    console.log({ error: error.message });
  }
};

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
    const response = await intance.post(`/api/sheets/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
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
    const res = await intance.delete(`/api/sheets/delete/${rowIndex}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
