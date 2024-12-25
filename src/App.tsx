import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import Table from "./Table/Table";
import FormBuilder from "./Form/FormBuilder";
import AdvancedTable from "./Table/AdvancedTable";

import "./App.css";
import { Button } from "antd";
function App() {

  function Nav() {
    const navigate = useNavigate();
    return (
      <nav style={{ display: "flex", gap: "1rem" }}>
          <Button size="large" onClick={() => navigate("/table")}>
            Table
          </Button>
          <Button size="large" onClick={() => navigate("/form")}>
            Form
          </Button>
          <Button size="large" onClick={() => navigate("/advanced-table")}>
            Advanced Table
          </Button>
      </nav>
    );
  }

  return (
    <div>
    <BrowserRouter>
    <Nav />
      <Routes>
        <Route path="/table" element={<Table />} />
        <Route path="/form" element={<FormBuilder />} />
        <Route path="/advanced-table" element={<AdvancedTable />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
