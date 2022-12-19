import React, { useContext, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "../context/UseContext";

const PrivataRoutes = (props) => {
  const { user } = useContext(UserContext);
  if (user && user.auth === false) {
    return (
      <Alert variant="danger mt-5">
        <Alert.Heading>Bắt buộc đăng nhập</Alert.Heading>
        <p>Bạn phải đăng nhập để lấy token</p>
      </Alert>
    );
  }
  return <>{props.children}</>;
};
export default PrivataRoutes;
