import { error } from '@sveltejs/kit';

export function load({ params }) {
  if (params.id) return { id: params.id };
  // if false throw an error
  throw error(404, 'Not Found, Invalid invoice id');
}
