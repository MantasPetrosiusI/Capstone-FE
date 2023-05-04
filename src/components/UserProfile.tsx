import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../css/profile.css";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { editAvatar } from "../redux/actions";

const UserProfile: React.FC = () => {
  const user = useAppSelector((state) => state.df.currentUser);

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
  const dispatch = useAppDispatch();
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
              <img
                src={user.avatar}
                alt="avatar"
                className="img-fluid img-thumbnail mt-4 mb-2"
                style={{ width: "80%", zIndex: 1 }}
                onClick={handleAvatarClick}
              />
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
                <p className="mb-1">[placeholder]</p>
                <p className="small text-muted mb-0">Asked</p>
              </div>
            </div>
          </div>
          <Card.Body className="p-4 text-black">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="lead fw-normal mb-0">Recent questions</p>
              <p className="mb-0">
                <a href="#!" className="text-muted">
                  Show all
                </a>
              </p>
            </div>
            <div className="row g-2">
              <div className="col mb-2">[question placeholder]</div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;