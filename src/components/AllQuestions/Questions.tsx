import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/interfaces";
import { SingleQuestion } from "../UserProfile/SingleQuestion";
import React from "react";
import "../../css/questions.css";
import Loader from "../Loader";

const UserAnswered = () => {
  const navigate = useNavigate();
  const allQuestions = useAppSelector(
    (state: RootState) => state.df.questionState.questions
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Answered");
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const answeredQuestions = allQuestions.filter(
    (question) => question.answered && question.accepted
  );
  const unAnsweredQuestions = allQuestions.filter(
    (question) => !question.answered && question.accepted
  );
  let filteredQuestions;
  if (category === "Answered") {
    filteredQuestions = answeredQuestions.filter(
      (question) =>
        !searchQuery ||
        question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        question.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (category === "Unanswered") {
    filteredQuestions = unAnsweredQuestions.filter(
      (question) =>
        !searchQuery ||
        question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        question.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const sortedQuestions = [...(filteredQuestions ?? [])].sort(
    (a, b) =>
      new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime()
  );
  const pageCount = Math.ceil(sortedQuestions.length / pageSize);
  const currentQuestions = sortedQuestions.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <Container className="mt-4">
      <div className="mb-3">
        <label htmlFor="search" className="form-label">
          Search Questions
        </label>
        <input
          type="text"
          className="form-control"
          id="search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <h1>{category} Questions</h1>
      <div className="buttons">
        <Button onClick={() => setCategory("Answered")}>Answered</Button>
        <Button onClick={() => setCategory("Unanswered")}>Unsnswered</Button>
      </div>
      {sortedQuestions.length > 0 ? (
        <>
          <Row className="mt-2">
            {currentQuestions.map((question, index) => (
              <Col
                key={question._id}
                onClick={() => navigate("/Question", { state: { question } })}
                md={3}
                lg={3}
                xl={3}
                className="mb-4 card-col"
              >
                <SingleQuestion question={question} />
              </Col>
            ))}
          </Row>

          <nav className="mt-3 mr-1">
            <ul className="pagination">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <li className="page-item" key={page}>
                    <button
                      className={`page-link ${
                        currentPage === page ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                )
              )}
            </ul>
          </nav>
        </>
      ) : (
        <div>
          <hr />
          <span>
            {category === "Answered" ? "All" : ""}
            {category === "Unanswered" ? "No" : ""} questions have been
            answered!
          </span>
          <hr />
        </div>
      )}

      {filteredQuestions === undefined && <Loader />}
    </Container>
  );
};

export default UserAnswered;
