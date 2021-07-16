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
  replyTo,
  creatorImg,
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
    <>
      {replyTo === "none" && (
        <div className="comment-item" key={commentId}>
          <div className="d-flex" style={{ width: "auto" }}>
            <img
              src={creatorImg}
              alt="profile"
              style={{
                width: "50px",
                height: "50px",
                margin: "6px 3px",
                borderRadius: "16px",
              }}
            />
            <div>
              <div className="d-flex">
                <div
                  style={{
                    width: "auto",
                    fontWeight: "bold",
                    paddingLeft: "5px",
                  }}
                >
                  {creatorName ? creatorName : creator}
                </div>
                <div className="time-for-day">
                  <TimeForDay date={date} />
                </div>
              </div>
              <p
                style={{
                  fontWeight: "bolder",
                  maxWidth: "300px",
                  wordBreak: "break-all",
                  paddingLeft: "5px",
                }}
              >
                {contents}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  const myComment = (
    <>
      {replyTo === "none" && (
        <div className="comment-item" key={commentId}>
          <div className="d-flex" style={{ width: "auto" }}>
            <img
              src={creatorImg}
              alt="profile"
              style={{
                width: "50px",
                height: "50px",
                margin: "6px 3px",
                borderRadius: "16px",
              }}
            />
            <div>
              <div className="d-flex">
                <div
                  style={{
                    width: "auto",
                    fontWeight: "bold",
                    paddingLeft: "5px",
                  }}
                >
                  {creatorName ? creatorName : creator}
                </div>
                <div className="time-for-day">
                  <TimeForDay date={date} />
                </div>
                <button
                  onClick={() => onCommentDelete(commentId)}
                  style={{
                    border: "0",
                    outline: "0",
                    backgroundColor: "white",
                    fontSize: "small",
                    padding: "0px 0px 0px 5px",
                    height: "25px",
                    paddingTop: "5px",
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button
                  onClick={setToggle}
                  style={{
                    border: "0",
                    outline: "0",
                    backgroundColor: "white",
                    fontSize: "small",
                    height: "25px",
                    paddingTop: "5px",
                  }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
              </div>
              <p
                style={{
                  fontWeight: "bolder",
                  maxWidth: "300px",
                  wordBreak: "break-all",
                  paddingLeft: "5px",
                }}
              >
                {contents}
              </p>
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
      )}
    </>
  );

  return <>{userId === creator ? myComment : anotherComment}</>;
};

export default CommentItem;
