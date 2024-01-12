require('dotenv').config();
const { z } = require('zod');

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    JWT_SECRET: z.string(),
    PORT: z.coerce.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error('❌ Invalid environment variables', _env.error.format());
    throw new Error('Invalid environment variables.');
}

const env = _env.data;

module.exports = { env };
