import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Col } from "reactstrap";

const Category = ({ posts }) => {
  return (
    <Fragment>
      <Col>
        {Array.isArray(posts)
          ? posts.map(({ _id, categoryName, posts }) => (
              <div key={_id} className="mx-1 mt-1 my_category">
                <Link
                  to={`/post/category/${categoryName}`}
                  className="text-dark text-decoration-none"
                >
                  <span style={{ marginLeft: "0.5rem" }}>
                    <Button
                      style={{
                        backgroundColor: "#66D3FA",
                        color: "white",
                        border: "none",
                      }}
                    >
                      {categoryName}{" "}
                      <Badge
                        style={{
                          marginLeft: "0.25rem",
                          backgroundColor: "white",
                          color: "black",
                        }}
                      >
                        {posts.length}
                      </Badge>
                    </Button>
                  </span>
                </Link>
              </div>
            ))
          : ""}
      </Col>
    </Fragment>
  );
};

export default Category;
