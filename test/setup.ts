
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Geolocation API
const mockGeolocation = {
  getCurrentPosition: vi.fn().mockImplementation((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
      })
    )
  ),
  watchPosition: vi.fn(),
};

// Fix: Replaced 'global' with 'globalThis' to resolve "Cannot find name 'global'" error
(globalThis as any).navigator.geolocation = mockGeolocation;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});
