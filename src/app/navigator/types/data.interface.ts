export interface IData {
  _id: number;
  amount: number;
  type: string;
  name: { first: string; last: string };
  company: string;
  email: string;
  phone: string;
  address: string;
}
