import React, { Fragment } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import { Container } from "reactstrap";
import { Redirect, Route, Switch } from "react-router";
import PostCardList from "./nomalRoute/PostCardList";
import PostWrite from "./nomalRoute/PostWrite";
import PostDetail from "./nomalRoute/PostDetail";
import Search from "./nomalRoute/Search";
import CategoryResult from "./nomalRoute/CategoryResult";

const MyRouter = () => (
  <Fragment>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route patch="/" export component={PostCardList} />
        <Route patch="/post" export component={PostWrite} />
        <Route patch="/post/:id" export component={PostDetail} />
        <Route
          patch="/post/category/:categoryName"
          export
          component={CategoryResult}
        />
        <Route patch="/search/:searchTerm" export component={Search} />
        <Redirect from="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </Fragment>
);

export default MyRouter;
