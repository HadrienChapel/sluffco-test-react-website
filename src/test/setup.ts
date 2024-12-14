import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/addresses', () => {
    return HttpResponse.json([
      {
        id: '1',
        userId: '1',
        street: '123 Main St',
        city: 'City',
        postalCode: '12345',
        country: 'Country',
        isDefault: true,
      },
    ]);
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});