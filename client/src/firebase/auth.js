import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import rutaBack from "../redux/actions/rutaBack";
import { auth } from "./firebase.config";
import store from "../redux/store";
import { loginWithGoogle } from "../redux/actions/actions";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await fetch(`${rutaBack}/api/login/third`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      toast.success("Ingreso exitoso, redirigiendo..");
      const userInfo = {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        picture: result.user.photoURL,
      };

      const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;

      // Hashear la información del usuario
      const hashedUserInfo = CryptoJS.AES.encrypt(
        JSON.stringify(userInfo),
        secretKey
      ).toString();

      // Guardar en sessionStorage
      sessionStorage.setItem("user", hashedUserInfo);
      localStorage.setItem("authToken", token);

      store.dispatch(loginWithGoogle(userInfo));

      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 2000);
      
    } else {
      toast.error("Error al ingresar");
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const doSignOut = () => {
  return auth.signOut();
};
