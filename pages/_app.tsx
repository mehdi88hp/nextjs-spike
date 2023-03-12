import React from 'react';
import App, { AppContext } from 'next/app';
import { wrapper } from '../store';
import Layout from '../layouts/MainLayout'

import 'bootstrap/dist/css/bootstrap.min.css';
import { StyledEngineProvider } from "@mui/material/styles";

// import '../styles/parent.scss'
// import '../styles/test.scss'

interface Props {
  store: any;
}

class MyApp extends App<Props> {

  public static getInitialProps = wrapper.getInitialAppProps(store => async context => {

    const {Component, ctx}: AppContext = context


    // store.dispatch({type: 'TOE', payload: 'was set in _app'});
    //
    // return {
    //   pageProps: {
    //     // https://nextjs.org/docs/advanced-features/custom-app#caveats
    //     ...(await App.getInitialProps(context)).pageProps,
    //     // Some custom thing for all pages
    //     pathname: ctx.pathname,
    //   },
    // };


    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // const dispatch = (await import('../store')).default.dispatch;
    // console.log(store)
    // const dispatch = store.dispatch;

    // console.log(store)
    // console.log(Object.keys(ctx))
    // if (ctx.store) {
    //
    // }

    if (ctx.req) {
      // const parsedCookies = cookie.parse(ctx.req.headers.cookie);

      // await useUser(parsedCookies.passport_cookie).then(async data => {
      //   const slice = await import('../store/auth/authSlice')
      //
      //   store.dispatch(slice.setUser(data.user))
      //
      //   console.log(333, data.user, 999)
      // });
    }

    return {pageProps};


  });

  render() {
    const {Component, pageProps} = this.props;

    return (
      <StyledEngineProvider injectFirst>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyledEngineProvider>
    );
  }
}

export default wrapper.withRedux(MyApp);
