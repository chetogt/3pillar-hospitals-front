import { Doctor, Doctors_State } from '../../models/doctors/doctor.model';
import { 
  GET_DOCTORS,
  GET_DOCTOR,
  ADD_DOCTOR,
  DELETE_DOCTOR,
  SET_CURRENT_DOCTOR,
  CLEAR_CURRENT_DOCTOR,
  UPDATE_DOCTOR,
  FILTER_DOCTORS,
  CLEAR_DOCTORS,
  CLEAR_FILTER_DOCTOR,
  DOCTOR_ERROR,
  ASSIGN_DOCTOR
} from '../types';

const doctorReducer = (state: Doctors_State, action: any) => {
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload.data,
        loading: false
      };
    case GET_DOCTOR:
      return {
        ...state,
        doctor: action.payload.data,
        loading: false
      };
    case ADD_DOCTOR:
      return {
        ...state,
        doctors: [action.payload.data.doctor, ...state.doctors],
        loading: false
      };
    case UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map((doctor: Doctor) =>
          doctor._id === action.payload.data.doctor._id ? action.payload.data.doctor : doctor
        ),
        loading: false
      };
    case DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter((doctor: Doctor) => doctor._id !== action.payload),
        loading: false
      };
    case CLEAR_DOCTORS:
      return {
        ...state,
        doctors: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT_DOCTOR:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_DOCTOR:
      return {
        ...state,
        current: null,
        loading: false
      };
    case FILTER_DOCTORS:
      return {
        ...state,
        filtered: state.doctors.filter((doctor: Doctor) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return doctor.name.match(regex) || doctor.specialty.match(regex);
        }),
        loading: false
      };
    case CLEAR_FILTER_DOCTOR:
      return {
        ...state,
        filtered: null,
        loading: false
      };
    case DOCTOR_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case ASSIGN_DOCTOR:
      return {
        ...state,
        hospital: action.payload.hospital,
        doctor: action.payload.doctor,
        current: null,
        loading: false
      }  
    default:
      return state;
  }
};

export default doctorReducer;