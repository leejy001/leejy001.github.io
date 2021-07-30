import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Category from "../../components/post/Category";
import { STUDY_CATEGORY_LOADING_REQUEST } from "../../redux/types";

const Study = () => {
  const dispatch = useDispatch();
  const { categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );

  console.log(categoryFindResult);

  useEffect(() => {
    dispatch({
      type: STUDY_CATEGORY_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  return (
    <Fragment>
      <div
        style={{
          textAlign: "center",
          height: "200px",
        }}
      >
        <p style={{ verticalAlign: "middle" }}>Study Category</p>
      </div>
      <div id="tab-row" className="d-flex">
        <Category posts={categoryFindResult} />
      </div>
    </Fragment>
  );
};

export default Study;
