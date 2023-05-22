import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { Question } from "../../redux/interfaces";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import "./recentQuestions.css";

interface RecentQuestionsProps {
  byDate: Question[];
}

const RecentQuestions: React.FC<RecentQuestionsProps> = React.memo(
  ({ byDate }) => {
    const navigate = useNavigate();

    if (!byDate || byDate.length === 0) {
      return null;
    }

    const goToQuestion = (question: Question) => {
      navigate("/Question", { state: { question } });
    };

    const goToAllQuestions = () => {
      navigate("/questions", { state: { allQuestions: byDate } });
    };

    return (
      <Row id="recentQuestions">
        <Col id="recentQuestions__left">
          {byDate.slice(0, 5).map((question) => (
            <Row
              key={question._id}
              className="recentQuestions__single"
              onClick={() => goToQuestion(question)}
            >
              <span>{question.user.username}</span>
              <span>{question.title}</span>
              <span>{format(new Date(question.updatedAt), "dd/MM/yy")}</span>
            </Row>
          ))}
          <div id="recentQuestions__btn" onClick={goToAllQuestions}>
            Show All Questions
          </div>
        </Col>
        <Col id="recentQuestions__right">
          <div id="recentQuestions__right__img">
            <FontAwesomeIcon icon={faPersonCircleQuestion} />
          </div>
        </Col>
      </Row>
    );
  }
);

export default RecentQuestions;
