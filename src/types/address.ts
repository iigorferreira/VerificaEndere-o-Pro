export interface Address {
  id: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  status: 'pending' | 'verified' | 'failed';
  createdAt: Date;
  updatedAt: Date;
  verifiedBy?: string;
  notes?: string;
  referencePoints?: string;
  facadePhoto?: string;
}