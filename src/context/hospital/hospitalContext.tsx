import { createContext } from "react";
import { Hospital } from "../../models/hospitals/hospital.model";

type HospitalContextType = {
  hospitals: Hospital[];
  current: Hospital;
  filtered: Hospital[];
  error: any;
  loading: Boolean;
  getHospitals: () => Promise<void>;
  addHospital: (hospital: Hospital) => Promise<void>;
  deleteHospital: (id: string) => Promise<void>;
  clearHospitals: () => void;
  setCurrentHospital: (hospital: Hospital) => void;
  clearCurrentHospital: () => void;
  updateHospital: (hospital: Hospital) => Promise<void>;
  filterHospitals: (text: string) => void;
  clearFilterHospital: () => void;
  removeDoctor: (id: string, doctorId: string) => Promise<void>;
};

const hospitalContext = createContext<HospitalContextType>({} as HospitalContextType);

export default hospitalContext;