import { createContext } from "react";
import { Doctor } from "../../models/doctors/doctor.model";

type DoctorContextType = {
  doctors: Doctor[];
  current: Doctor;
  filtered: Doctor[];
  error: any;
  loading: Boolean;
  getDoctors: () => Promise<void>;
  getDoctor: (id: string) => Promise<void>;
  addDoctor: (doctor: Doctor) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;
  clearDoctors: () => void;
  setCurrentDoctor: (doctor: Doctor) => void;
  clearCurrentDoctor: () => void;
  updateDoctor: (doctor: Doctor) => Promise<void>;
  filterDoctors: (text: string) => void;
  clearFilterDoctor: () => void;
  assignDoctor: (hospitalId: string, doctor: Doctor) => Promise<void>;
};

const doctorContext = createContext<DoctorContextType>({} as DoctorContextType);

export default doctorContext;