import createClient from 'openapi-fetch';
import type { paths } from '../api-schema';

export const client = createClient<paths>({ baseUrl: 'http://127.0.0.1:5000/' });
