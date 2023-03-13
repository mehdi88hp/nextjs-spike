import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../lib/defaultTheme";
// import { Html, Head, Main, NextScript } from 'next/document'
// // import Head from 'next/head';
//
// import rtlPlugin from 'stylis-plugin-rtl';
// import { CacheProvider } from '@emotion/react';
// import createCache from '@emotion/cache';
// import { prefixer } from 'stylis';
import MenuAndDrawer from "./MenuAndDrawer";

// Create rtl cache
// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });
//
// function RTL(props) {
//   return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
// }

const MainLayout = (props) => (
  // <RTL>
  <ThemeProvider theme={theme}>
    <MenuAndDrawer>
      {props.children}
    </MenuAndDrawer>
  </ThemeProvider>
);

export default MainLayout;