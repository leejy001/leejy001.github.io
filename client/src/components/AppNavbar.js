import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Container,
  Navbar,
  NavbarToggler,
  Collapse,
  Nav,
  Form,
  NavItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoginModal from "../components/auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_REQUEST,
  POST_EDIT_LOADING_REQUEST,
  POST_WRITE_REQUEST,
} from "../redux/types";
import RegisterModal from "./auth/RegisterModal";

const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  // 메모이제이션된 콜백 반환
  const onLogout = useCallback(() => {
    dispatch({ type: LOGOUT_REQUEST });
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
    const updateScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", updateScroll);
  }, [user, scrollPosition]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const addPostClick = () => {
    dispatch({
      type: POST_WRITE_REQUEST,
    });
  };

  const passwordEditClick = () => {
    dispatch({
      type: POST_EDIT_LOADING_REQUEST,
    });
  };

  const guestLink = (
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </Fragment>
  );

  const authLink = (
    <Fragment>
      <NavItem>
        {userRole === "Admin" ? (
          <Form className="col">
            <Link
              to="/post"
              className="btn btn-success block text-white px-3 btn-sm"
              onClick={addPostClick}
              size="sm"
              style={{ fontSize: "9px", height: "25px" }}
            >
              Add Post
            </Link>
          </Form>
        ) : (
          ""
        )}
      </NavItem>
      <NavItem>
        <Form className="col">
          {user && user.name ? (
            <Link to={`/user/${user.name}/profile`} onClick={passwordEditClick}>
              <Button
                outline
                color="light"
                className="px-2 mx-3"
                size="sm"
                block
                style={{ fontSize: "7px", height: "25px" }}
              >
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button
              outline
              color="light"
              className="px-3"
              size="sm"
              block
              style={{ fontSize: "9px", height: "25px" }}
            >
              <strong>유저를 찾을 수 없습니다.</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="/">
            <Button
              outline
              color="light"
              size="sm"
              block
              style={{ fontSize: "10px", height: "25px" }}
            >
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );

  return (
    <Fragment>
      <div
        className="fixed-top"
        id={scrollPosition < 150 ? "" : "change-navbar"}
      >
        <Container id="nav-container">
          <Navbar className="main-navbar" expand="lg">
            <Link to="/" className="text-white text-decoration-none">
              LEE Blog
            </Link>
            <NavbarToggler
              onClick={handleToggle}
              style={{ borderColor: "black" }}
            />
            <Collapse
              isOpen={isOpen}
              navbar
              style={{ justifyContent: "flex-end" }}
            >
              <Nav className="nav-right ml-auto d-flex" navbar>
                {isAuthenticated ? authLink : guestLink}
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </div>
    </Fragment>
  );
};

export default AppNavbar;
