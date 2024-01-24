import { useContext, useState } from "react";
import classes from "./App.module.scss";
import { CreateAccount, Login, MainContainer } from "./pages";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isUser, setIsUser] = useState(false);
  return (
    <div className={classes.container}>
      <Routes>
        <Route path="/" element={isUser ? <MainContainer /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
      </Routes>
    </div>
  );
}

export default App;
