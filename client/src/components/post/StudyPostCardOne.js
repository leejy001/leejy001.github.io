import React, { Fragment } from "react";
import { Card, CardImg, CardTitle, CardText, CardBody, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse, faComment } from "@fortawesome/free-solid-svg-icons";
import TimeForDay from "./TimeForDay";
import "../../assets/custom.scss";

const StudyPostCardOne = ({ posts }) => {
  console.log(posts);
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
                <Fragment key={_id}>
                  {fileUrl === "none" ? (
                    <Card
                      style={{
                        margin: "15px 10px",
                        padding: "0",
                        borderRadius: "10px",
                        gridRowEnd: "span 33",
                        boxShadow:
                          "0 30px 60px -12px rgba(50, 50, 93, 0.25),0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025)",
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
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            >
                              {title}
                            </span>
                          </CardTitle>
                          <CardText
                            style={{ maxWidth: "300px", height: "auto" }}
                          >
                            <span className="card-contents-A">
                              {stripHTMLtag(contents)}
                            </span>
                          </CardText>
                        </CardBody>
                      </Link>
                      <Row className="card-bottom-row">
                        <div className="d-flex" style={{ paddingLeft: "25px" }}>
                          <TimeForDay date={date} />
                          &nbsp;&nbsp;
                          <FontAwesomeIcon
                            icon={faMouse}
                            style={{ marginRight: "3px" }}
                          />
                          <span style={{ marginTop: "-4px" }}>{views}</span>
                          <FontAwesomeIcon
                            icon={faComment}
                            style={{ marginLeft: "10px", marginRight: "3px" }}
                          />
                          <span style={{ marginTop: "-4px" }}>
                            {comments.length}
                          </span>
                        </div>
                      </Row>
                    </Card>
                  ) : (
                    <Card
                      style={{
                        margin: "15px 10px",
                        padding: "0",
                        borderRadius: "10px",
                        gridRowEnd: "span 45",
                        boxShadow:
                          "0 30px 60px -12px rgba(50, 50, 93, 0.25),0 18px 36px -18px rgba(0, 0, 0, 0.3), 0 -12px 36px -8px rgba(0, 0, 0, 0.025)",
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
                          style={{ borderRadius: "10px 10px 0px 0px" }}
                        />
                        <CardBody style={{ height: "165px" }}>
                          <CardTitle className="text-truncate">
                            <span
                              className="text-truncate"
                              style={{ fontSize: "15px", fontWeight: "bold" }}
                            >
                              {title}
                            </span>
                          </CardTitle>
                          <CardText
                            style={{
                              maxWidth: "350px",
                              height: "auto",
                            }}
                          >
                            <span className="card-contents-B">
                              {stripHTMLtag(contents)}
                            </span>
                          </CardText>
                        </CardBody>
                      </Link>
                      <Row className="card-bottom-row">
                        <div className="d-flex" style={{ paddingLeft: "25px" }}>
                          <TimeForDay date={date} />
                          &nbsp;&nbsp;
                          <FontAwesomeIcon
                            icon={faMouse}
                            style={{ marginRight: "3px" }}
                          />
                          <span style={{ marginTop: "-4px" }}>{views}</span>
                          <FontAwesomeIcon
                            icon={faComment}
                            style={{ marginLeft: "10px", marginRight: "3px" }}
                          />
                          <span style={{ marginTop: "-4px" }}>
                            {comments.length}
                          </span>
                        </div>
                      </Row>
                    </Card>
                  )}
                </Fragment>
              );
            }
          )
        : ""}
    </Fragment>
  );
};

export default StudyPostCardOne;
