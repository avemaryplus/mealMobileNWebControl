import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DishesPage from "./containers/DishesPage";
import OrdersPage from "./containers/OrdersPage";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<DishesPage />} />
            <Route path="/dishes" element={<DishesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
