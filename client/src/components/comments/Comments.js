import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { COMMENT_UPLOADING_REQUEST } from "../../redux/types";
import { Button, Form, Input, Row } from "reactstrap";

const Comments = ({ id, userName, userId }) => {
  const dispatch = useDispatch();
  const [form, setValues] = useState({ contents: "" });

  const onSubmit = async (e) => {
    await e.preventDefault();
    const { contents } = form;
    const token = localStorage.getItem("token");
    const body = {
      contents,
      token,
      id,
      userId,
      userName,
    };

    console.log(body);
    dispatch({
      type: COMMENT_UPLOADING_REQUEST,
      payload: body,
    });
    resetValue.current.value = "";
    setValues("");
  };

  const resetValue = useRef(null);

  const onChange = async (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(form.contents);
  };

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Row className="p-2">
          <Input
            innerRef={resetValue}
            type="textarea"
            name="contents"
            id="contents"
            onChange={onChange}
            placeholder="댓글을 달아주세요"
          />
          <Button color="primary" block className="mt-2 offset-md-10 col-md-2 ">
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default Comments;
