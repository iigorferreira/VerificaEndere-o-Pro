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

export interface AddressVerification {
  verifierId: string;
  status: 'verified' | 'failed';
  notes?: string;
  photos?: string[];
  latitude?: number;
  longitude?: number;
  verifiedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'verifier';
  active: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export interface Stats {
  totalAddresses: number;
  verifiedAddresses: number;
  pendingAddresses: number;
  failedAddresses: number;
  successRate: number;
  averageResponseTime: number;
  activeUsers: number;
  verificationsByDay: {
    date: string;
    count: number;
  }[];
}