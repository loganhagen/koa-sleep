export interface UserAPIResponse {
  user: UserDTO;
}

export interface UserDTO {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}
