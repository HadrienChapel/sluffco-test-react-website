// Existing types...

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  addresses: Address[];
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  userId: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  phone?: string;
}

export interface AddressFormData {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}