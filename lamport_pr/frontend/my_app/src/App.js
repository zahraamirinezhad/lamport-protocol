import classes from "./App.module.scss";
import { CreateAccount, Login, MainContainer } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/mainPage" element={<MainContainer />} />
      </Routes>
    </div>
  );
}

export default App;
