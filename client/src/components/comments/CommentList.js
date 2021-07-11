import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_DELETE_REQUEST,
} from "../../redux/types";
import CommentItem from "./CommentItem";
import Comments from "../../components/comments/Comments";
import { Collapse, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";

function CommentList({ id, userId, userName }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);
  const [isOpen, setIsOpen] = useState(false);

  const setToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
  }, [dispatch, id]);

  const onCommentDelete = (commentId) => {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
      payload: {
        id: id,
        commentId: commentId,
        token: localStorage.getItem("token"),
      },
    });
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <button
          onClick={setToggle}
          style={{
            backgroundColor: "white",
            width: "auto",
            border: "1px solid lightgray",
            borderRadius: "20px",
            color: "gray",
            padding: "5px 20px",
            fontWeight: "bold",
          }}
        >
          <FontAwesomeIcon
            icon={faCommentDots}
            style={{ marginRight: "5px" }}
          />
          댓글 보기
        </button>
      </div>
      <Collapse isOpen={isOpen}>
        <Container
          className="mb-3 border border-blue rounded"
          style={{
            justifyContent: "center",
            backgroundColor: "lightBlue",
            marginTop: "10px",
            paddingTop: "10px",
          }}
        >
          {Array.isArray(comments)
            ? comments.map(({ contents, creator, date, _id, creatorName }) => (
                <CommentItem
                  key={_id}
                  id={id}
                  commentId={_id}
                  creatorName={creatorName}
                  creator={creator}
                  date={date}
                  contents={contents}
                  userId={userId}
                  onCommentDelete={onCommentDelete}
                />
              ))
            : "Creator"}
          <Comments id={id} userId={userId} userName={userName} />
        </Container>
      </Collapse>
    </>
  );
}

export default CommentList;