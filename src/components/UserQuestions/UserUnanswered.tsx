import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/interfaces";
import { SingleQuestion } from "../UserProfile/SingleQuestion";

const UserUnanswered = () => {
  const navigate = useNavigate();
  const allUserQuestions = useAppSelector(
    (state: RootState) => state.df.userQuestionState.questions
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5;
  const startIndex = (currentPage - 1) * pageSize;
  const filteredQuestions = allUserQuestions.filter(
    (question) =>
      !question.answered &&
      (!searchQuery ||
        question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        question.tags.some((tag: string) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        question.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const sortedQuestions = [...filteredQuestions].sort(
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
      {sortedQuestions.length > 0 ? (
        <>
          <h1>Unanswered Questions</h1>
          {currentQuestions.map((question) => (
            <Row
              key={question._id}
              className="mt-3"
              onClick={() => navigate("/Question", { state: { question } })}
            >
              <SingleQuestion question={question} />
            </Row>
          ))}
          <nav className="mt-3">
            <ul className="pagination">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(
                (page) => (
                  <li className="page-item ms-1" key={page}>
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
          <span>No questions have been answered!</span>
          <hr />
        </div>
      )}
    </Container>
  );
};

export default UserUnanswered;
