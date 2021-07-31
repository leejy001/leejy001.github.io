import React, { useEffect } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "reactstrap";
import StudyCategory from "../../components/post/StudyCategory";
import { STUDY_CATEGORY_LOADING_REQUEST } from "../../redux/types";

const Study = () => {
  const dispatch = useDispatch();
  const { label, categoryFindResult } = useSelector((state) => state.post);

  console.log(categoryFindResult);

  useEffect(() => {
    dispatch({
      type: STUDY_CATEGORY_LOADING_REQUEST,
      payload: 0,
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Container>
        {label === "study" && <StudyCategory posts={categoryFindResult} />}
      </Container>
    </Fragment>
  );
};

export default Study;
