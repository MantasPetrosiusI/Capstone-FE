import { Container } from "react-bootstrap";
import Hero from "./Hero";
import MostHelpful from "./MostHelpful";
import RecentQuestions from "./RecentQuestions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsers, setQuestions } from "../../redux/actions";
import { RootState, Question, User } from "../../redux/interfaces";
import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { useMemo, useEffect } from "react";

const MainPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setQuestions());
    dispatch(fetchUsers());
  }, [dispatch]);

  const { questionState, allUsers } = useAppSelector(
    (state: RootState) => state.df
  );

  const { questions } = questionState;
  const sortedQuestionsByRep = useMemo(() => {
    return [...questions].sort((a, b) => b.noOfLikes - a.noOfLikes);
  }, [questions]);

  const sortedQuestionsByDate = useMemo(() => {
    return [...questions].sort(
      (a, b) =>
        new Date(b.updatedAt ?? "").getTime() -
        new Date(a.updatedAt ?? "").getTime()
    );
  }, [questions]);

  const sortedUsers = useMemo(() => {
    return [...allUsers].sort((a, b) => b.reputation - a.reputation);
  }, [allUsers]);

  const handleClickQuestion = (question: Question) => {
    navigate("/Question", { state: { question } });
  };

  const handleClickUser = (user: User) => {
    navigate("/profile", { state: { user } });
  };

  return (
    <Container className="main__container fluid mb-3">
      <Search
        questions={questions}
        handleClickQuestion={handleClickQuestion}
        handleClickUser={handleClickUser}
      />
      <Hero mostLiked={sortedQuestionsByRep[0]} />
      <MostHelpful user={sortedUsers[0]} />
      {questions.length > 0 && (
        <div id="recentQuestions__titlespan">
          <span>Recent questions</span>
        </div>
      )}
      <RecentQuestions byDate={sortedQuestionsByDate} />
    </Container>
  );
};

export default MainPage;
