import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, test, expect, beforeEach, afterEach } from 'vitest';
import { useContactForm } from '../app/contact/useContactForm';

function Harness() {
  const { formRef, clientErrors, localSucceeded, onSubmit } = useContactForm();
  return (
    <div>
      <form ref={formRef} onSubmit={onSubmit} data-testid="form">
        <input name="firstName" aria-label="first name" />
        <input name="lastName" aria-label="last name" />
        <input name="email" aria-label="email" />
        <textarea name="message" aria-label="message" />
        <button type="submit">Send</button>
      </form>
      {clientErrors.message && <div role="alert">{clientErrors.message}</div>}
      {localSucceeded && <div>SUCCEEDED</div>}
    </div>
  );
}

beforeEach(() => {
  // Ensure fetch is reset for each test
  // @ts-expect-error: global.fetch is being deleted to mock fetch in tests
  delete global.fetch;
});

afterEach(() => {
  // clean up any mocks
  vi.restoreAllMocks();
});

test('shows validation error when message is missing', async () => {
  const user = userEvent.setup();
  render(<Harness />);

  await user.type(screen.getByLabelText(/first name/i), 'Jane');
  await user.type(screen.getByLabelText(/last name/i), 'Doe');
  await user.type(screen.getByLabelText(/email/i), 'jane@example.com');

  await user.click(screen.getByRole('button', { name: /send/i }));

  expect(await screen.findByRole('alert')).toHaveTextContent(/Message is required\./i);
});

test('submits successfully when fields are valid', async () => {
  // Mock fetch to return ok
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({}) })));

  const user = userEvent.setup();
  render(<Harness />);

  await user.type(screen.getByLabelText(/first name/i), 'Jane');
  await user.type(screen.getByLabelText(/last name/i), 'Doe');
  await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
  await user.type(screen.getByLabelText(/message/i), 'hello');

  await user.click(screen.getByRole('button', { name: /send/i }));

  expect(await screen.findByText(/SUCCEEDED/i)).toBeInTheDocument();

  // clean up
  // @ts-expect-error: global.fetch is being deleted to clean up after fetch mocking
  delete global.fetch;
});
