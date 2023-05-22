import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/interfaces";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editAvatar } from "../../redux/actions";
import { SingleQuestion } from "./SingleQuestion";
import "../../css/profile.css";

const UserProfile: React.FC = () => {
  const location = useLocation();
  const user = location.state;
  const dispatch = useAppDispatch();
  const userQuestions = useAppSelector(
    (state: RootState) => state.df.userQuestionState.questions
  );

  const [newAvatar, setNewAvatar] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setNewAvatar(file);
    if (file) {
      dispatch(editAvatar(file));
    }
  };

  useEffect(() => {}, [newAvatar]);

  const navigate = useNavigate();
  const answerLength = user.answers ? user.answers.length : 0;
  const questionLength = user.questions ? user.questions.length : 0;

  const sortedQuestions = [...userQuestions].sort(
    (a, b) =>
      new Date(b.updatedAt!)?.getTime() - new Date(a.updatedAt!).getTime()
  );
  const slicedArray = sortedQuestions.slice(
    0,
    Math.min(sortedQuestions.length, 2)
  );

  const acceptedQuestions = slicedArray.filter(
    (question) => question.accepted === true
  );

  return (
    <Container className="bookContainer">
      <Row>
        <Col>
          <div className="book">
            <label>
              <div>
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="profile__avatar"
                  style={{ width: "80%", zIndex: 1 }}
                  onClick={handleAvatarClick}
                />
                <div id="avatarChange">
                  <FontAwesomeIcon icon={faCamera} />
                  <h4 style={{ fontWeight: "800" }}>Change Avatar</h4>
                </div>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: "none" }}
                ref={fileInputRef}
              />
            </label>
            <p>{user.role}</p>
            <p>{user.email}</p>
            <div className="repAskedAnswered">
              <p>Reputation: {user.reputation}</p>
              <p>Answered: {answerLength}</p>
              <p>Asked: {questionLength}</p>
            </div>
            <div className="cover">
              <p>{user.username}</p>
            </div>
          </div>
        </Col>
        <Col>
          <div>
            {acceptedQuestions.length > 0 ? (
              <Row className=" g-2 mt-2">
                {acceptedQuestions.map((question) => (
                  <Col
                    key={question._id}
                    className="questions__profile"
                    onClick={() =>
                      navigate("/Question", { state: { question } })
                    }
                  >
                    <SingleQuestion question={question} />
                  </Col>
                ))}
              </Row>
            ) : (
              <p>No accepted questions yet.</p>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
