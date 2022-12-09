import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
// import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Container>
          <TableUser />
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
          // theme="light"
        />
      </div>
    </>
  );
}

export default App;
