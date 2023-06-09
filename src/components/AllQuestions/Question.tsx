import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchAnswer,
  fetchUser,
  likeQuestion,
  setQuestions,
} from "../../redux/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useMemo, useState } from "react";
import { RootState } from "../../redux/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import "../../css/question.css";

const Question = () => {
  const location = useLocation();
  const { question } = location.state;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser(question.user._id));
    dispatch(fetchAnswer(question._id));
  }, [dispatch, question.user, question._id]);

  const user = useAppSelector((state: RootState) => state.df.user);
  const answerState = useAppSelector(
    (state: RootState) => state.df.fetchedAnswer
  );
  const [liked, setLiked] = useState(question.likedBy.includes(user?._id));
  const answer = useMemo(() => Object.values(answerState)[0], [answerState]);

  useEffect(() => {
    setLiked(question.likedBy.includes(user?._id));
  }, [question.likedBy, user]);

  const handleLike = () => {
    dispatch(likeQuestion(question._id.toString()));
    setLiked(!liked);
    dispatch(setQuestions());
  };
  const MAX_DESCRIPTION_LENGTH = 350;
  const truncatedDescription = question.description.substring(
    0,
    MAX_DESCRIPTION_LENGTH
  );
  const showEllipsis = question.description.length > MAX_DESCRIPTION_LENGTH;

  const navigate = useNavigate();

  return (
    <>
      {question.accepted ? (
        <div className="mb-4">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <p className="title fs-2 justify-content-center">
                  {question.title}
                </p>
                {question.tags.map((tag: string, i: number) => (
                  <span className="tags fs-4 " key={i}>
                    {tag}
                  </span>
                ))}
                <p className="flip_description">
                  {truncatedDescription}
                  {showEllipsis && <span className="text-muted"> ...</span>}
                </p>
              </div>
              {answer && answer.accepted === true ? (
                <div className="flip-card-back">
                  <p className="title-admin">{answer.user.username}</p>
                  <p className="flip_description">{answer.body}</p>
                </div>
              ) : (
                <div className="flip-card-back">No answer yet</div>
              )}
            </div>
          </div>
          {user?._id === question.user._id ? (
            <div className="question__bottom">
              {!question.answered ? (
                <Button
                  onClick={() =>
                    navigate("/answersForm", { state: { question } })
                  }
                >
                  Submit your answer
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="question__bottom">
              {liked ? (
                <Button onClick={handleLike}>
                  <span>Dislike</span>{" "}
                  <FontAwesomeIcon icon={faHeartSolid} color={"red"} />
                </Button>
              ) : (
                <Button onClick={handleLike}>
                  <span>Like </span>
                  <FontAwesomeIcon icon={faHeartSolid} color={undefined} />
                </Button>
              )}
              {!question.answered ? (
                <Button
                  onClick={() =>
                    navigate("/answersForm", { state: { question } })
                  }
                >
                  Submit your answer
                </Button>
              ) : null}
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Question;
