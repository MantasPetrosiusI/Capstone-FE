import { Answer } from "../redux/interfaces";
import "../css/pending.css";
import moment from "moment";
import { acceptRejectAnswer } from "../redux/actions";
import { useAppDispatch } from "../redux/hooks";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface Props {
  props: Answer[];
}

const PendingAnswers = (props: Props) => {
  console.log(props);
  const dispatch = useAppDispatch();
  const handleAccept = (answerId: string) => {
    dispatch(acceptRejectAnswer(answerId, true));
  };

  const handleReject = (answerId: string) => {
    dispatch(acceptRejectAnswer(answerId, false));
  };

  return (
    <Container>
      <h2>Pending Answers</h2>
      <Row>
        {Array.isArray(props.props) &&
          props.props.map((answer, i) => (
            <Col key={answer._id} sm={12} md={6} lg={4}>
              <Card className="pending-card">
                <Card.Header className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Subtitle className="mb-2 text-muted">
                      <Card.Title>Question:</Card.Title>
                      <Card.Text>{answer.question.description}</Card.Text>
                    </Card.Subtitle>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="mb-2 text-muted">Answer:</Card.Text>
                  <Card.Text>{answer.body}</Card.Text>
                  <Row className="justify-content-center mt-3">
                    <Col>
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => handleAccept(answer._id)}
                      >
                        Accept
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        className="w-100"
                        onClick={() => handleReject(answer._id)}
                      >
                        Reject
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer className="text-muted fs-6 pending-card-footer">
                  {moment(answer.updatedAt).fromNow()}
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default PendingAnswers;
