export interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
  }
  
  export interface VerifyEmailData {
    email: string;
    code: string;
  }
  