// pages/index.test.js
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/themes/mui-base-components/ProTip';
import Link from '../src/themes/mui-base-components/Link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/context/auth.context';

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log("We're connected to the database!");
  });

  useEffect(() => {
    if (!user) {
      router.push('/ui/sign-in');
    }
  }, [user, router]);
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
          Welcome to the Home Page
        </Typography>
        <Link href='/ui/sign-up' color='secondary'>
          Go to the sign-up page
        </Link>
        <ProTip />
        <Link href='/ui/sign-in' color='secondary'>
          Go to the sign-in page
        </Link>
        <ProTip />
        <Link href='/ui/about' color='secondary'>
          Go to the about page
        </Link>
        <ProTip />
        <Link href='/ui/landing' color='secondary'>
          Go to the landing page
        </Link>
        <ProTip />
      </Box>
    </Container>
  );
}
