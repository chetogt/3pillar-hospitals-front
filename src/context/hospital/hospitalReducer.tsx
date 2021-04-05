import { Hospital, Hospitals_State } from '../../models/hospitals/hospital.model';
import { 
  GET_HOSPITALS,
  ADD_HOSPITAL,
  DELETE_HOSPITAL,
  SET_CURRENT_HOSPITAL,
  CLEAR_CURRENT_HOSPITAL,
  UPDATE_HOSPITAL,
  FILTER_HOSPITALS,
  CLEAR_HOSPITALS,
  CLEAR_FILTER_HOSPITAL,
  HOSPITAL_ERROR,
  REMOVE_DOCTOR
} from '../types';

const hospitalReducer = (state: Hospitals_State, action: any) => {
  switch (action.type) {
    case GET_HOSPITALS:
      return {
        ...state,
        hospitals: action.payload.data,
        loading: false
      };
    case ADD_HOSPITAL:
      return {
        ...state,
        hospitals: [action.payload.data.hospital, ...state.hospitals],
        loading: false
      };
    case UPDATE_HOSPITAL:
      return {
        ...state,
        hospitals: state.hospitals.map((hospital: Hospital) =>
          hospital._id === action.payload.data.hospital._id ? action.payload.data.hospital : hospital
        ),
        loading: false
      };
    case DELETE_HOSPITAL:
      return {
        ...state,
        hospitals: state.hospitals.filter((hospital: Hospital) => hospital._id !== action.payload),
        loading: false
      };
    case CLEAR_HOSPITALS:
      return {
        ...state,
        hospitals: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT_HOSPITAL:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_HOSPITAL:
      return {
        ...state,
        current: null,
        loading: false
      };
    case FILTER_HOSPITALS:
      return {
        ...state,
        filtered: state.hospitals.filter((hospital: Hospital) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return hospital.name.match(regex) || hospital.address.match(regex);
        }),
        loading: false
      };
    case CLEAR_FILTER_HOSPITAL:
      return {
        ...state,
        filtered: null,
        loading: false
      };
    case HOSPITAL_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case REMOVE_DOCTOR:
      state.hospitals.forEach((hospital: Hospital) => {
        hospital.doctors = hospital.doctors.filter((doctor) => doctor != action.payload.doctorId)
      });
      return {
        ...state,
        current: null,
        loading: false
      };
    default:
      return state;
  }
};

export default hospitalReducer;