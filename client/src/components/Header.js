import React from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "reactstrap";

const Header = () => {
  const { postDetail } = useSelector((state) => state.post);

  return (
    <>
      {postDetail ? (
        ""
      ) : (
        <div id="page-header" className="mb-3">
          <Row>
            <Col md="6" sm="auto" className="text-center m-auto">
              <h1 style={{ color: "white", fontWeight: "bold" }}>
                Read My Blog
              </h1>
              <p style={{ color: "white", fontWeight: "bold" }}>기록 보관소</p>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default Header;
