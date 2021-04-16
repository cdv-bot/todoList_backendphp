
import React, { Suspense } from 'react';
import { Route, Switch, useLocation } from 'react-router';
import BackTop from '../BackTop';
import Footer from '../Footer';
import Header from '../Header';
import Homeload from '../loading/homeload';
import Menu from './../Menu';
import Page from "./../Router";


function RouterApp(props) {

  let { pathname } = useLocation();

  const PageRouter = (Page) => {
    let result = null;
    result = Page.map((value, key) => (
      <Route
        key={key}
        exact={value.exact}
        path={value.path}
        render={props => <value.main {...props} />}
      />
    ));
    return result;
  }

  return (
    <>
      {
        pathname !== '/checkouts/thanhtoan' ? <><Header />
          <Menu /></> : null
      }

      <Suspense fallback={<Homeload />}>
        <Switch>
          {
            PageRouter(Page)
          }
        </Switch>
      </Suspense>
      {
        pathname !== '/checkouts/thanhtoan' ? <><BackTop />
          <Footer /></> : null
      }

    </>
  );
}

export default RouterApp;