import React, { useEffect, useState } from 'react';
import { Container, Alert, Snackbar } from '@mui/material';
import ProductGrid from '../components/ProductGrid';
import Header from '../components/Header';
import { useApp } from '../context/AppContext';
import { products } from '../data/sampleData';

const Home = () => {
    const { dispatch } = useApp();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        dispatch({ type: 'SET_PRODUCTS', payload: products });
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
        setSnackbarMessage(`${product.name} added to cart!`);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Header />
            <Container maxWidth="xl">
                <ProductGrid onAddToCart={handleAddToCart} />
            </Container>

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
        </>
    );
};

export default Home;