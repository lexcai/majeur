// pages/_app.js
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '/src/themes/themes';
import { AuthProvider } from '/src/context/auth.context';
import Header from './ui/Header';
import Footer from './ui/footer';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  return (
    <AuthProvider>
      <AppCacheProvider {...props}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header />
          <Component {...pageProps} />
          <Footer />  
        </ThemeProvider>
      </AppCacheProvider>
    </AuthProvider>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
