import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authenticateUserFromSession } from "./redux/actions/actions";
import Error from "./pages/Error";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(authenticateUserFromSession());
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {isAuth ? (
          <>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/products" element={<Products />}></Route>
          </>
        ) : (
          <Route path="/error" element={<Error />}></Route>
        )}
      </Routes>
    </>
  );
}

export default App;
