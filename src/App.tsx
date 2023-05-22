import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CustomNavbar from "./components/Navbar";
import { Route, Routes, useMatch } from "react-router-dom";
import Register from "./components/LoginRegister/Register";
import Login from "./components/LoginRegister/Login";
import EditorPage from "./components/Editor/EditorPage";
import UserProfile from "./components/UserProfile/UserProfile";
import QuestionsForm from "./components/QuestionsForm";
import UserUnanswered from "./components/UserQuestions/UserUnanswered";
import UserAnswered from "./components/UserQuestions/UserAnswered";
import Question from "./components/Question";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { useEffect } from "react";
import {
  setQuestions,
  fetchUserQuestions,
  setCurrentUser,
  fetchUsers,
  fetchPendingQuestions,
  fetchPendingAnswers,
} from "./redux/actions";
import AnswersForm from "./components/AnswersForm";
import { MainPage } from "./components";
import PendingAnswers from "./components/Pending__Answers";
import PendingQuestions from "./components/Pending__Questions";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setCurrentUser());
    dispatch(setQuestions());
    dispatch(fetchUserQuestions());
    dispatch(fetchUsers());
    dispatch(fetchPendingQuestions());
    dispatch(fetchPendingAnswers());
  }, [dispatch]);
  const user = useAppSelector((state) => state.df.user);
  const pendingQuestions = useAppSelector((state) => state.df.pendingQuestions);
  const pendingAnswers = useAppSelector((state) => state.df.pendingAnswers);

  const matchPendingQuestions = useMatch("/pending__questions");
  const matchPendingAnswers = useMatch("/pending__answers");

  return (
    <div className="App">
      <CustomNavbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/myAnswered" element={<UserAnswered />} />
        <Route path="/myUnanswered" element={<UserUnanswered />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/questionForm" element={<QuestionsForm />} />
        <Route path="/answersForm" element={<AnswersForm />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/Question" element={<Question />} />
        <Route
          path="/pending__questions"
          element={
            (user.role === "Administrator" || user.role === "Moderator") &&
            matchPendingQuestions ? (
              <PendingQuestions props={pendingQuestions} />
            ) : (
              <h1>Access Denied</h1>
            )
          }
        />
        <Route
          path="/pending__answers"
          element={
            (user.role === "Administrator" || user.role === "Moderator") &&
            matchPendingAnswers ? (
              <PendingAnswers props={pendingAnswers} />
            ) : (
              <h1>Access Denied</h1>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
