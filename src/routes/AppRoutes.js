import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../component/HomePage";
import Login from "../component/Login";
import PrivataRoutes from "./PrivataRoutes";
import TableUser from "../component/TableUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user"
        element={
          <PrivataRoutes>
            <TableUser />
          </PrivataRoutes>
        }
      />
    </Routes>
  );
};
export default AppRoutes;
