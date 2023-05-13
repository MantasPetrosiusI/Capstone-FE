import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Register from "./components/LoginRegister/Register";
import Login from "./components/LoginRegister/Login";
import EditorPage from "./components/Editor/EditorPage";
import UserProfile from "./components/UserProfile/UserProfile";
import QuestionsForm from "./components/QuestionsForm";
import { MainPage } from "./components";
import UserUnanswered from "./components/UserQuestions/UserUnanswered";
import UserAnswered from "./components/UserQuestions/UserAnswered";
import Question from "./components/Question";
import Cookies from "js-cookie";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import {
  setQuestions,
  fetchUserQuestions,
  setCurrentUser,
} from "./redux/actions";
import AnswersForm from "./components/AnswersForm";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(setQuestions());
    dispatch(fetchUserQuestions());
  }, [dispatch]);
  const accessToken = Cookies.get("accessToken");
  return (
    <div className="App">
      <CustomNavbar isLoggedIn={accessToken ? true : false} />
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
        <Route path="/answersForm" element={<AnswersForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/Question" element={<Question />} />
      </Routes>
    </div>
  );
}
export default App;
