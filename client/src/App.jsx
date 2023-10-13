import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login, Main, Register } from "./pages";
import AppLayout from "./Layout/AppLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="*" element={<h1>Page Not found</h1>} />
    </Routes>
  );
};

export default App;
