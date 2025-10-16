import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterAll } from 'vitest';

// Mock Formspree so the component's call to useForm doesn't throw during tests
vi.mock('@formspree/react', () => ({
  __esModule: true,
  useForm: () => [{ succeeded: false, submitting: false, errors: [] }, vi.fn()],
  ValidationError: () => null,
}));

// Mock the useTheme hook to simulate initial null state (theme not yet initialized)
vi.mock('../hooks/useTheme', () => ({
  __esModule: true,
  default: () => ({ isDark: null }),
}));

// Stub fetch to return a resolved response quickly so ContactForm's effect won't trigger uncaptured async updates
vi.stubGlobal('fetch', vi.fn(async () => ({ json: async () => ({ configured: false }) })));

// Clean up the global stub after tests in this file
afterAll(() => {
  // @ts-expect-error - delete global.fetch for cleanup in the test environment
  delete global.fetch;
});

// Import after mocks so module initialization uses the mocked modules
import Contact from '../app/contact/page';

describe('Contact page', () => {
  it('renders the page immediately when theme is not yet initialized', async () => {
    render(<Contact />);
    // The page should render the Contact heading even when isDark is null
    await waitFor(() => expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument());
  });
});
