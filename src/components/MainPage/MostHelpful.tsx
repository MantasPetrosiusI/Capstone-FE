import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import "./mostHelpful.css";
import { User } from "../../redux/interfaces";

interface MostHelpfulProps {
  user: User;
}

const MostHelpful: React.FC<MostHelpfulProps> = ({ user }) => {
  if (!user.answers) {
    return null;
  }

  return (
    <Row id="mostHelpful">
      <Col md={4} className="mostHelpful__left">
        <div id="mostHelpful__img">
          <img src={user.avatar} alt="user" />
        </div>
      </Col>
      <Col md={4} className="mostHelpful__right">
        <span id="mostHelpful_name">{user.username}</span>
        <p id="mostHelpful_desc">The most helpful person</p>
        <span className="mostHelpful_span">
          <FontAwesomeIcon icon={faLightbulb} /> No. of answered questions:{" "}
          {user.answers.length}
        </span>
        <span className="mostHelpful_span">
          <FontAwesomeIcon icon={faHeart} color="maroon" /> {user.reputation}{" "}
          users like them!
        </span>
        <Button id="mostHelpful__button">Profile</Button>
      </Col>
    </Row>
  );
};

export default MostHelpful;
