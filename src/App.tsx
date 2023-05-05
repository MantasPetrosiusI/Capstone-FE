import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./components/LoginRegister/Register";
import Login from "./components/LoginRegister/Login";
import MainPage from "./components/MainPage";
import UserProfile from "./components/UserProfile/UserProfile";
import Editor from "./components/Editor";

import QuestionsForm from "./components/QuestionsForm";
import UserQuestions from "./components/UserQuestions";
import { useAppSelector } from "./redux/hooks";

function App() {
  const currentUser = useAppSelector((state) => state.df.currentUser);
  console.log(currentUser);
  return (
    <div className="App">
      <CustomNavbar isLoggedIn={currentUser.online} />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/questionForm" element={<QuestionsForm />} />
        <Route path="/myQuestions" element={<UserQuestions />} />
      </Routes>
    </div>
  );
}

export default App;
