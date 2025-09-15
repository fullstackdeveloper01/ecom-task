import React from 'react';
import { 
  Grid, 
  Pagination, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Alert, 
  Snackbar,
  ToggleButtonGroup,
  ToggleButton,
  ButtonGroup,
  Button
} from '@mui/material';
import { ViewModule, ViewList, CurrencyYen, CurrencyRupee } from '@mui/icons-material';
import ProductCard from './ProductCard';
import { useApp } from '../context/AppContext';

const ProductGrid = () => {
  const { state, dispatch } = useApp();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [layout, setLayout] = React.useState('grid'); // 'grid' or 'list'
  const [currency, setCurrency] = React.useState('JPY'); // 'JPY' or 'INR'
  
  const totalPages = Math.ceil(state.filteredProducts.length / state.itemsPerPage);
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const currentProducts = state.filteredProducts.slice(startIndex, startIndex + state.itemsPerPage);

  const handlePageChange = (event, value) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value });
    window.scrollTo(0, 0);
  };

  const handleSortChange = (event) => {
    dispatch({ type: 'SORT_PRODUCTS', payload: event.target.value });
    dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
  };

  const handleAddToCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    setSnackbarMessage(`${product.name} added to cart!`);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLayoutChange = (event, newLayout) => {
    if (newLayout !== null) {
      setLayout(newLayout);
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Controls Row */}
      <Box sx={{ 
        mb: 3, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        {/* Layout Toggle */}
        <ToggleButtonGroup
          value={layout}
          exclusive
          onChange={handleLayoutChange}
          aria-label="product layout"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <ViewModule />
          </ToggleButton>
          <ToggleButton value="list" aria-label="list view">
            <ViewList />
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Currency Toggle */}
        <ButtonGroup variant="outlined" aria-label="currency selection">
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

        {/* Sort Controls */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort by Price</InputLabel>
          <Select
            value={state.sortOption}
            label="Sort by Price"
            onChange={handleSortChange}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="lowToHigh">Low to High</MenuItem>
            <MenuItem value="highToLow">High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Product Grid - Dynamic layout based on selection */}
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          mb: 4,
          ...(layout === 'list' && {
            flexDirection: 'column',
            '& .MuiGrid-item': {
              maxWidth: '100%',
              flexBasis: '100%'
            }
          })
        }}
      >
        {currentProducts.map((product) => (
          <Grid 
            item 
            xs={12} 
            sm={layout === 'list' ? 12 : 6} 
            md={layout === 'list' ? 12 : 4} 
            key={product.id}
          >
            <ProductCard 
              product={product} 
              onAddToCart={handleAddToCart}
              currency={currency}
              layout={layout}
            />
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={state.currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProductGrid;