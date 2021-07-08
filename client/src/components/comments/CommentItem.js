import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Row, Form, FormGroup, Input, Button } from "reactstrap";
import { COMMENT_UPLOADING_EDIT_REQUEST } from "../../redux/types";

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

  console.log(userId, creator);

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
    console.log(newContents);
  };

  return (
    <div>
      <Row className="d-flex">
        <div
          className="font-weight-bold"
          style={{ maxWidth: "150px", width: "auto" }}
        >
          {creatorName ? creatorName : creator}
        </div>
      </Row>
      <Row className="p-2">
        <div>{contents}</div>
      </Row>
      {userId === creator && (
        <>
          <button onClick={() => onCommentDelete(commentId)}>Delete</button>
          <button onClick={setToggle}>Edit</button>
        </>
      )}
      <hr />
      {isOpen && (
        <>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Row className="p-2">
                <div className="font-weight-bold m-1">Edit Comment </div>
                <div className="my-1" />
                <Input
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
            </FormGroup>
          </Form>
        </>
      )}
    </div>
  );
};

export default CommentItem;
