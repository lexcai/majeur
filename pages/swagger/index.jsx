// pages/swagger/index.jsx
'use client'

import Head from 'next/head';
import 'swagger-ui-react/swagger-ui.css';
import dynamic from 'next/dynamic';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });


const Swagger = () => {
return (
   <div>
        <Head>
          <title>BrowserStack Demo API</title>
          <meta name="description" content="BrowserStack Demo API Swagger" />
          <link rel="icon" href="/favicon.svg" />
        </Head>
        <SwaggerUI url="/api/doc" />
      </div>
); };
export default Swagger;