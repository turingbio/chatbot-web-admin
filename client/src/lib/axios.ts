import axios from 'axios';
import { BASE_URL } from '@/lib/const';

export const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export const handleAxiosError = ({ error, message = '' }:{
  error: unknown;
  message: string;
}) => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message;
  }
  return message;
};
