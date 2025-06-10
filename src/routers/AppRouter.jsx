import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/state" element={<StateManage />}></Route> */}
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>

        <Route element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
