import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  NavLink,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({ email: "", password: "" });
  const dispath = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);
  useEffect(
    (e) => {
      try {
        setLocalMsg(errorMsg);
      } catch {
        console.log(e);
      }
    },
    [errorMsg]
  );
  const handelToggle = () => {
    dispath({
      type: CLEAR_ERROR_REQUEST,
    });
    setModal(!modal);
  };
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };
    console.log(user);
    dispath({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  return (
    <div>
      <NavLink onClick={handelToggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handelToggle}>
        <ModalHeader toggle={handelToggle}>Login</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email을 입력하세요."
                onChange={onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password를 입력하세요."
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
