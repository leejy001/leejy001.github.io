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
import { GoogleLogin } from "react-google-login";
import GoogleButton from 'react-google-button'
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST, GOOGLE_LOGIN_REQUEST } from "../../redux/types";
import dotenv from "dotenv"

dotenv.config()

const LoginModal = () => {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
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
    dispatch({
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
    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const tokenId = res?.tokenId;
    try {
      await dispatch({ type: GOOGLE_LOGIN_REQUEST, payload: { result, tokenId } });
    } catch (error) {
      console.log(error);
    }
    console.log(res);
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log("Google Sign In was unsuccessful...");
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
              <Button color="dark" style={{ width:"100%", height:"50px", marginTop: "20px" }} block>
                Login
              </Button>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_ID}
                render={renderProps => (
                  <GoogleButton  onClick={renderProps.onClick} style={{width:"100%", marginTop: "10px"}} disabled={renderProps.disabled}/>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy={"single_host_origin"}
              >
                  <span style={{width:"100%"}}>구글로 로그인 하기</span>
              </GoogleLogin>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
