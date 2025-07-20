export interface IUpdateContactDTO {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: string | null;
  userId: number;
}
