import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import rutaBack from "../redux/actions/rutaBack";
import { auth } from "./firebase.config";
import store from "../redux/store";
import { loginWithGoogle } from "../redux/actions/actions";
import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const DoSignInWithGoogle = async () => {
  const navigate = useNavigate()
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

      navigate("/dashboard")
    } else {
      toast.error("Error al ingresar");
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


export const authenticateWithGooglePopup = async () => {
  try {
    const response = await fetch(`${rutaBack}/api/login/auth`);
    const { url } = await response.json();

    const newWindow = window.open(
      url,
      "googleAuth",
      "width=500,height=600,scrollbars=yes,resizable=yes"
    );

    const handleMessage = (event) => {
      if (event.origin !== rutaBack) return; // Verifica el origen del mensaje

      const tokens = event.data;
      const { access_token, refresh_token } = tokens;

      localStorage.setItem("authToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      toast.success("Autenticación completada, redirigiendo...");

      setTimeout(() => {
        window.location.replace("/dashboard");
      }, 2000);
    };

    window.addEventListener("message", handleMessage);

    const checkWindowClosed = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkWindowClosed);
        window.removeEventListener("message", handleMessage);
      }
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error al iniciar la autenticación.");
  }
};

export const doSignOut = () => {
  return auth.signOut();
};