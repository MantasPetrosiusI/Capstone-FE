import {
  faAnglesRight,
  faPersonCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { Question } from "../../redux/interfaces";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface RecentQuestionsProps {
  byDate: Question[];
}

const RecentQuestions = (props: RecentQuestionsProps) => {
  const navigate = useNavigate();
  const { byDate } = props;

  if (!byDate || byDate.length === 0) {
    return null;
  }

  const question = byDate[0];

  const goToQuestion = (question: Question) => {
    navigate("/Question", { state: { question } });
  };

  const goToAllQuestions = () => {
    navigate("/unansweredQuestions", { state: { allQuestions: byDate } });
  };

  return (
    <Row id="recentQuestions">
      <Col id="recentQuestions__left">
        <Row id="recentQuestions__left__top">
          <div id="recentQuestions__left__top__avatar">
            <img src={question.user.avatar} alt="user" />
          </div>
          <div id="recentQuestions__left__top__username">
            {question.user.username}
          </div>
          <div id="recentQuestions__left__top__title">{question.title}</div>
          <div id="recentQuestions__left__top__time">
            {format(new Date(question.updatedAt), "dd/MM/yy")}
          </div>
          <div
            id="recentQuestions__left__top__btn"
            onClick={() => goToQuestion(question)}
          >
            Go to question <FontAwesomeIcon icon={faAnglesRight} />
          </div>
        </Row>
        <Row id="recentQuestions__left__bottom">
          {byDate.map((question, i) => (
            <Row
              key={i}
              className="recentQuestions__single"
              onClick={() => goToQuestion(question)}
            >
              <span>{question.user.username}</span>
              <span>{question.title}</span>
              <span>{format(new Date(question.updatedAt), "dd/MM/yy")}</span>
            </Row>
          ))}
        </Row>
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
};

export default RecentQuestions;
