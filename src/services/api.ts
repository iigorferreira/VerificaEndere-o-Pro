import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

interface APIResponse<T> {
  data: T;
  error?: string;
}

const API_BASE_URL = '/api';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<APIResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Erro ao processar requisição');
  }

  return data;
}

export const api = {
  addresses: {
    list: (params?: { status?: string; page?: number }) =>
      fetchAPI('/addresses', {
        method: 'GET',
        ...(params && { body: JSON.stringify(params) }),
      }),
    create: (address: Partial<Address>) =>
      fetchAPI('/addresses', {
        method: 'POST',
        body: JSON.stringify(address),
      }),
    update: (id: string, address: Partial<Address>) =>
      fetchAPI(`/addresses/${id}`, {
        method: 'PUT',
        body: JSON.stringify(address),
      }),
    verify: (id: string, verificationData: AddressVerification) =>
      fetchAPI(`/addresses/${id}/verify`, {
        method: 'POST',
        body: JSON.stringify(verificationData),
      }),
    getStats: () => fetchAPI('/addresses/stats'),
  },
  users: {
    list: () => fetchAPI('/users'),
    create: (user: Partial<User>) =>
      fetchAPI('/users', {
        method: 'POST',
        body: JSON.stringify(user),
      }),
    update: (id: string, user: Partial<User>) =>
      fetchAPI(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
      }),
    delete: (id: string) =>
      fetchAPI(`/users/${id}`, {
        method: 'DELETE',
      }),
  },
};