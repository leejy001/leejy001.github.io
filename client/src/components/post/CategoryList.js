import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import CategoryCardOne from "../../components/post/CategoryCardOne";
import { CardGroup } from "reactstrap";

const CategoryList = () => {
  const { categoryFindResult, postDetail } = useSelector((state) => state.post);

  return (
    <Fragment>
      <div
        id="tab-row"
        className="d-flex"
        style={{ width: "100%", marginBottom: "50px" }}
      >
        <div style={{ color: "black", fontWeight: "bold" }}>
          &nbsp;카테고리 "{postDetail.category.categoryName}"와 연관된 글
        </div>
      </div>
      <CardGroup>
        <CategoryCardOne posts={categoryFindResult.posts} id={postDetail._id} />
      </CardGroup>
    </Fragment>
  );
};

export default CategoryList;
