import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'qa', 'production']).default('development'),
  VITE_API_URL: z.string().url(),
  VITE_ANALYTICS_ID: z.string().optional(),
  VITE_SENTRY_DSN: z.string().optional(),
});

const env = envSchema.parse({
  NODE_ENV: import.meta.env.MODE,
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_ANALYTICS_ID: import.meta.env.VITE_ANALYTICS_ID,
  VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
});

export const config = {
  env: env.NODE_ENV,
  apiUrl: env.VITE_API_URL,
  analytics: {
    enabled: env.NODE_ENV !== 'development',
    id: env.VITE_ANALYTICS_ID,
  },
  sentry: {
    enabled: env.NODE_ENV === 'production',
    dsn: env.VITE_SENTRY_DSN,
  },
} as const;