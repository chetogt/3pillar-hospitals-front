export interface Doctor {
  _id: string;
  name: string;
  specialty: string;
}

export interface Doctors_State {
  doctors: Doctor[] | any;
  current: Doctor | any;
  filtered: Doctor[] | any;
  error: any;
  loading: Boolean;
}