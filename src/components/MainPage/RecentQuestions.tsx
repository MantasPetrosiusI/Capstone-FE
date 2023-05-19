import {
  faAnglesRight,
  faPersonCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";
import { Question, User } from "../../redux/interfaces";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface RecentQuestionsProps {
  byDate: Question[];
}

const RecentQuestions = (props: RecentQuestionsProps) => {
  const navigate = useNavigate();

  if (!props.byDate || props.byDate.length === 0) {
    return null;
  }

  const question = props.byDate[0];
  const allQuestions = props.byDate;

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
            onClick={() => navigate("/Question", { state: { question } })}
          >
            Go to question <FontAwesomeIcon icon={faAnglesRight} />
          </div>
        </Row>
        <Row id="recentQuestions__left__bottom">
          {props.byDate.map((question, i) => (
            <Row
              key={i}
              className="recentQuestions__single"
              onClick={() => navigate("/Question", { state: { question } })}
            >
              <span>{question.user.username}</span>
              <span>{question.title}</span>
              <span>{format(new Date(question.updatedAt), "dd/MM/yy")}</span>
            </Row>
          ))}
        </Row>
        <div
          id="recentQuestions__btn"
          onClick={() =>
            navigate("/unansweredQuestions", { state: { allQuestions } })
          }
        >
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
