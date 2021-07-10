import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Row, Form, Input, Button, Collapse } from "reactstrap";
import { COMMENT_UPLOADING_EDIT_REQUEST } from "../../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import TimeForDay from "../post/TimeForDay";

const CommentItem = ({
  id,
  commentId,
  creatorName,
  creator,
  date,
  contents,
  userId,
  onCommentDelete,
}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [newContents, setNewContents] = useState(contents);

  const setToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSubmit = async (e) => {
    await e.preventDefault();
    const token = localStorage.getItem("token");
    const body = {
      newContents,
      token,
      id,
      commentId,
      creator,
      creatorName,
    };

    dispatch({
      type: COMMENT_UPLOADING_EDIT_REQUEST,
      payload: body,
    });
    resetValue.current.value = "";
    setNewContents("");
    setToggle(!isOpen);
  };

  const resetValue = useRef(null);

  const onChange = async (e) => {
    setNewContents(e.target.value);
  };

  const anotherComment = (
    <div className="comment-item" key={commentId}>
      <div className="time-for-day-top">
        <TimeForDay date={date} />
      </div>
      <div className="d-flex" style={{ width: "auto" }}>
        <div style={{ width: "auto", fontWeight: "bold" }}>
          {creatorName ? creatorName : creator}
        </div>
        <div className="comment-bubble d-flex">
          <p
            style={{
              fontWeight: "bolder",
              maxWidth: "300px",
              wordBreak: "break-all",
            }}
          >
            {contents}
          </p>
        </div>
        <div className="time-for-day">
          <TimeForDay date={date} />
        </div>
      </div>
    </div>
  );

  const myComment = (
    <div className="comment-item" key={commentId}>
      <div className="time-for-day-top" style={{ textAlign: "right" }}>
        <TimeForDay date={date} />
      </div>
      <div className="d-flex justify-content-end" style={{ width: "auto" }}>
        <div className="time-for-day">
          <TimeForDay date={date} />
        </div>
        <div className="my-comment-bubble d-flex">
          <p
            style={{
              fontWeight: "bolder",
              maxWidth: "300px",
              wordBreak: "break-all",
            }}
          >
            {contents}
          </p>
          <>
            <button
              onClick={() => onCommentDelete(commentId)}
              style={{
                border: "0",
                outline: "0",
                backgroundColor: "yellow",
                fontSize: "small",
                padding: "0px 5px 0px 10px",
                height: "25px",
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
            <button
              onClick={setToggle}
              style={{
                border: "0",
                outline: "0",
                backgroundColor: "yellow",
                fontSize: "small",
                height: "25px",
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </>
        </div>
        <div style={{ width: "auto", fontWeight: "bold" }}>
          {creatorName ? creatorName : creator}
        </div>
      </div>
      <Collapse isOpen={isOpen}>
        <Form onSubmit={onSubmit}>
          <Row className="p-2">
            <div className="font-weight-bold m-1">Edit Comment </div>
            <div className="my-1" />
            <Input
              style={{ height: "100px" }}
              innerRef={resetValue}
              type="textarea"
              onChange={onChange}
              value={newContents}
            />
            <Button
              color="primary"
              block
              className="mt-2 offset-md-10 col-md-2 "
            >
              Submit
            </Button>
          </Row>
        </Form>
      </Collapse>
    </div>
  );

  return <>{userId === creator ? myComment : anotherComment}</>;
};

export default CommentItem;
