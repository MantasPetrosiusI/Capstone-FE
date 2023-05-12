import { Button, Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { fetchAnswer, fetchUser } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { RootState } from "../redux/interfaces";

const Question = () => {
  const location = useLocation();
  const { question } = location.state;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser(question.user));
  }, [question.user]);

  let user = useAppSelector((state: RootState) => state.df.fetchedUser);
  let answerState = useAppSelector(
    (state: RootState) => state.df.fetchedAnswer
  );
  console.log(answerState.body);
  useEffect(() => {
    dispatch(fetchUser(question.user));
    dispatch(fetchAnswer(question._id, question.answers[0]));
  }, []);
  useEffect(() => {
    dispatch(fetchUser(question.user));

    dispatch(fetchAnswer(question._id, question.answers[0]));
  }, [question._id, question.answers, question.user]);

  return (
    <div className="container-fluid my-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="shadow rounded">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0 text-center">{}</h5>
              <p className="mb-0 small text-muted text-center">
                Asked by <strong>{user.username}</strong>, Reputation:{" "}
                <strong>{user.reputation}</strong>, Role:{" "}
                <strong>{user.role}</strong>
              </p>
              <h1>{question.title}</h1>
              <p className="mb-0 small text-muted text-center">
                Programming Language: <strong>{question.language}</strong>
              </p>
              <p className="mb-0 small text-muted text-center">
                Tags:{" "}
                {question &&
                  question.tags.map((tag: string, i: number) => {
                    <span key={i}>{tag}</span>;
                  })}
              </p>
            </Card.Header>
            <Card.Body>
              <p className="card-text">
                <strong>Description:</strong> {question.description}
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
      {answerState.body !== "" ? (
        <div className="row justify-content-center mt-5">
          <div className="col-md-8">
            <Card className="shadow rounded">
              <Card.Header className="bg-white py-3">
                <hr />
                <p className="mb-0 small text-muted text-center">
                  Answered by <strong>{answerState.user.username}</strong>,
                  Reputation: <strong>{answerState.user.reputation}</strong>,
                  Role: <strong>{answerState.user.role}</strong>
                </p>
              </Card.Header>
              <Card.Body>
                <p className="card-text">
                  <strong>Answer:</strong> {answerState.body}
                </p>
              </Card.Body>
            </Card>
          </div>
        </div>
      ) : (
        <Link to="/answersForm" state={question}>
          <Button>Submit your answer</Button>
        </Link>
      )}
    </div>
  );
};
export default Question;
