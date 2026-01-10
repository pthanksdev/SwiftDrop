
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { HashRouter } from 'react-router-dom';
import authReducer from '../../store/slices/authSlice';
import Login from '../../pages/auth/Login';
import React from 'react';

// Mock auth API
vi.mock('../../api/endpoints/auth.api', () => ({
  authApi: {
    login: vi.fn().mockResolvedValue({
      data: {
        user: { id: '1', firstName: 'Admin', role: 'ADMIN' },
        token: 'fake-jwt'
      }
    })
  }
}));

describe('Login Integration Flow', () => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  it('successfully logs in a user and updates store', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <Login />
        </HashRouter>
      </Provider>
    );

    const emailInput = screen.getByLabelText(/Email Address/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);
    const submitButton = screen.getByRole('button', { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: 'admin@swiftdrop.io' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    fireEvent.click(submitButton);

    await waitFor(() => {
      const state = store.getState();
      expect(state.auth.isAuthenticated).toBe(true);
      expect(state.auth.user?.firstName).toBe('Admin');
    });
  });

  it('displays validation errors on empty submission', async () => {
    render(
      <Provider store={store}>
        <HashRouter>
          <Login />
        </HashRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /Sign In/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/Password must be at least 6 characters/i)).toBeInTheDocument();
  });
});
