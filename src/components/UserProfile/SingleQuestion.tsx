import { Card } from "react-bootstrap";
import { Question } from "../../redux/interfaces";
import "../../css/singleCard.css";

interface SingleQuestionProps {
  question: Question;
}

export function SingleQuestion(props: SingleQuestionProps) {
  const MAX_DESCRIPTION_LENGTH = 160;
  const { question } = props;
  const { title, language, tags, description, answered, updatedAt } = question;

  const getDescriptionPreview = () => {
    const truncatedDescription = description.substring(
      0,
      MAX_DESCRIPTION_LENGTH
    );
    const isTruncated = description.length > MAX_DESCRIPTION_LENGTH;
    return (
      <>
        {truncatedDescription}
        {isTruncated && <span className="text-muted"> ...</span>}
      </>
    );
  };

  const formatUpdatedAt = () => {
    if (updatedAt) {
      const now = new Date();
      const updatedAtDate = new Date(updatedAt);
      const diffInSeconds = Math.round(
        (now.getTime() - updatedAtDate.getTime()) / 1000
      );

      if (diffInSeconds < 60) {
        return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
      } else if (diffInSeconds < 3600) {
        const diffInMinutes = Math.round(diffInSeconds / 60);
        return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
      } else if (diffInSeconds < 86400) {
        const diffInHours = Math.round(diffInSeconds / 3600);
        return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
      } else {
        const diffInDays = Math.round(diffInSeconds / 86400);
        return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
      }
    }
    return "";
  };

  return (
    <Card className="border-opacity-25 shadow">
      <Card.Body>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <Card.Title as="h1" className="header-text">
            {title}
          </Card.Title>
        </div>
        <div className="d-flex justify-content-start align-items-center tags">
          <span>{language}</span>
        </div>
        <div className="d-flex justify-content-start align-items-center tags">
          {tags.map((tag, i) => (
            <span key={i} className="badge  text-bg-secondary">
              {tag}
            </span>
          ))}
        </div>
        <Card.Text className="px-1" style={{ textAlign: "start" }}>
          {getDescriptionPreview()}
        </Card.Text>
        <Card.Footer className="d-flex justify-content-end align-items-center">
          {answered && (
            <span className="badge rounded-pill text-bg-success">Answered</span>
          )}
          <small className="footer-text">{formatUpdatedAt()}</small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}
