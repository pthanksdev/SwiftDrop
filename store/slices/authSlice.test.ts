
import { describe, it, expect } from 'vitest';
import authReducer, { loginSuccess, logout } from './authSlice';
import { UserRole } from '../../types/api.types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  };

  it('should handle loginSuccess', () => {
    const mockPayload = {
      user: {
        id: '1',
        email: 'test@swiftdrop.io',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
        role: UserRole.ADMIN,
        isActive: true,
        createdAt: '',
        updatedAt: '',
      },
      token: 'mock-token',
    };

    const newState = authReducer(initialState, loginSuccess(mockPayload));

    expect(newState.isAuthenticated).toBe(true);
    expect(newState.token).toBe('mock-token');
    expect(newState.user?.email).toBe('test@swiftdrop.io');
  });

  it('should handle logout', () => {
    const loggedInState = {
      ...initialState,
      isAuthenticated: true,
      token: 'some-token',
    };

    const newState = authReducer(loggedInState, logout());

    expect(newState.isAuthenticated).toBe(false);
    expect(newState.token).toBe(null);
    expect(newState.user).toBe(null);
  });
});
