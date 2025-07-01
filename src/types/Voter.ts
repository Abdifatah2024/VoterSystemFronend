// src/types/Voter.ts

export interface Voter {
  id?: number;
  fullName: string;
  gender: string;
  dateOfBirth: string; // ISO format: 'YYYY-MM-DD'
  phoneNumber: string;
  city: string;
  district: string;
  address: string;
  hasVoterId?: boolean;
  registeredPlace?: string | null;
  wantsToChangeRegistration?: boolean;
  newRegistrationPlace?: string | null;
  desiredRegistrationPlace?: string | null;
  clanTitle: string;
  clanSubtitle: string;
  createdAt?: string;
}
