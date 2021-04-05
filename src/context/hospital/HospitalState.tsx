import { PropsWithChildren, useReducer } from 'react';
import { Doctor } from '../../models/doctors/doctor.model';
import { Hospital, Hospitals_State } from '../../models/hospitals/hospital.model';
import g_instance from '../../utils/generic_instance';
import setAuthToken from '../../utils/setAuthToken';
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
import HospitalContext from './hospitalContext';
import hospitalReducer from './hospitalReducer';

const HospitalState = (props: PropsWithChildren<any>) => {
  const initialState: Hospitals_State = {
    hospitals: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(hospitalReducer, initialState);

  // Get Hospitals
  const getHospitals = async () => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.get('/v1/hospitals');
      dispatch({ type: GET_HOSPITALS, payload: res.data });
    } catch (err) {
      dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
    }
  };

  // Add Hospital
  const addHospital = async (hospital: Hospital) => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.post('/v1/hospitals', hospital);
      dispatch({ type: ADD_HOSPITAL, payload: res.data });
    } catch (err) {
      dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
    }
  };

  // Delete Hospital
  const deleteHospital = async (id: string) => {
    try {
      await g_instance.delete(`/v1/hospitals/${id}`);
      dispatch({ type: DELETE_HOSPITAL, payload: id });
    } catch (err) {
      dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
    }
  };

  // Clear Hospital
  const clearHospitals = () => {
    dispatch({ type: CLEAR_HOSPITALS });
  };

  // Set Current Hospital
  const setCurrentHospital = (hospital: Hospital) => {
    dispatch({ type: SET_CURRENT_HOSPITAL, payload: hospital });
  };

  // Clear Current Hospital
  const clearCurrentHospital = () => {
    dispatch({ type: CLEAR_CURRENT_HOSPITAL });
  };

  // Update Hospital
  const updateHospital = async (hospital: Hospital) => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.put(`/v1/hospitals/${hospital._id}`, hospital, {});
      dispatch({ type: UPDATE_HOSPITAL, payload: res.data });
    } catch (err) {
      dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
    }
  }

  // Filter Hospitals
  const filterHospitals = (text: string) => {
    dispatch({ type: FILTER_HOSPITALS, payload: text });
  };

  // Clear Filters
  const clearFilterHospital = () => {
    dispatch({ type: CLEAR_FILTER_HOSPITAL });
  };

  // Remove Doctor from Hospital
  const removeDoctor = async (id: string, doctorId: string) => {
    try {
      await g_instance.delete(`/v1/hospitals/${id}/doctors/${doctorId}`);
      dispatch({ type: REMOVE_DOCTOR, payload: doctorId });
    } catch (err) {
      dispatch({ type: HOSPITAL_ERROR, payload: err.response.msg });
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        hospitals: state.hospitals,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addHospital,
        deleteHospital,
        setCurrentHospital,
        clearCurrentHospital,
        updateHospital,
        filterHospitals,
        clearFilterHospital,
        getHospitals,
        clearHospitals,
        removeDoctor
      }}>
        {props.children}
    </HospitalContext.Provider>
  );
};

export default HospitalState;