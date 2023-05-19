import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./mainPage.css";
import { User } from "../../redux/interfaces";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect } from "react";
import { fetchUserAnswers } from "../../redux/actions";

interface MostHelpfulProps {
  user: User;
}

const MostHelpful = (props: MostHelpfulProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUserAnswers(props.user._id));
  }, [dispatch, props.user._id]);
  if (!props.user.answers) {
    return null;
  }

  return (
    <Row id="mostHelpful">
      <Col className="md-4 mostHelpful__left">
        <div id="mostHelpful__img">
          <img src={props.user.avatar} alt="user" />
        </div>
      </Col>
      <Col className="md-4 mostHelpful__right">
        <span id="mostHelpful_name">{props.user.username}</span>
        <p id="mostHelpful_desc">The most helpful person</p>
        <span className="mostHelpful_span">
          <FontAwesomeIcon icon={faLightbulb} /> No. of answered questions:{" "}
          {props.user.answers.length}
        </span>
        <span className="mostHelpful_span">
          <FontAwesomeIcon icon={faHeart} color="red" /> {props.user.reputation}{" "}
          users like them!
        </span>
        <Button id="mostHelpful__button">Profile</Button>
      </Col>
    </Row>
  );
};

export default MostHelpful;
