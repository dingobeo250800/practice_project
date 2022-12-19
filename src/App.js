import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Header from "./component/Header";
import { useContext, useEffect } from "react";

import { UserContext } from "./context/UseContext";
import AppRoutes from "./routes/AppRoutes";
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
          <AppRoutes />
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
