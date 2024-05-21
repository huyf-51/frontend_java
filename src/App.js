import "./App.css";
import { Route, Routes } from "react-router-dom";
import EmployeeRouters from "./Routers/EmployeeRouters";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/*" element={<EmployeeRouters />}></Route>
      </Routes>
    </div>
  );
}

export default App;
