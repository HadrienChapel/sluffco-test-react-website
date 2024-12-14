import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { UpdateUserDto, User } from '../types';

async function updateUser(userId: string, data: UpdateUserDto): Promise<User> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        ...data,
        addresses: [],
      } as User);
    }, 1000);
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: UpdateUserDto }) =>
      updateUser(userId, data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user', updatedUser.id], updatedUser);
    },
  });
}