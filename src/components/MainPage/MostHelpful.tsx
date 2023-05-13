import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./mainPage.css";

const MostHelpful = () => {
  const name = "Igor";
  const numberAnswered = 42;
  const reputation = 69;
  return (
    <Row id="mostHelpful">
      <Col className="md-4 mostHelpful__left">
        <div id="mostHelpful__img">
          <img src="http://placekitten.com/200/300" alt="user"></img>
        </div>
      </Col>
      <Col className="md-4 mostHelpful__right">
        <span id="mostHelpful_name">{name}</span>

        <p id="mostHelpful_desc">The most helpful person</p>
        <span className="mostHelpful_span">
          <FontAwesomeIcon icon={faLightbulb} /> No. of answered questions:{" "}
          {numberAnswered}
        </span>
        <span className="mostHelpful_span">
          <FontAwesomeIcon icon={faHeart} color="red" /> {reputation} users
          likes them!
        </span>
        <Button id="mostHelpful__buton">Profile</Button>
      </Col>
    </Row>
  );
};
export default MostHelpful;
