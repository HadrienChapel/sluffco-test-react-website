import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAddresses } from '../useAddresses';
import { useAuthStore } from '../../store/useAuthStore';

describe('useAddresses', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    useAuthStore.setState({
      user: { id: '1', name: 'Test User', email: 'test@example.com', addresses: [] },
      isAuthenticated: true,
    });
  });

  it('fetches addresses for authenticated user', async () => {
    const { result } = renderHook(() => useAddresses(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    await waitFor(() => {
      expect(result.current.addresses.data).toBeDefined();
    });

    expect(result.current.addresses.data?.[0]).toEqual(
      expect.objectContaining({
        id: '1',
        userId: '1',
        street: '123 Main St',
      })
    );
  });

  it('provides mutation functions', () => {
    const { result } = renderHook(() => useAddresses(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    expect(result.current.createAddress).toBeDefined();
    expect(result.current.updateAddress).toBeDefined();
    expect(result.current.deleteAddress).toBeDefined();
  });
});