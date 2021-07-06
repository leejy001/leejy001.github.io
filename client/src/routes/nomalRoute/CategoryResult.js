import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCardOne from "../../components/post/PostCardOne";
import { CATEGORY_FIND_REQUEST } from "../../redux/types";

const CategoryResult = () => {
  const dispatch = useDispatch();
  let { categoryName } = useParams();
  const { categoryFindResult } = useSelector((state) => state.post);
  const posts = categoryFindResult.posts;

  useEffect(() => {
    dispatch({
      type: CATEGORY_FIND_REQUEST,
      payload: categoryName,
    });
  }, [dispatch, categoryName]);

  return (
    <Fragment>
      <div id="tab-row" className="d-flex">
        <h3 style={{ color: "white" }}>&nbsp;카테고리: "{categoryName}"</h3>
        {posts ? (
          <h4 style={{ color: "white", marginTop: "5px" }}>
            &nbsp;&nbsp;{posts.length} Post
          </h4>
        ) : (
          ""
        )}
      </div>
      <div className="card-container">
        <PostCardOne posts={categoryFindResult.posts} />
      </div>
    </Fragment>
  );
};

export default CategoryResult;
