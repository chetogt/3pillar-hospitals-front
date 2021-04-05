import { Doctor } from "../doctors/doctor.model";

export interface Hospital {
  _id: string;
  name: string;
  address: string;
  phone: string;
  doctors: string[];
}

export interface Hospitals_State {
  hospitals: Hospital[] | any;
  current: Hospital | any;
  filtered: Hospital[] | any;
  error: any;
  loading: Boolean;
}