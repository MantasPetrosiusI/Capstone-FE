import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import { newQuestion } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Question, RootState, User } from "../redux/interfaces";
import { Editor } from "@monaco-editor/react";
import "../css/questionForm.css";

const programmingLanguages = [
  "Javascript",
  "TypeScript",
  "Python",
  "Java",
  "Kotlin",
  "PHP",
  "C#",
  "Swift",
];

const QuestionForm = () => {
  const [question, setQuestion] = useState<Question>({
    _id: "",
    title: "",
    description: "",
    language: "",
    tags: [],
    user: {} as User,
    createdAt: new Date(),
    updatedAt: new Date(),
    noOfLikes: 0,
    answered: false,
    answers: [],
    likedBy: [],
    pending: true,
    accepted: false,
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.df.user);
  const tagsRef = useRef<HTMLInputElement>(null);
  const tagifyRef = useRef<Tagify>();
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      question.user = {
        _id: user._id,
        username: user.username,
        avatar: user.avatar,
        online: user.online,
        email: user.email,
        reputation: user.reputation,
        role: user.role,
        answers: user.answers,
      };
      dispatch(newQuestion(question));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (value?: string) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      description: value || "",
    }));
  };

  useEffect(() => {
    if (tagsRef.current) {
      tagifyRef.current = new Tagify(tagsRef.current, {
        enforceWhitelist: true,
        whitelist: programmingLanguages,
        dropdown: {
          enabled: 1,
        },
      });
      tagifyRef.current.on("add", (e) => {
        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          tags: tagifyRef.current!.value.map((tag) => tag.value),
        }));
      });
      tagifyRef.current.on("remove", (e) => {
        setQuestion((prevQuestion) => ({
          ...prevQuestion,
          tags: tagifyRef.current!.value.map((tag) => tag.value),
        }));
      });
    }
  }, []);

  return (
    <Container className="regLog" style={{ border: "1px solid #2c3b56" }}>
      <Row className="d-flex fluid">
        <Col>
          <Form onSubmit={onSubmit}>
            <Form.Text>User Details</Form.Text>
            <Form.Group id="userFormDetails" className="d-flex flex-column">
              <Form.Group className="d-flex flex-row justify-content-between">
                <Form.Label>Username</Form.Label>
                <Form.Label className="text-muted">{user.username}</Form.Label>
              </Form.Group>
              <Form.Group className="d-flex flex-row justify-content-between">
                <Form.Label>Reputation</Form.Label>
                <Form.Label className="text-muted">
                  {user.reputation}
                </Form.Label>
              </Form.Group>
              <Form.Group className="d-flex flex-row justify-content-between">
                <Form.Label>Role</Form.Label>
                <Form.Label className="text-muted">{user.role}</Form.Label>
              </Form.Group>
            </Form.Group>
            <hr />
            <Form.Text>Question Details</Form.Text>
            <Form.Group controlId="formProgrammingLanguage">
              <Form.Label>Programming Language</Form.Label>
              <Form.Select
                value={question.language}
                required
                onChange={(e) =>
                  setQuestion((prevQuestion) => ({
                    ...prevQuestion,
                    language: e.target.value,
                  }))
                }
              >
                <option value="">Select one</option>
                {programmingLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Question Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter question title here"
                value={question.title}
                onChange={(e) =>
                  setQuestion((prevQuestion) => ({
                    ...prevQuestion,
                    title: e.target.value,
                  }))
                }
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Question Description</Form.Label>
              <Editor
                onChange={onChange}
                value={question.description}
                language="text"
                height={"25vh"}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tags</Form.Label>
              <Form.Text
                id="tags"
                placeholder="Enter tags (optional)"
                ref={tagsRef}
              />
            </Form.Group>
            <hr />
            <Button className="mt-1 mb-4 log" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default QuestionForm;
