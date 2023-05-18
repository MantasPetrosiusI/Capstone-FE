import { FormEvent, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../css/login.css";
import "../css/questionForm.css";
import { Editor } from "@monaco-editor/react";

import { newAnswer } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Answer, RootState } from "../redux/interfaces";

const AnswersForm = () => {
  const [aDesc, setADesc] = useState("");

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.df.currentUser);
  const location = useLocation();
  const { question } = location.state;

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const answer: Answer = {
        user: {
          _id: user._id,
          username: user.username,
          avatar: user.avatar,
          online: user.online,
          email: user.email,
          reputation: user.reputation,
          role: user.role,
          answers: user.answers,
        },
        body: aDesc,
        pending: true,
        selected: false,
        rejected: false,
        question: question._id,
      };
      dispatch(newAnswer(answer, question._id));
    } catch (error) {
      console.log(error);
    }
  };
  const onChange = (value?: string) => {
    setADesc(value || "");
  };

  return (
    <Container className="regLog" style={{ border: "1px solid #2c3b56" }}>
      <Row className="d-flex fluid">
        <Col>
          <Form onSubmit={onSubmit}>
            <hr />

            <Form.Group>
              <Form.Label>Answer</Form.Label>
              <Editor
                onChange={onChange}
                value={aDesc}
                language="text"
                height={"25vh"}
              />
            </Form.Group>
            <hr />
            <Link to={{ pathname: "/Question" }}>
              <Button className="mt-1 mb-4 log" type="submit">
                Submit Answer
              </Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default AnswersForm;
