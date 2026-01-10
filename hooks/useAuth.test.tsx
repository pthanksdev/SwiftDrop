
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/slices/authSlice';
import { useAuth } from './useAuth';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

// Wrapper for hooks that need Redux and Router context
const createWrapper = () => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  );
};

describe('useAuth hook', () => {
  it('initially reports non-authenticated state', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });
});
