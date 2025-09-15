import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart } from '@mui/icons-material';
import { formatPrice } from '../data/sampleData';

const ProductCard = ({ product, onAddToCart, currency, layout = 'grid' }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  // Convert price based on selected currency
  const convertPrice = (price, targetCurrency) => {
    if (targetCurrency === 'INR') {
      // Simple conversion rate (1 JPY = 0.55 INR approx)
      const convertedPrice = price * 0.55;
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(convertedPrice);
    }
    // Default to JPY
    return formatPrice(price);
  };

  if (layout === 'list') {
    return (
      <Card sx={{ 
        display: 'flex', 
        mb: 2,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 3
        }
      }}>
        <CardMedia
          component="img"
          sx={{ 
            width: 200, 
            objectFit: 'cover',
            cursor: 'pointer'
          }}
          image={product.image}
          alt={product.name}
          onClick={handleProductClick}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography gutterBottom variant="h6" component="h3">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {product.description}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1
            }}>
              <Typography variant="h6" color="primary">
                {convertPrice(product.price, currency)}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton 
                  color="primary" 
                  onClick={handleAddToCart}
                  aria-label="Add to cart"
                >
                  <AddShoppingCart />
                </IconButton>
                <Button 
                  variant="contained"
                  onClick={handleProductClick}
                >
                  View Details
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    );
  }

  // Default grid layout
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 3
      }
    }}>
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        onClick={handleProductClick}
        sx={{ cursor: 'pointer' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h3" noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            {convertPrice(product.price, currency)}
          </Typography>
          <IconButton 
            color="primary" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <AddShoppingCart />
          </IconButton>
        </Box>
        <Button 
          variant="contained" 
          fullWidth
          onClick={handleProductClick}
          sx={{ mt: 2 }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;