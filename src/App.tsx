import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./components/LoginRegister/Register";
import Login from "./components/LoginRegister/Login";
import EditorPage from "./components/Editor/EditorPage";
import UserProfile from "./components/UserProfile/UserProfile";
import QuestionsForm from "./components/QuestionsForm";
import { useAppSelector } from "./redux/hooks";
import MainPage from "./components/MainPage";
import UserUnanswered from "./components/UserQuestions/UserUnanswered";
import UserAnswered from "./components/UserQuestions/UserAnswered";

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
        <Route path="/myAnswered" element={<UserAnswered />} />
        <Route path="/myUnanswered" element={<UserUnanswered />} />
      </Routes>
      <Routes>
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/questionForm" element={<QuestionsForm />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
