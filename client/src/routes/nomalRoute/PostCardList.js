import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POST_LOADING_REQUEST } from "../../redux/types";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";

const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: POST_LOADING_REQUEST });
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet title="Home" />
      <Row className="border-bottom border-top border-primary py-2 mb-3">
        <Category posts={categoryFindResult} />
      </Row>
      <Row>{posts ? <PostCardOne posts={posts} /> : GrowingSpinner}</Row>
    </Fragment>
  );
};

export default PostCardList;
