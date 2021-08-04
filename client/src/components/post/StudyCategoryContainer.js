import React, { useState } from "react";
import { Fragment } from "react";
import Pagination from "../Pagination";
import StudyPostCardOne from "./StudyPostCardOne";

const StudyCategoryContainer = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <StudyPostCardOne posts={currentPosts} />
      <Pagination
        currentPage={currentPage}
        postPerPage={postPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </Fragment>
  );
};

export default StudyCategoryContainer;
