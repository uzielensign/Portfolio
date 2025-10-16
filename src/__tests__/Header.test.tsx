import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, SpyInstance } from 'vitest';

// Import the Header component (client component)
import Header from '../components/Header';

describe('Header dynamic header height', () => {
  let spy: SpyInstance | null = null;

  afterEach(() => {
    if (spy && spy.mockRestore) spy.mockRestore();
    // cleanup any inline style
    document.documentElement.style.removeProperty('--header-height');
  });

  it('sets --header-height on mount and updates on resize', async () => {
    // Initial measurement: 80px
    spy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      const rect = { width: 0, height: 80, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => ({}) } as unknown as DOMRect;
      return rect;
    });

    render(<Header />);

    // Wait for the debounced update to apply
    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--header-height')).toBe('80px');
    });

    // Change measurement and trigger resize
    spy.mockImplementation(function () {
      const rect = { width: 0, height: 120, top: 0, left: 0, right: 0, bottom: 0, x: 0, y: 0, toJSON: () => ({}) } as unknown as DOMRect;
      return rect;
    });

    window.dispatchEvent(new Event('resize'));

    // allow the event handler to run
    await waitFor(() => {
      expect(document.documentElement.style.getPropertyValue('--header-height')).toBe('120px');
    });
  });
});
