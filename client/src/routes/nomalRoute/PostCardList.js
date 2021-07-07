import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  POST_LOADING_REQUEST,
  POST_DETAIL_CLEAR_REQUEST,
} from "../../redux/types";
import { Helmet } from "react-helmet";
import { Alert, Collapse, Container } from "reactstrap";
import { GrowingSpinner } from "../../components/spinner/Spinner";
import PostCardOne from "../../components/post/PostCardOne";
import Category from "../../components/post/Category";
import SearchInput from "../../components/search/SearchInput";

const PostCardList = () => {
  const { posts, categoryFindResult, loading, postCount } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const categoryToggle = () => {
    if (isSearchInputOpen) {
      searchInputToggle();
    } else {
    }
    setIsCategoryOpen(!isCategoryOpen);
  };
  const searchInputToggle = () => {
    if (isCategoryOpen) {
      categoryToggle();
    } else {
    }
    setIsSearchInputOpen(!isSearchInputOpen);
  };

  useEffect(() => {
    dispatch({ type: POST_LOADING_REQUEST, payload: 0 });
    dispatch({
      type: POST_DETAIL_CLEAR_REQUEST,
    });
  }, [dispatch]);

  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);
  postCountRef.current = postCount - 6;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0) {
            dispatch({
              type: POST_LOADING_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
            console.log(endMsg.current);
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current);
      }

      const LastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return LastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return [lastPostElementRef, visible];
  };

  const [lastPostElementRef, visible] = useOnScreen({
    threshold: "0.5",
  });

  console.log(visible, "visible", skipNumberRef.current, "skipNum");

  return (
    <Fragment>
      <Container id="main-container">
        <Helmet title="Home" />
        <div id="tab-row" className="d-flex">
          <button id="tab-button" onClick={categoryToggle}>
            category
          </button>
          <button id="tab-button" onClick={searchInputToggle}>
            search
          </button>
          <button id="tab-button">about</button>
        </div>
        <Collapse isOpen={isCategoryOpen}>
          <div id="tab-row" className="d-flex">
            <Category posts={categoryFindResult} />
          </div>
        </Collapse>
        <Collapse isOpen={isSearchInputOpen}>
          <SearchInput />
        </Collapse>
        <div className="card-container">
          {posts ? <PostCardOne posts={posts} /> : GrowingSpinner}
        </div>
        <div ref={lastPostElementRef}> {loading && GrowingSpinner}</div>
        {loading ? (
          ""
        ) : endMsg ? (
          <div>
            <Alert color="danger" className="text-center font-weight-bolder">
              더 이상의 포스트는 없습니다
            </Alert>
          </div>
        ) : (
          ""
        )}
      </Container>
    </Fragment>
  );
};

export default PostCardList;
