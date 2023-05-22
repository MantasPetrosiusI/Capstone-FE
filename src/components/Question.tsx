import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAnswer, fetchUser, likeQuestion } from "../redux/actions";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect, useState } from "react";
import { RootState } from "../redux/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faHeart as faHeartRegular,
} from "@fortawesome/free-solid-svg-icons";
import "../css/question.css";

const Question = () => {
  const location = useLocation();
  const { question } = location.state;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser(question.user));
    dispatch(fetchAnswer(question._id));
  }, [dispatch, question.user, question._id]);

  const user = useAppSelector((state: RootState) => state.df.user);
  const answerState = useAppSelector(
    (state: RootState) => state.df.fetchedAnswer
  );
  const [liked, setLiked] = useState(question.likedBy.includes(user?._id));

  useEffect(() => {
    setLiked(question.likedBy.includes(user?._id));
  }, [question.likedBy, user]);

  const handleLike = () => {
    dispatch(likeQuestion(question._id.toString()));
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <p className="title">{question.title}</p>
            {question.tags.length > 0 &&
              question.tags.map((tag: string, i: number) => (
                <p className="title" key={i}>
                  {tag}
                </p>
              ))}
            <p className="flip_description">{question.description}</p>
          </div>
          {answerState.body !== "" && answerState.selected ? (
            <div className="flip-card-back">
              <p className="title">{answerState.user.username}</p>
              <p className="flip_description">{answerState.body}</p>
            </div>
          ) : (
            <div className="flip-card-back">
              <Button
                onClick={() =>
                  navigate("/answersForm", { state: { question } })
                }
              >
                Submit your answer
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>
        <FontAwesomeIcon
          icon={liked ? faHeart : faHeartRegular}
          onClick={handleLike}
          className={`heart-icon ${liked ? "liked" : ""}`}
          color={liked ? "red" : undefined}
        />
      </div>
    </>
  );
};

export default Question;
