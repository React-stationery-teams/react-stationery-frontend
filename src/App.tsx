import React from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./index.module.scss";

import Header from "./components/Header/index";
import Home from "./pages/Home/index";
import Favorite from "./pages/Favorite/index";
import Profile from "./pages/Profile/index";
import AboutProduct from "./pages/AboutProduct/index";
import Error from "./components/Error";
import Cart from "./pages/Cart/index";

function App() {
  return (
    <div className={styles.background}>
      <Header />
      <Routes>
        <Route path="/react-stationery" element={<Home />}></Route>
        <Route
          path="*"
          element={
            <Error
              header={"Erorr 404"}
              text={"Похоже данной странице не существует"}
            />
          }
        ></Route>
        <Route path="react-stationery/favorite" element={<Favorite />}></Route>
        <Route path="react-stationery/profile" element={<Profile />}></Route>
        <Route path="react-stationery/product" element={<AboutProduct />}></Route>
        <Route path="react-stationery/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
