import React, { createContext, useContext, useReducer } from 'react';

const AppContext = createContext();

const initialState = {
  products: [],
  filteredProducts: [],
  sortOption: '',
  currentPage: 1,
  itemsPerPage: 12,
  cart: [],
  notifications: []
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        filteredProducts: action.payload
      };
    
    case 'SORT_PRODUCTS':
      const sortedProducts = [...state.filteredProducts];
      if (action.payload === 'lowToHigh') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (action.payload === 'highToLow') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      return {
        ...state,
        filteredProducts: sortedProducts,
        sortOption: action.payload
      };
    
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload
      };
    
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};