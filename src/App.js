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
        <Route path="/" element={<Home />}></Route>
        <Route
          path="*"
          element={
            <Error
              header={"Erorr 404"}
              text={"Похоже данной странице не существует"}
            />
          }
        ></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/product" element={<AboutProduct />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
}

export default App;
