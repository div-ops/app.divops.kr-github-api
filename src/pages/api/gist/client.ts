import { createGistCRUD } from '@divops-packages/gist-crud-core';
import { ensureEnv } from '@divops-packages/node-utils'

export const client = createGistCRUD({
  baseUrl: 'https://api.github.com',
  token: ensureEnv('GIST_STORAGE_TOKEN'),
});
