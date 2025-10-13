// Add tests for ContactFormUI
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { test, expect, vi } from 'vitest';
import ContactFormUI from '../app/contact/ContactFormUI';

test('renders client errors and server errors, and calls onSubmit', async () => {
  const mockOnSubmit = vi.fn((e) => e.preventDefault());
  const clientErrors = { message: 'Message is required.' };
  const serverErrors = [{ message: 'Server error' }];

  render(
    <ContactFormUI
      formRef={{ current: null }}
      onSubmit={mockOnSubmit}
      isProcessing={false}
      clientErrors={clientErrors}
      serverErrors={serverErrors}
      succeeded={false}
      formspreeErrors={[]}
      submitting={false}
    />
  );

  expect(screen.getByText(/Message is required\./i)).toBeInTheDocument();
  expect(screen.getByText(/Server error/i)).toBeInTheDocument();

  const user = userEvent.setup();
  await user.click(screen.getByRole('button', { name: /send message/i }));

  expect(mockOnSubmit).toHaveBeenCalled();
});

test('shows success UI when succeeded=true', () => {
  render(
    <ContactFormUI
      formRef={{ current: null }}
      onSubmit={() => {}}
      isProcessing={false}
      clientErrors={{}}
      serverErrors={[]}
      succeeded={true}
      formspreeErrors={[]}
      submitting={false}
    />
  );

  expect(screen.getByText(/Thanks — I got your message!/i)).toBeInTheDocument();
});

