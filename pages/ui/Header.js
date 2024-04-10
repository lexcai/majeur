import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../src/context/auth.context';
import { useRouter } from 'next/router';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerBackground, setHeaderBackground] = useState('transparent');

  const router = useRouter();
  const { user, logout } = useAuth();

  const controlHeaderBackground = () => {
    const backgroundColor = window.scrollY > 50 ? '#141414' : 'transparent';
    setHeaderBackground(backgroundColor);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeaderBackground);
    return () => {
      window.removeEventListener('scroll', controlHeaderBackground);
    };
  }, []);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        backgroundColor: headerBackground,
        transition: 'background-color 0.3s',
      }}
    >
      <Toolbar>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          color='primary.main'
          onClick={() => router.push('/ui/landing')}
        >
          The Movie DB
        </Typography>
        <Link href='/top-rated' passHref>
          <Button color='inherit'>Top Rated</Button>
        </Link>
        <Link href='/discover' passHref>
          <Button color='inherit'>Discover</Button>
        </Link>
        <IconButton color='inherit' onClick={toggleSearch}>
          <SearchIcon />
        </IconButton>
        {searchOpen && (
          <InputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
            sx={{ color: 'common.white', ml: 1 }}
          />
        )}
        {user ? (
          <IconButton color='inherit' onClick={logout}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <Link href='/ui/sign-in' passHref>
            <Button color='inherit'>Sign In</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
