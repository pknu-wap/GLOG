'use client';

import axios from 'axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const axiosApi = (url: string, data?: any) => {
  let token: string | null = '';

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...data,
  });

  return instance;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const unAxiosApi = (url: string, data?: any) => {
  const instance = axios.create({
    baseURL: url,
    withCredentials: true,
    ...data,
  });

  return instance;
};

export const defaultInstance = axiosApi('http://3.35.24.11:8080');

export const unAxiosDefaultInstance = unAxiosApi('http://3.35.24.11:8080');
