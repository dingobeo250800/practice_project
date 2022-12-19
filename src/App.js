import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./component/Header";
import TableUser from "./component/TableUser";

import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import { UserContext } from "./context/UseContext";
function App() {
  const { login } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("tokenLogin")) {
      login(localStorage.getItem("tokenLogin"), localStorage.getItem("email"));
    }
  }, []);
  return (
    <>
      <div className="App">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<TableUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </>
  );
}

export default App;
