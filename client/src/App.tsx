import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import logo from "./ts-logo.png";

const App = () => {
  return (
    <>
      <div className="App">
        <header className="ts-header">
          <img src={logo} alt="ts logo" className="ts-header__logo" />
          <h3 className="ts-header__heading  text-center ">
            Shop Search and Reviews
          </h3>
        </header>
        <div className="ts-content-wrapper">
          <Routes>
            <Route path=":shopId" element={<Home />} />
            <Route path="" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
        <footer className="ts-footer">
          <p className="ts-footer__text text-center">
            Copyright © Jonathan Bareket 2021
          </p>
        </footer>
      </div>
    </>
  );
};

export default App;
