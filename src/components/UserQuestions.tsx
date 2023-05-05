import { Container, Row } from "react-bootstrap";
import { useAppSelector } from "../redux/hooks";
import { SingleQuestion } from "./UserProfile/SingleQuestion";

const UserQuestions = () => {
  const allUserQuestions = useAppSelector(
    (state) => state.df.questionState.questions
  );
  const answeredQuestions = allUserQuestions.filter(
    (question) => question.answered
  );
  const sortedAnsweredQuestions = [...answeredQuestions];
  sortedAnsweredQuestions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const unansweredQuestions = allUserQuestions.filter(
    (question) => !question.answered
  );
  const sortedUnansweredQuestions = [...unansweredQuestions];
  sortedUnansweredQuestions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <Container className="mt-4">
      {sortedAnsweredQuestions.length > 0 ? (
        <>
          <Row>
            <h1>Answered Questions</h1>
            {sortedAnsweredQuestions.map((question, i) => (
              <Row key={i} className="mt-2">
                <SingleQuestion question={question} />
              </Row>
            ))}
          </Row>
          <hr />
        </>
      ) : (
        ""
      )}
      {sortedUnansweredQuestions.length > 0 ? (
        <Row>
          <h1>Unanswered Questions</h1>
          {sortedUnansweredQuestions.map((question, i) => (
            <Row key={i} className="mt-3">
              <SingleQuestion question={question} />
            </Row>
          ))}
        </Row>
      ) : (
        ""
      )}
    </Container>
  );
};
export default UserQuestions;
