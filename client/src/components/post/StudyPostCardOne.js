import React from "react";
import { ListGroup, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
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
    <ListGroup>
      {Array.isArray(posts)
        ? posts.map(
            ({ _id, title, fileUrl, contents, comments, views, date }) => {
              return (
                <div
                  className="d-flex"
                  style={{
                    borderRadius: "5px",
                    marginTop: "10px",
                    backgroundColor: "white",
                  }}
                >
                  <Link
                    to={`/post/${_id}`}
                    className="text-dark text-decoration-none"
                  >
                    <div key={_id} style={{ padding: "20px" }}>
                      <ListGroupItemHeading
                        style={{ fontWeight: "bold", marginBottom: "10px" }}
                      >
                        {title}
                      </ListGroupItemHeading>
                      <div
                        className="d-flex"
                        style={{ fontSize: "small", marginBottom: "15px" }}
                      >
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
                      <ListGroupItemText
                        className="list-contents"
                        style={{ paddingRight: "10px" }}
                      >
                        {stripHTMLtag(contents)}
                      </ListGroupItemText>
                    </div>
                  </Link>
                  <div>
                    {fileUrl !== "none" && (
                      <img
                        alt="이미지"
                        src={fileUrl}
                        style={{
                          borderRadius: "0px 5px 5px 0px",
                          width: "200px",
                          objectFit: "cover",
                          height: "100%",
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            }
          )
        : ""}
    </ListGroup>
  );
};

export default StudyPostCardOne;
