import {
  faAnglesRight,
  faPersonCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "react-bootstrap";

const RecentQuestions = () => {
  const testArray = [
    {
      avatar: "https://placekitten.com/200/300",
      username: "Igor",
      title: "Why kotlin?",
      time: new Date().toLocaleDateString("gb-en"),
    },
    {
      avatar: "https://placekitten.com/200/300",
      username: "Igor",
      title: "Why kotlin?",
      time: new Date().toLocaleDateString("gb-en"),
    },
    ,
    {
      avatar: "https://placekitten.com/200/300",
      username: "Igor",
      title: "Why kotlin?",
      time: new Date().toLocaleDateString("gb-en"),
    },
  ];
  return (
    <Row id="recentQuestions">
      <Col id="recentQuestions__left">
        <Row id="recentQuestions__left__top">
          {testArray[0] ? (
            <>
              <div id="recentQuestions__left__top__avatar">
                <img src={testArray[0]!.avatar} alt="user" />
              </div>{" "}
              <div id="recentQuestions__left__top__username">
                {testArray[0]!.username}
              </div>
              <div id="recentQuestions__left__top__title">
                {testArray[0]!.title}
              </div>
              <div id="recentQuestions__left__top__time">
                {testArray[0]!.time}
              </div>
              <div id="recentQuestions__left__top__btn">
                Go to question <FontAwesomeIcon icon={faAnglesRight} />
              </div>
            </>
          ) : (
            ""
          )}
        </Row>
        <Row id="recentQuestions__left__bottom">
          {testArray
            ? testArray.map((test, i) => (
                <>
                  <Row key={i} className="recentQuestions__single">
                    <span>{test!.username}</span>
                    <span>{test!.title}</span>
                    <span>{test!.time}</span>
                  </Row>
                  <hr />
                </>
              ))
            : ""}
        </Row>
      </Col>
      <Col id="recentQuestions__right">
        <div id="recentQuestions__right__img">
          <FontAwesomeIcon icon={faPersonCircleQuestion} />
        </div>
      </Col>
      <Button id="recentQuestions__btn">Show All Questions</Button>
    </Row>
  );
};
export default RecentQuestions;
