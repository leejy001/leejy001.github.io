import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Row,
} from "reactstrap";

const StudyCategory = ({ posts }) => {
  return (
    <Fragment>
      <Row>
        {Array.isArray(posts)
          ? posts.map(({ _id, categoryName, posts, img }) => (
              <div key={_id} className="col-md-4">
                <Card>
                  <Link
                    to={`/post/category/${categoryName}`}
                    className="text-dark text-decoration-none"
                  >
                    <CardImg top width="100%" src={img} alt="Card image cap" />
                    <CardBody>
                      <div className="d-flex">
                        <CardTitle tag="h4">{categoryName}</CardTitle>
                        <CardSubtitle
                          tag="h6"
                          style={{ marginTop: "5px", marginLeft: "10px" }}
                        >
                          {posts.length} Post
                        </CardSubtitle>
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </div>
            ))
          : ""}
      </Row>
    </Fragment>
  );
};

export default StudyCategory;
