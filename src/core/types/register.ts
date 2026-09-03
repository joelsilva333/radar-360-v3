export interface AgTCompanyData {
  nif: string;
  denomination: string;
  province: string;
  municipality: string;
  district: string;
  street: string;
}

export interface RegisterStep1Data {
  fullname: string;
  role: string;
  phone?: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface RegisterNifData {
  nif: string;
  denomination: string;
}

export type CompleteRegistrationData = RegisterStep1Data & RegisterNifData;
