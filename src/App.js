import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";

import { Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import Logout from "./component/Logout";
function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<TableUser />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
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
