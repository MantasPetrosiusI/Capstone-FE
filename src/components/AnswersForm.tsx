import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Editor } from "@monaco-editor/react";

import { newAnswer } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Answer, RootState } from "../redux/interfaces";
import Loader from "./Loader";

const AnswersForm = () => {
  const [aDesc, setADesc] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.df.user);
  const location = useLocation();
  const { question } = location.state;
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const answer: Answer = {
        _id: "",
        user: { ...user },
        body: aDesc,
        pending: true,
        accepted: false,
        question: question._id,
        updatedAt: new Date(),
      };
      dispatch(newAnswer(answer, question._id));
      navigate("/Question", { state: { question } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (value: string | undefined) => {
    setADesc(value || "");
  };

  return (
    <Container className="regLog" style={{ border: "1px solid #2c3b56" }}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
                <Button className="mt-1 mb-4 log" type="submit">
                  Submit Answer
                </Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default AnswersForm;
