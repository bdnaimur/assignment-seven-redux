import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions/Transactions";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Balance />
              <Form />
              <Transactions />
            </Layout>
          }
        ></Route>
        <Route
          path="/transactions"
          element={
            <Layout>
              <Transactions view />
            </Layout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
