import { api } from './api';
import { RegisterFormData, VerifyEmailData } from '../types/auth';

export const registerUser = async (data: RegisterFormData) => {
  return api.post('/auth/register', data);
};

export const verifyEmail = async (data: VerifyEmailData) => {
  return api.post('/auth/verify-email', data);
};
