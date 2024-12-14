import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Classic Beanie',
    price: 29.99,
    category: 'beanie',
    images: ['https://images.unsplash.com/photo-1576871409226-d3a15396ee4b'],
    description: 'Warm and comfortable beanie for winter sports',
    colors: ['black', 'navy', 'gray'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '2',
    name: 'Pro Ski Mask',
    price: 49.99,
    category: 'mask',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256'],
    description: 'Professional ski mask with excellent visibility',
    colors: ['black', 'white'],
  },
  // Add more mock products...
];

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => Promise.resolve(mockProducts),
  });
}