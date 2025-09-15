import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  Alert,
  Snackbar,
  ButtonGroup
} from '@mui/material';
import { CurrencyYen, CurrencyRupee } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import { useApp } from '../context/AppContext';
import { products, formatPrice } from '../data/sampleData';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [currency, setCurrency] = useState('JPY'); // 'JPY' or 'INR'

  const product = products.find(p => p.id === parseInt(id));
  const relatedProducts = products.filter(p => p.id !== parseInt(id)).slice(0, 6);

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

  if (!product) {
    return (
      <>
        <Header />
        <Container>
          <Typography variant="h4" sx={{ mt: 4 }}>Product not found</Typography>
        </Container>
      </>
    );
  }

  const showAlert = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    showAlert(`${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    showAlert(`Preparing your order for ${product.name}`, 'info');
  };

  const handleRelatedProductAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    showAlert(`${product.name} added to cart!`);
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <>
      <Header />
      <Container maxWidth="xl">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2, mb: 2 }}
        >
          Back to Products
        </Button>

        {/* Product Details */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={product.image}
              alt={product.name}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 500,
                objectFit: 'contain',
                borderRadius: 2,
                boxShadow: 3
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Chip label={product.category} color="primary" sx={{ mb: 2 }} />
            <Typography variant="h3" gutterBottom>
              {product.name}
            </Typography>
            
            {/* Currency Toggle */}
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h4" color="primary">
                {convertPrice(product.price, currency)}
              </Typography>
              <ButtonGroup variant="outlined" size="small" aria-label="currency selection">
                <Button 
                  startIcon={<CurrencyYen />}
                  onClick={() => handleCurrencyChange('JPY')}
                  variant={currency === 'JPY' ? 'contained' : 'outlined'}
                >
                  JPY
                </Button>
                <Button 
                  startIcon={<CurrencyRupee />}
                  onClick={() => handleCurrencyChange('INR')}
                  variant={currency === 'INR' ? 'contained' : 'outlined'}
                >
                  INR
                </Button>
              </ButtonGroup>
            </Box>
            
            <Typography variant="body1" paragraph sx={{ mb: 3, lineHeight: 1.8 }}>
              {product.description}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleAddToCart}
                sx={{ minWidth: 140 }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={handleBuyNow}
                sx={{ minWidth: 140 }}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Related Products - Right to Left Flow */}
        {relatedProducts.length > 0 && (
          <ProductList 
            products={relatedProducts} 
            title="Related Products"
            onAddToCart={handleRelatedProductAddToCart}
            currency={currency}
          />
        )}

        {/* Snackbar for notifications */}
        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={3000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default ProductDetail;