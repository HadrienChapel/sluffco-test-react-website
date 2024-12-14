import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { Address, AddressFormData } from '../types';
import { useAuthStore } from '../store/useAuthStore';

// Simulate API calls
const mockAddresses: Address[] = [
  {
    id: '1',
    userId: '1',
    street: '123 Main St',
    city: 'City',
    postalCode: '12345',
    country: 'Country',
    isDefault: true,
  },
];

async function fetchAddresses(userId: string): Promise<Address[]> {
  return Promise.resolve(mockAddresses.filter((a) => a.userId === userId));
}

async function createAddress(userId: string, data: AddressFormData): Promise<Address> {
  const newAddress: Address = {
    id: Math.random().toString(),
    userId,
    ...data,
  };
  mockAddresses.push(newAddress);
  return Promise.resolve(newAddress);
}

async function updateAddress(addressId: string, data: Partial<Address>): Promise<Address> {
  const index = mockAddresses.findIndex((a) => a.id === addressId);
  if (index === -1) throw new Error('Address not found');
  
  mockAddresses[index] = { ...mockAddresses[index], ...data };
  return Promise.resolve(mockAddresses[index]);
}

async function deleteAddress(addressId: string): Promise<void> {
  const index = mockAddresses.findIndex((a) => a.id === addressId);
  if (index === -1) throw new Error('Address not found');
  
  mockAddresses.splice(index, 1);
  return Promise.resolve();
}

export function useAddresses() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const addresses = useQuery({
    queryKey: ['addresses', user?.id],
    queryFn: () => fetchAddresses(user!.id),
    enabled: !!user,
  });

  const createMutation = useMutation({
    mutationFn: (data: AddressFormData) => createAddress(user!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ addressId, data }: { addressId: string; data: Partial<Address> }) =>
      updateAddress(addressId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses', user?.id] });
    },
  });

  return {
    addresses,
    createAddress: createMutation.mutate,
    updateAddress: updateMutation.mutate,
    deleteAddress: deleteMutation.mutate,
    isLoading:
      addresses.isLoading ||
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}