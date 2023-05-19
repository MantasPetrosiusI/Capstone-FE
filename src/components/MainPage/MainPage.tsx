import { Container } from "react-bootstrap";
import Hero from "./Hero";
import MostHelpful from "./MostHelpful";
import RecentQuestions from "./RecentQuestions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchUsers, setQuestions } from "../../redux/actions";
import { RootState } from "../../redux/interfaces";
import "./mainPage.css";

const MainPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setQuestions());
    dispatch(fetchUsers());
  }, [dispatch]);

  const questions = useAppSelector(
    (state: RootState) => state.df.questionState.questions
  );
  const users = useAppSelector((state: RootState) => state.df.allUsers);
  const sortedQuestionsByRep = questions
    .slice()
    .sort((a, b) => b.noOfLikes - a.noOfLikes);
  const sortedQuestionsByDate = questions
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? "").getTime() -
        new Date(a.updatedAt ?? "").getTime()
    );

  const sortedUsers = users.slice().sort((a, b) => b.reputation - a.reputation);
  return (
    <Container className="main__container fluid mt-4 mb-3">
      <Hero mostLiked={sortedQuestionsByRep[0]} />
      <MostHelpful user={sortedUsers[0]} />
      {questions.length > 0 ? (
        <div>
          <span id="recentQuestions__titlespan">Recent questions</span>
        </div>
      ) : (
        ""
      )}

      <RecentQuestions byDate={sortedQuestionsByDate} />
    </Container>
  );
};
export default MainPage;
