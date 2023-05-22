import { Container } from "react-bootstrap";
import Hero from "./Hero";
import MostHelpful from "./MostHelpful";
import RecentQuestions from "./RecentQuestions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo } from "react";
import { fetchUsers, setQuestions } from "../../redux/actions";
import { RootState } from "../../redux/interfaces";
import "./mainPage.css";

const MainPage = () => {
  const dispatch = useAppDispatch();

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

  const recentQuestionsTitle = questions.length > 0 && (
    <div>
      <span id="recentQuestions__titlespan">Recent questions</span>
    </div>
  );

  return (
    <Container className="main__container fluid mt-4 mb-3">
      <Hero mostLiked={sortedQuestionsByRep[0]} />
      <MostHelpful user={sortedUsers[0]} />
      {recentQuestionsTitle}
      <RecentQuestions byDate={sortedQuestionsByDate} />
    </Container>
  );
};

export default MainPage;
