export interface User {
  _id: string;
  username: string;
  email?: string;
  avatar?: string;
  isOnline?: boolean;
  lastSeen?: Date;
  createdAt?: string;
  updatedAt?: string;
}
