import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const Header = () => {
  const { state } = useApp();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-Commerce Store
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={state.cart.length} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;