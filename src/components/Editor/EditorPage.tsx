import { Col, Container, Row } from "react-bootstrap";
import MonacoEditor from "./MonacoEditor";
import { useState } from "react";
import "../../css/editor.css";

const EditorPage = () => {
  const [result, setResult] = useState("");

  const handleResultChange = (newResult: string) => {
    setResult(newResult);
  };

  return (
    <Container className="editor">
      <Row>
        <Col>
          <MonacoEditor onResultChange={handleResultChange} />
        </Col>
        <Col>
          <div>{result}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditorPage;
