import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUpdateUser } from '../useUpdateUser';

describe('useUpdateUser', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('updates user data', async () => {
    const { result } = renderHook(() => useUpdateUser(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    const updateData = {
      name: 'New Name',
      email: 'new@example.com',
    };

    result.current.mutate(
      { userId: '1', data: updateData },
      {
        onSuccess: (data) => {
          expect(data).toEqual(
            expect.objectContaining({
              id: '1',
              ...updateData,
            })
          );
        },
      }
    );
  });
});