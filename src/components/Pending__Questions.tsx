import { Question } from "../redux/interfaces";
import "../css/pending.css";
import moment from "moment";
import { acceptRejectQuestion } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  props: Question[];
}

const PendingQuestions = (props: Props) => {
  console.log(props);
  const dispatch = useAppDispatch();
  const handleAccept = (questionId: string) => {
    dispatch(acceptRejectQuestion(questionId, true));
  };

  const handleReject = (questionId: string) => {
    dispatch(acceptRejectQuestion(questionId, false));
  };

  return (
    <Container>
      <h2>Pending Questions</h2>
      <Row>
        {props.props &&
          props.props.map((question, i) => (
            <Col key={question._id} sm={12} md={6} lg={4}>
              <Card className="pending-card">
                <Card.Header className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Subtitle className="mb-2 text-muted">
                      {question.user.username}
                    </Card.Subtitle>
                  </div>
                  <div className="text-center">
                    <Card.Title>{question.title}</Card.Title>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{question.description.slice(0, 100)}</Card.Text>

                  <Row className="justify-content-center mt-3">
                    <Col>
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => handleAccept(question._id)}
                      >
                        Accept
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={() => handleReject(question._id)}
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-muted fs-6 pending-card-footer">
                  {moment(question.updatedAt).fromNow()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PendingQuestions;
