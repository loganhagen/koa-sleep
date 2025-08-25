export interface User {
  data: UserDetails;
}

export interface UserDetails {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}
