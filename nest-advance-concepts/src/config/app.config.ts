import { registerAs } from '@nestjs/config';
import z from 'zod';

const appConfigSchema = z.object({
    port: z.coerce.number().int().min(1).max(65535).default(3000),
    env: z.enum(['development', 'production', 'test']).default('development'),
});

export const APP_CONFIG_KEY = 'app';

export type AppConfig = z.infer<typeof appConfigSchema>;

export const appConfig = registerAs(APP_CONFIG_KEY, () =>
    appConfigSchema.parse({
        port: process.env['PORT'],
        env: process.env['NODE_ENV'],
    }),
);
