import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import { Login } from "./pages/Login";
import  SupportDevelopers from './componentes/Support/SupportDevelopers'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authenticateUserFromSession } from "./redux/actions/actions";
import Error from "./pages/Error";
import Sales from "./pages/Sales";
import Support from "./pages/Support";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(authenticateUserFromSession());
  }, [dispatch]);
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuth ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/support" element={<SupportDevelopers/>} />
          </>
        ) : (
          <Route path="/error" element={<Error />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
