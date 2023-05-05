import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../css/profile.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  editAvatar,
  fetchUserQuestions,
  setQuestions,
} from "../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { SingleQuestion } from "./SingleQuestion";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setQuestions());
    dispatch(fetchUserQuestions());
  }, [dispatch]);
  const user = useAppSelector((state) => state.df.currentUser);
  const userQuestions = useAppSelector(
    (state) => state.df.questionState
  ).questions;
  const sortedQuestions = [...userQuestions];
  sortedQuestions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  const slicedArray = sortedQuestions.slice(0, 3);

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
  return (
    <Container className="py-5 h-100">
      <Row className="d-flex justify-content-center align-items-center h-100">
        <Col className="col-lg-9 col-xl-7">
          <Card className="mb-3" style={{ backgroundColor: "#93b9d0" }}>
            <div
              className="ms-4 mt-5 d-flex flex-column"
              style={{ width: "150px" }}
            />
            <label>
              <div>
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="img-fluid img-thumbnail mt-4 mb-2"
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
            <div className="ms-3">
              <h1>{user.username}</h1>
              <h5 style={{ color: "gray" }}>{user.role}</h5>
            </div>
          </Card>
          <div
            className="info p-4 text-black"
            style={{
              backgroundColor: "#f8f9fa",
              border: "1px solid #e99374",
            }}
          >
            <div className="d-flex justify-content-end text-center py-1">
              <div>
                <p className="mb-1">{user.reputation}</p>
                <p className="small text-muted mb-0">Reputation</p>
              </div>
              <div className="px-3">
                <p className="mb-1">[placeholder]</p>
                <p className="small text-muted mb-0">Answered </p>
              </div>
              <div>
                <p className="mb-1">{userQuestions.length}</p>
                <p className="small text-muted mb-0">Asked</p>
              </div>
            </div>
          </div>
          <Card.Body className="p-4 text-black">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fs-4 fw-normal mb-0">Recent questions</p>
              <p className="mb-0">
                <a
                  href="/myQuestions"
                  className="text-muted text-decoration-none"
                >
                  Show all
                </a>
              </p>
            </div>
            {slicedArray.map((question, i) => (
              <Row key={i} className="g-2 mt-2">
                <SingleQuestion question={question} />
              </Row>
            ))}
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
