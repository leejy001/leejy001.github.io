import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  POST_DELETE_REQUEST,
  POST_DETAIL_CLEAR_REQUEST,
  POST_DETAIL_LOADING_REQUEST,
  USER_LOADING_REQUEST,
} from "../../redux/types";
import { Button, Row, Container, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTrash,
  faPen,
  faPencilAlt,
  faCommentDots,
  faMouse,
} from "@fortawesome/free-solid-svg-icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor";
import { editorConfiguration } from "../../components/editor/EditorConfig";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import CommentList from "../../components/comments/CommentList";

const PostDetail = (req) => {
  const dispatch = useDispatch();
  const { postDetail, creatorId, title, loading } = useSelector(
    (state) => state.post
  );
  const date = new Date(postDetail.date);
  const { userId, userName } = useSelector((state) => state.auth);

  console.log(req);
  useEffect(() => {
    dispatch({
      type: POST_DETAIL_LOADING_REQUEST,
      payload: req.match.params.id,
    });
    dispatch({
      type: USER_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch, req.match.params.id]);

  const onDeleteClick = () => {
    dispatch({
      type: POST_DELETE_REQUEST,
      payload: {
        id: req.match.params.id,
        token: localStorage.getItem("token"),
      },
    });
  };

  const onHomeClick = () => {
    dispatch({
      type: POST_DETAIL_CLEAR_REQUEST,
    });
  };

  const EditButton = (
    <Fragment>
      <div
        style={{
          width: "55px",
          height: "200px",
        }}
      >
        <Link
          to="/"
          className="btn btn-primary btn-block"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "65px",
            fontSize: "23px",
          }}
          onClick={onHomeClick}
        >
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link
          to={`/post/${req.match.params.id}/edit`}
          className="btn btn-success btn-block mb-2 mt-2"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "65px",
            fontSize: "23px",
          }}
        >
          <FontAwesomeIcon icon={faPen} />
        </Link>
        <Button
          className="btn-block btn-danger"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "65px",
            fontSize: "23px",
          }}
          onClick={onDeleteClick}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </Fragment>
  );

  const HomeButton = (
    <Fragment>
      <div
        style={{
          width: "55px",
          height: "200px",
        }}
      >
        <Link
          to="/"
          className="btn btn-primary btn-block"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "65px",
            fontSize: "23px",
          }}
          onClick={onHomeClick}
        >
          <FontAwesomeIcon icon={faHome} />
        </Link>
      </div>
    </Fragment>
  );

  const Body = (
    <>
      <div style={{ position: "fixed", left: "20%", top: "40%" }}>
        {userId === creatorId ? EditButton : HomeButton}
      </div>
      {postDetail && postDetail.comments ? (
        <Fragment>
          <Row className="mb-3">
            <CKEditor
              editor={BalloonEditor}
              data={postDetail.contents}
              config={editorConfiguration}
              disabled="true"
            />
          </Row>
          <Row>
            <CommentList
              id={req.match.params.id}
              userId={userId}
              userName={userName}
            />
          </Row>
        </Fragment>
      ) : (
        <h1>hi</h1>
      )}
    </>
  );

  return (
    <>
      <div id="page-post-header" className="fixed-top">
        {postDetail ? (
          <Row
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              paddingBottom: "29px",
            }}
          >
            <Col md="6" sm="auto" className="text-center m-auto mt-5">
              <h1 style={{ fontWeight: "bold" }}>{postDetail.title}</h1>
              <span>{postDetail.category.categoryName}</span>
            </Col>
            <div
              className="d-flex justify-content-center align-items-baseline"
              style={{ marginTop: "30px" }}
            >
              <div>{postDetail.creator.name} &nbsp;</div>
              <div className="small">
                <FontAwesomeIcon icon={faPencilAlt} />
                &nbsp;
                <span>{`${date.getFullYear()}년 ${
                  date.getMonth() + 1
                }월 ${date.getDay()}일`}</span>
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCommentDots} />
                &nbsp;
                <span>{postDetail.comments.length}</span>
                &nbsp;&nbsp;
                <FontAwesomeIcon icon={faMouse} />
                &nbsp;
                <span>{postDetail.views}</span>
              </div>
            </div>
          </Row>
        ) : (
          ""
        )}
      </div>
      <div
        style={{
          width: "100%",
          paddingTop: "250px",
        }}
      >
        <div
          style={{
            position: "relative",
            backgroundColor: "white",
            zIndex: "100",
            marginBottom: "-20px",
          }}
        >
          <Container id="main-container">
            <Helmet title={`Post | ${title}`} />{" "}
            {loading === true ? GrowingSpinner : Body}
          </Container>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
