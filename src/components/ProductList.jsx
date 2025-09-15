import React, { useRef } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  IconButton,
  Paper
} from '@mui/material';
import { 
  ArrowBackIos, 
  ArrowForwardIos 
} from '@mui/icons-material';
import ProductCard from './ProductCard';

const ProductList = ({ products, title, onAddToCart, currency = 'JPY' }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 3, 
        mt: 4, 
        mb: 6, 
        borderRadius: 2,
        position: 'relative'
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        {title}
      </Typography>
      
      {/* Left Arrow */}
      {products.length > 4 && (
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'white',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }}
        >
          <ArrowBackIos />
        </IconButton>
      )}
      
      {/* Product Scroll Container */}
      <Box
        ref={scrollContainerRef}
        sx={{
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          py: 1
        }}
      >
        <Grid 
          container 
          spacing={2} 
          sx={{ 
            flexWrap: 'nowrap',
            width: 'max-content',
            pb: 2
          }}
        >
          {products.map((product) => (
            <Grid 
              item 
              key={product.id} 
              sx={{ 
                minWidth: 280,
                flex: '0 0 auto'
              }}
            >
              <ProductCard 
                product={product} 
                onAddToCart={onAddToCart}
                currency={currency}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Right Arrow */}
      {products.length > 4 && (
        <IconButton
          onClick={scrollRight}
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 2,
            backgroundColor: 'white',
            boxShadow: 2,
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      )}
    </Paper>
  );
};

export default ProductList;