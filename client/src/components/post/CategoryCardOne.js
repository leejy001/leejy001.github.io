import React, { Fragment } from "react";
import { Row } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMouse, faComment } from "@fortawesome/free-solid-svg-icons";
import TimeForDay from "./TimeForDay";
import "../../assets/custom.scss";

function CategoryCardOne({ posts, id }) {
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
        ? // post Model 내부에 있는 값을 _id를 key로 해서 반환해준다.
          posts.map(
            ({ _id, title, fileUrl, contents, comments, views, date }) => {
              if (id !== _id) {
                return (
                  <div key={_id} className="col-md-4">
                    <Link
                      to={`/post/${_id}`}
                      className="text-dark text-decoration-none"
                    >
                      {fileUrl === "none" ? (
                        <div
                          className="mb-3"
                          style={{
                            margin: "10px 10px",
                            borderRadius: "10px",
                            border: "2px solid lightgray",
                            height: "260px",
                          }}
                        >
                          <div style={{ height: "230px", padding: "20px" }}>
                            <div className="text-truncate">
                              <span
                                className="text-truncate"
                                style={{ fontSize: "15px", fontWeight: "bold" }}
                              >
                                {title}
                              </span>
                            </div>
                            <div>
                              <span
                                className="card-contents-C"
                                style={{ width: "auto" }}
                              >
                                {stripHTMLtag(contents)}
                              </span>
                            </div>
                          </div>
                          <Row className="card-bottom-row">
                            <div
                              className="d-flex"
                              style={{ padding: "0px 30px" }}
                            >
                              <TimeForDay date={date} />
                              &nbsp;&nbsp;
                              <FontAwesomeIcon icon={faMouse} />
                              &nbsp;
                              <span style={{ marginTop: "-4px" }}>{views}</span>
                              <FontAwesomeIcon
                                icon={faComment}
                                style={{ marginLeft: "10px" }}
                              />
                              &nbsp;
                              <span style={{ marginTop: "-4px" }}>
                                {comments.length}
                              </span>
                            </div>
                          </Row>
                        </div>
                      ) : (
                        <div
                          className="mb-3"
                          style={{
                            margin: "10px 10px",
                            borderRadius: "10px",
                            backgroundImage: `url(${fileUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            border: "2px solid lightgray",
                            height: "260px",
                          }}
                        >
                          <div
                            style={{
                              height: "256px",
                              borderRadius: "7px",
                              backgroundColor: "rgba( 255, 255, 255, 0.8 )",
                            }}
                          >
                            <div
                              style={{
                                height: "230px",
                                borderRadius: "10px",
                                padding: "20px",
                              }}
                            >
                              <div className="text-truncate">
                                <span
                                  className="text-truncate"
                                  style={{
                                    fontSize: "15px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {title}
                                </span>
                              </div>
                              <div>
                                <span
                                  className="card-contents-C"
                                  style={{ width: "auto" }}
                                >
                                  {stripHTMLtag(contents)}
                                </span>
                              </div>
                            </div>
                            <Row className="card-bottom-row">
                              <div
                                className="d-flex"
                                style={{ padding: "0px 30px" }}
                              >
                                <TimeForDay date={date} />
                                &nbsp;&nbsp;
                                <FontAwesomeIcon icon={faMouse} />
                                &nbsp;
                                <span style={{ marginTop: "-4px" }}>
                                  {views}
                                </span>
                                <FontAwesomeIcon
                                  icon={faComment}
                                  style={{ marginLeft: "10px" }}
                                />
                                &nbsp;
                                <span style={{ marginTop: "-4px" }}>
                                  {comments.length}
                                </span>
                              </div>
                            </Row>
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                );
              } else {
                return <div key={_id}></div>;
              }
            }
          )
        : ""}
    </Fragment>
  );
}

export default CategoryCardOne;
