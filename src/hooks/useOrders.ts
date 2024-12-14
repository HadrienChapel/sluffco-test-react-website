import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/useAuthStore';
import type { Order } from '../types';

// Simulated orders data
const mockOrders: Order[] = [
  {
    id: '1',
    userId: '1',
    items: [
      {
        productId: '1',
        quantity: 1,
        price: 29.99,
        color: 'black',
        size: 'M',
      },
    ],
    status: 'delivered',
    total: 29.99,
    shippingAddress: {
      street: '123 Main St',
      city: 'City',
      postalCode: '12345',
      country: 'Country',
    },
    createdAt: '2024-02-20T12:00:00Z',
    trackingNumber: 'TR123456789',
  },
  // Add more mock orders as needed
];

export function useOrders() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ['orders', user?.id],
    queryFn: () =>
      Promise.resolve(
        mockOrders.filter((order) => order.userId === user?.id)
      ),
    enabled: !!user,
  });
}