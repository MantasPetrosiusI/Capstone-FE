import { Dropdown, DropdownButton, Form, FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { searchQuestions, searchUsers } from "../../redux/actions";
import { RootState, Question, User } from "../../redux/interfaces";
import { useNavigate } from "react-router-dom";
import "./mainPage.css";
interface SearchProps {
  questions: Question[];
  handleClickQuestion: (question: Question) => void;
  handleClickUser: (user: User) => void;
}

const Search: React.FC<SearchProps> = ({
  questions,
  handleClickQuestion,
  handleClickUser,
}) => {
  const [searchCategory, setSearchCategory] = useState("language");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchedQuestions = useAppSelector(
    (state: RootState) => state.df.allSearch
  );
  const searchedUsers = useAppSelector(
    (state: RootState) => state.df.allUsersSearch
  );

  useEffect(() => {
    if (["tag", "language", "title"].includes(searchCategory)) {
      dispatch(searchQuestions(searchCategory, searchQuery));
    } else if (["username"].includes(searchCategory)) {
      dispatch(searchUsers(searchCategory, searchQuery));
    }
  }, [searchQuery, searchCategory, dispatch]);

  useEffect(() => {
    if (!isFocused) {
      setSearchQuery("");
    }
  }, [isFocused]);

  const handleQuestionClick = (question: Question) => {
    handleClickQuestion(question);
    navigate("/Question", { state: { question } });
  };

  const handleUserClick = (user: User) => {
    handleClickUser(user);
    navigate("/profile", { state: { user } });
  };

  return (
    <div id="search">
      <Form className="input-container d-flex">
        <FormControl
          placeholder="Start search"
          id="search__input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <DropdownButton
          id="dropdown-basic-button"
          title={searchCategory}
          variant="none"
          align="end"
        >
          <Dropdown.Item onClick={() => setSearchCategory("language")}>
            language
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSearchCategory("title")}>
            title
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSearchCategory("tag")}>
            tag
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSearchCategory("username")}>
            username
          </Dropdown.Item>
        </DropdownButton>
      </Form>

      {searchedQuestions &&
        searchedQuestions.length > 0 &&
        searchQuery !== "" && (
          <div>
            <ul className="searchResult">
              {searchedQuestions.map((question) => (
                <li
                  className="searchResultLi"
                  key={question._id}
                  onClick={() => handleQuestionClick(question)}
                >
                  {question.title}{" "}
                  <FontAwesomeIcon icon={faArrowRight} fontSize={"1rem"} />
                </li>
              ))}
            </ul>
          </div>
        )}

      {searchedUsers && searchedUsers.length > 0 && searchQuery !== "" && (
        <div>
          <ul className="searchResult">
            {searchedUsers.map((user) => (
              <li
                className="searchResultLi"
                key={user._id}
                onClick={() => handleUserClick(user)}
              >
                {user.username}{" "}
                <FontAwesomeIcon icon={faArrowRight} fontSize={"1rem"} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
