import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import Header from "./component/Header";
import TableUser from "./component/TableUser";
import Container from "react-bootstrap/Container";
function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
