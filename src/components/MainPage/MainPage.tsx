import {
  Container,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
} from "react-bootstrap";
import Hero from "./Hero";
import MostHelpful from "./MostHelpful";
import RecentQuestions from "./RecentQuestions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  fetchUsers,
  searchQuestions,
  searchUsers,
  setQuestions,
} from "../../redux/actions";
import { Question, RootState, User } from "../../redux/interfaces";
import "./mainPage.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [searchCategory, setSearchCategory] = useState("language");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setQuestions());
    dispatch(fetchUsers());
  }, [dispatch]);
  const { questionState, allUsers } = useAppSelector(
    (state: RootState) => state.df
  );
  const searchedQuestions = useAppSelector((state: RootState) => {
    const allSearchArray = Object.values(state.df.allSearch);
    return allSearchArray.filter((question) => question.accepted === true);
  });
  const searchedUsers = useAppSelector(
    (state: RootState) => state.df.allUsersSearch
  );
  const { questions } = questionState;

  const sortedQuestionsByRep = useMemo(() => {
    return [...questions].sort((a, b) => b.noOfLikes - a.noOfLikes);
  }, [questions]);
  const sortedQuestionsByDate = useMemo(() => {
    return [...questions].sort(
      (a, b) =>
        new Date(b.updatedAt ?? "").getTime() -
        new Date(a.updatedAt ?? "").getTime()
    );
  }, [questions]);
  const sortedUsers = useMemo(() => {
    return [...allUsers].sort((a, b) => b.reputation - a.reputation);
  }, [allUsers]);

  const recentQuestionsTitle = questions.length > 0 && (
    <div id="recentQuestions__titlespan">
      <span>Recent questions</span>
    </div>
  );

  const handleClickQuestion = (question: Question) => {
    navigate("/Question", { state: { question } });
  };
  const searchRef = useRef<HTMLDivElement>(null);
  const handleClickUser = (user: User) => {
    navigate("/profile", { state: { user } });
  };
  useEffect(() => {
    if (["tag", "language", "title"].includes(searchCategory)) {
      dispatch(searchQuestions(searchCategory, searchQuery));
    } else if (["username"].includes(searchCategory)) {
      dispatch(searchUsers(searchCategory, searchQuery));
    }
    if (searchRef) {
      searchRef.current?.focus();
    }
  }, [searchQuery, searchCategory, dispatch]);

  return (
    <Container className="main__container fluid mb-3">
      <div
        id="search"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        ref={searchRef}
      >
        <Form className="input-container d-flex">
          <FormControl
            placeholder="Start search"
            id="search__input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          searchQuery !== "" &&
          isFocused && (
            <div>
              <ul className="searchResult">
                {searchedQuestions.map((question) => (
                  <li className="searchResultLi" key={question._id}>
                    <div
                      onClick={() => {
                        console.log(1);
                        handleClickQuestion(question);
                      }}
                    >
                      {question.title}{" "}
                      <FontAwesomeIcon icon={faArrowRight} fontSize={"1rem"} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {searchedUsers &&
          searchedUsers.length > 0 &&
          searchQuery !== "" &&
          isFocused && (
            <div>
              <ul className="searchResult">
                {searchedUsers.map((user) => (
                  <li
                    className="searchResultLi"
                    key={user._id}
                    onClick={() => handleClickUser(user)}
                  >
                    {user.username}{" "}
                    <FontAwesomeIcon icon={faArrowRight} fontSize={"1rem"} />
                  </li>
                ))}
              </ul>
            </div>
          )}
      </div>
      <Hero mostLiked={sortedQuestionsByRep[0]} />
      <MostHelpful user={sortedUsers[0]} />
      {recentQuestionsTitle}
      <RecentQuestions byDate={sortedQuestionsByDate} />
    </Container>
  );
};

export default MainPage;
