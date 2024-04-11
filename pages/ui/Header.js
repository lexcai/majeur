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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [headerBackground, setHeaderBackground] = useState('transparent');
  const [searchQuery, setSearchQuery] = useState('');

  const router = useRouter();
  const { user, logout } = useAuth();

  const controlHeaderBackground = () => {
    const backgroundColor = window.scrollY > 50 ? '#141414' : 'transparent';
    setHeaderBackground(backgroundColor);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    router.push('/ui/sign-in');
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
        <Link href='/ui/trending' passHref>
          <Button color='inherit'>Trending</Button>
        </Link>
        <Link href='/ui/discover' passHref>
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
          <IconButton color='inherit' onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        ) : (
          <Link href='/ui/sign-in' passHref>
            <Button color='inherit'>Sign In</Button>
          </Link>
        )}
      </Toolbar>
      <ToastContainer position="top-center" autoClose={5000} />
    </AppBar>
  );
};

export default Header;
