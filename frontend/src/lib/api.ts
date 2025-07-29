import { browser } from "$app/environment";
import type { ApiError } from "../../../types"
import { PUBLIC_API_BASE } from '$env/static/public'

const API_BASE = browser ? (PUBLIC_API_BASE || '/api') : 'http://localhost:8000/api';

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE}${endpoint}`;

    const config: RequestInit = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    if (config.body && typeof config.body === 'object' && !(config.body instanceof FormData)) {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);

      const contentType = response.headers.get('content-type');
      let data: any;

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const error: ApiError = {
          error: data?.error || data || `HTTP ${response.status}`,
          statusCode: response.status
        };

        throw error;
      }

      return data;
    } catch (e) {
      if (e instanceof Error) {
        console.error('API request failed: ', e.message);
      }

      throw e;
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(
      endpoint, { ...options, method: 'GET' }
    );
  }

  async post<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(
      endpoint,
      { ...options, method: 'POST', body: data }
    );
  }

  async put<T>(endpoint: string, data?: any, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data
    });
  }

  async delete<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const api = new ApiClient();