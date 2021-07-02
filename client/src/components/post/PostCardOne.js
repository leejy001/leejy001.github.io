import React, { Fragment } from "react";
import { Card, CardImg, CardTitle, CardText, CardBody, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse, faComment } from "@fortawesome/free-solid-svg-icons";
import TimeForDay from "./TimeForDay";
import "../../assets/custom.scss";

const PostCardOne = ({ posts }) => {
  const stripHTMLtag = (string) => {
    if (string) {
      var objStrip = new RegExp();
      objStrip = /[<][^>]*[>]/gi;
      return string.replace(objStrip, "");
    }
  };

  return (
    <Fragment>
      {Array.isArray(posts)
        ? posts.map(
            ({ _id, title, fileUrl, contents, comments, views, date }) => {
              return (
                <>
                  {fileUrl === "none" ? (
                    <Card
                      key={_id}
                      style={{
                        margin: "15px 10px",
                        padding: "0",
                        borderRadius: "16px",
                        gridRowEnd: "span 33",
                      }}
                    >
                      <Link
                        to={`/post/${_id}`}
                        className="text-dark text-decoration-none"
                      >
                        <CardBody style={{ height: "260px" }}>
                          <CardTitle className="text-truncate">
                            <span
                              className="text-truncate"
                              style={{ fontSize: "25px", fontWeight: "bold" }}
                            >
                              {title}
                            </span>
                          </CardTitle>
                          <CardText
                            style={{ maxWidth: "350px", height: "auto" }}
                          >
                            <span className="card-contents-A">
                              {stripHTMLtag(contents)}
                            </span>
                          </CardText>
                        </CardBody>
                      </Link>
                      <Row>
                        <div className="d-flex" style={{ padding: "0px 30px" }}>
                          <TimeForDay date={date} />
                          &nbsp;&nbsp;
                          <FontAwesomeIcon icon={faMouse} />
                          &nbsp;
                          <span style={{ marginTop: "-2px" }}>{views}</span>
                          <FontAwesomeIcon
                            icon={faComment}
                            style={{ marginLeft: "10px" }}
                          />
                          &nbsp;
                          <span style={{ marginTop: "-2px" }}>
                            {comments.length}
                          </span>
                        </div>
                      </Row>
                    </Card>
                  ) : (
                    <Card
                      key={_id}
                      style={{
                        margin: "15px 10px",
                        padding: "0",
                        borderRadius: "16px",
                        gridRowEnd: "span 45",
                      }}
                    >
                      <Link
                        to={`/post/${_id}`}
                        className="text-dark text-decoration-none"
                      >
                        <CardImg
                          top
                          alt="Image"
                          src={fileUrl}
                          style={{ borderRadius: "16px" }}
                        />
                        <CardBody style={{ height: "165px" }}>
                          <CardTitle className="text-truncate">
                            <span
                              className="text-truncate"
                              style={{ fontSize: "25px", fontWeight: "bold" }}
                            >
                              {title}
                            </span>
                          </CardTitle>
                          <CardText
                            style={{ maxWidth: "350px", height: "auto" }}
                          >
                            <span className="card-contents-B">
                              {stripHTMLtag(contents)}
                            </span>
                          </CardText>
                        </CardBody>
                      </Link>
                      <Row>
                        <div className="d-flex" style={{ paddingLeft: "30px" }}>
                          <TimeForDay date={date} />
                          &nbsp;&nbsp;
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
                    </Card>
                  )}
                </>
              );
            }
          )
        : ""}
    </Fragment>
  );
};

export default PostCardOne;
