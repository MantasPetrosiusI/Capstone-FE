import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAppSelector } from "../../redux/hooks";
import { SingleQuestion } from "../UserProfile/SingleQuestion";

const UserUnanswered = () => {
  const allUserQuestions = useAppSelector(
    (state) => state.df.questionState.questions
  );
  const unansweredQuestions = allUserQuestions.filter(
    (question) => !question.answered
  );
  const sortedUnansweredQuestions = [...unansweredQuestions];
  sortedUnansweredQuestions.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const pageCount = Math.ceil(sortedUnansweredQuestions.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentQuestions = sortedUnansweredQuestions.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container className="mt-4">
      {sortedUnansweredQuestions.length > 0 ? (
        <>
          <h1>Unanswered Questions</h1>
          {currentQuestions.map((question, i) => (
            <Row key={i} className="mt-3">
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
