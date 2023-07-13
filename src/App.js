import React from "react";
import { Route, Routes } from "react-router-dom";

import styles from "./index.module.scss";

import Header from "./components/Header/index";
import Home from "./pages/Home/index";
import Favorite from "./pages/Favorite/index";
import Profile from "./pages/Profile/index";
import AboutProduct from "./pages/AboutProduct/index";
import Erorr from "./components/Error";
import Cart from "./components/Cart/index";

function App() {
  const [openCart, setOpenCart] = React.useState(false);

  return (
    <div className={styles.background}>
      <Header 
        setOpenCart={setOpenCart} />
      {/* {openCart ? <Cart setOpenCart={setOpenCart} /> : null} */}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="*"
          element={
            <Erorr
              header={"Erorr 404"}
              text={"Похоже данной странице не существует"}
            />
          }
        ></Route>
        <Route path="/favorite" element={<Favorite />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/product" element={<AboutProduct />}></Route>
      </Routes>
    </div>
  );
}

export default App;
