import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../css/profile.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { editAvatar } from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { SingleQuestion } from "./SingleQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/interfaces";

const UserProfile: React.FC = () => {
  const location = useLocation();
  const user = location.state;
  const dispatch = useAppDispatch();
  const userQuestions = useAppSelector(
    (state: RootState) => state.df.userQuestionState
  ).questions;
  let slicedArray = [];
  if (userQuestions.length > 1) {
    const sortedQuestions = [...userQuestions];

    sortedQuestions.sort(
      (a, b) =>
        new Date(b.updatedAt!)?.getTime() - new Date(a.updatedAt!).getTime()
    );
    slicedArray = sortedQuestions.slice(0, 3);
  } else {
    const sortedQuestions = [...userQuestions];
    slicedArray = sortedQuestions.slice(0, 1);
  }

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
  let answerLength = 0;
  if (user.answers) {
    answerLength = user.answers.length;
  }
  let questionLength = 0;
  if (user.answers) {
    questionLength = user.questions.length;
  }

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
              <p>Answered: {user.answers ? answerLength : 0} </p>
              <p>Asked: {user.questions ? questionLength : 0}</p>
            </div>
            <div className="cover">
              <p>{user.username}</p>
            </div>
          </div>
        </Col>
        <Col>
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fs-4 fw-normal mb-0">Recent questions</p>
            </div>

            {slicedArray.length > 0
              ? slicedArray.map((question, i) => (
                  <Row
                    key={i}
                    className="g-2 mt-2"
                    onClick={() =>
                      navigate("/Question", { state: { question } })
                    }
                  >
                    <SingleQuestion question={question} />
                  </Row>
                ))
              : "No questions yet."}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
