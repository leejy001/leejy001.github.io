import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  COMMENT_LOADING_REQUEST,
  COMMENT_DELETE_REQUEST,
} from "../../redux/types";
import CommentItem from "./CommentItem";
import Comments from "../../components/comments/Comments";
import { Container } from "reactstrap";

function CommentList({ id, userId, userName }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch({
      type: COMMENT_LOADING_REQUEST,
      payload: id,
    });
    console.log("dasdas");
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
    <Container className="mb-3 border border-blue rounded">
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
  );
}

export default CommentList;
