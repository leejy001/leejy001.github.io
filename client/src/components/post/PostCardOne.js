import React, { Fragment } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody,
  CardFooter,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse, faComment } from "@fortawesome/free-solid-svg-icons";

const PostCardOne = ({ posts }) => {
  return (
    <Fragment>
      {Array.isArray(posts)
        ? posts.map(({ _id, title, fileUrl, cardcontent, comments, views }) => {
            console.log(fileUrl, "fileUrl");
            return (
              <div key={_id} className="col-md-4">
                <Link
                  to={`/post/${_id}`}
                  className="text-dark text-decoration-none"
                >
                  <Card className="mb-3" style={{ height: "340px" }}>
                    {fileUrl === "none" ? (
                      ""
                    ) : (
                      <CardImg top alt="Image" src={fileUrl} />
                    )}
                    <CardBody>
                      <CardTitle className="text-truncate">
                        <span
                          className="text-truncate"
                          style={{ fontSize: "25px", fontWeight: "bold" }}
                        >
                          {title}
                        </span>
                      </CardTitle>
                      <CardText className="text-truncate">
                        <span className="text-truncate">{cardcontent}</span>
                      </CardText>
                    </CardBody>
                    <CardFooter>
                      <Row>
                        <div>
                          <FontAwesomeIcon icon={faMouse} />
                          &nbsp;&nbsp;
                          <span>{views}</span>
                          <FontAwesomeIcon
                            icon={faComment}
                            style={{ marginLeft: "10px" }}
                          />
                          &nbsp;&nbsp;
                          <span>{comments.length}</span>
                        </div>
                      </Row>
                    </CardFooter>
                  </Card>
                </Link>
              </div>
            );
          })
        : ""}
    </Fragment>
  );
};

export default PostCardOne;
