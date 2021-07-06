import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SEARCH_REQUEST } from "../../redux/types";
import PostCardOne from "../../components/post/PostCardOne";

const Search = () => {
  const dispatch = useDispatch();
  let { searchTerm } = useParams();
  const { searchResult } = useSelector((state) => state.post);
  console.log(searchResult, "useParams");

  useEffect(() => {
    if (searchTerm) {
      dispatch({
        type: SEARCH_REQUEST,
        payload: searchTerm,
      });
    }
  }, [dispatch, searchTerm]);

  return (
    <Fragment>
      <div id="tab-row" className="d-flex">
        <h3 style={{ color: "white" }}>&nbsp;검색결과: "{searchTerm}"</h3>
        <h4 style={{ color: "white", marginTop: "5px" }}>
          &nbsp;&nbsp;{searchResult.length} Post
        </h4>
      </div>
      <div className="card-container">
        <PostCardOne posts={searchResult} />
      </div>
    </Fragment>
  );
};

export default Search;
