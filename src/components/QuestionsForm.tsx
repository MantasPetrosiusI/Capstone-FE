import { FormEvent, useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import "../css/questionForm.css";
import Tagify from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";

import { newQuestion } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Question } from "../redux/interfaces";

const QuestionForm = () => {
  const [qTitle, setQTitle] = useState("");
  const [qDesc, setQDesc] = useState("");
  const [progLang, setProgLang] = useState("");
  const [qTags, setQTags] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.df.currentUser);
  const tagsRef = useRef<HTMLInputElement>(null);
  const tagifyRef = useRef<Tagify>();

  useEffect(() => {
    if (tagsRef.current) {
      tagifyRef.current = new Tagify(tagsRef.current, {
        enforceWhitelist: true,
        whitelist: programmingLanguages,
        dropdown: {
          enabled: 1, // show the dropdown immediately after the user starts typing
        },
      });
      tagifyRef.current.on("add", (e) => {
        setQTags(tagifyRef.current!.value.map((tag) => tag.value));
      });
      tagifyRef.current.on("remove", (e) => {
        setQTags(tagifyRef.current!.value.map((tag) => tag.value));
      });
    }
  }, []);

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

  const onSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const question: Question = {
        _id: "",
        title: qTitle,
        description: qDesc,
        language: progLang,
        tags: qTags,
        user: {
          username: user.username,
          reputation: user.reputation,
          role: user.role,
        },
        answered: false,
      };
      dispatch(newQuestion(question));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container className="regLog" style={{ border: "1px solid #2c3b56" }}>
        <Row className="d-flex fluid">
          <Col>
            <Form onSubmit={onSubmit}>
              <Form.Text>User Details</Form.Text>
              <Form.Group id="userFormDetails" className="d-flex flex-column">
                <Form.Group className="d-flex flex-row justify-content-between">
                  <Form.Label>Username</Form.Label>
                  <Form.Label className="text-muted">
                    {user.username}
                  </Form.Label>
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
                  value={progLang}
                  required
                  onChange={(e) => setProgLang(e.target.value)}
                >
                  <option value="">Select one</option>
                  {programmingLanguages.map((lang, i) => (
                    <option key={i} value={lang}>
                      {lang}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Question Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ener question title here"
                  value={qTitle}
                  onChange={(e) => setQTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Question Description</Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="Be as descriptive as possible"
                  value={qDesc}
                  onChange={(e) => setQDesc(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Text
                  id="tags"
                  placeholder="Ener tags (optional)"
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
    </>
  );
};
export default QuestionForm;