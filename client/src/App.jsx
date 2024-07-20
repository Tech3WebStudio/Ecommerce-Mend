import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/"></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Routes>
    </>
  );
}

export default App;
