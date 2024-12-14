import { User } from '../types';

export async function signInWithGoogle(): Promise<User> {
  // Simulation d'une authentification Google
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'google-123',
        email: 'user@gmail.com',
        name: 'Google User',
      });
    }, 1000);
  });
}

export async function signInWithApple(): Promise<User> {
  // Simulation d'une authentification Apple
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'apple-123',
        email: 'user@icloud.com',
        name: 'Apple User',
      });
    }, 1000);
  });
}