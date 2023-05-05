import { Card } from "react-bootstrap";
import { Question } from "../../redux/interfaces";
import "../../css/singleCard.css";

interface SQuestionProps {
  question: Question;
}

export function SingleQuestion(props: SQuestionProps) {
  const MAX_DESCRIPTION_LENGTH = 160;
  return (
    <Card className="border-opacity-25 shadow">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Card.Title as="h1" className="header-text">
            {props.question.title}
          </Card.Title>
        </div>
        <div className="d-flex justify-content-start align-items-center tags">
          {props.question.tags.map((tag, i) => (
            <span key={i} className="badge  text-bg-warning">
              {tag}
            </span>
          ))}
        </div>
        <Card.Text className="px-1" style={{ textAlign: "start" }}>
          {props.question.description.substring(0, MAX_DESCRIPTION_LENGTH)}
          {props.question.description.length > MAX_DESCRIPTION_LENGTH && (
            <span className="text-muted"> ...</span>
          )}
        </Card.Text>
        <Card.Footer className="d-flex justify-content-between align-items-center">
          <small className="footer-text">
            {props.question.updatedAt
              ? (() => {
                  const now = new Date();
                  const updatedAt = new Date(props.question.updatedAt);
                  const diffInSeconds = Math.round(
                    (now.getTime() - updatedAt.getTime()) / 1000
                  );

                  if (diffInSeconds < 60) {
                    return `${diffInSeconds} second${
                      diffInSeconds === 1 ? "" : "s"
                    } ago`;
                  } else if (diffInSeconds < 3600) {
                    const diffInMinutes = Math.round(diffInSeconds / 60);
                    return `${diffInMinutes} minute${
                      diffInMinutes === 1 ? "" : "s"
                    } ago`;
                  } else if (diffInSeconds < 86400) {
                    const diffInHours = Math.round(diffInSeconds / 3600);
                    return `${diffInHours} hour${
                      diffInHours === 1 ? "" : "s"
                    } ago`;
                  } else {
                    const diffInDays = Math.round(diffInSeconds / 86400);
                    return `${diffInDays} day${
                      diffInDays === 1 ? "" : "s"
                    } ago`;
                  }
                })()
              : ""}
          </small>
          {props.question.answered ? (
            <span className="badge rounded-pill text-bg-success">Answered</span>
          ) : (
            ""
          )}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
