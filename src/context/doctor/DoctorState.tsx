import { PropsWithChildren, useReducer } from 'react';
import { Doctor, Doctors_State } from '../../models/doctors/doctor.model';
import { Hospital } from '../../models/hospitals/hospital.model';
import g_instance from '../../utils/generic_instance';
import setAuthToken from '../../utils/setAuthToken';
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
import DoctorContext from './doctorContext';
import doctorReducer from './doctorReducer';

const DoctorState = (props: PropsWithChildren<any>) => {
  const initialState: Doctors_State = {
    doctors: null,
    current: null,
    filtered: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(doctorReducer, initialState);

  // Get Doctors
  const getDoctors = async () => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.get('/v1/doctors');
      dispatch({ type: GET_DOCTORS, payload: res.data });
    } catch (err) {
      dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
    }
  };

  // Get Doctor
  const getDoctor = async (id: string) => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.get(`/v1/doctors/${id}`);
      dispatch({ type: GET_DOCTOR, payload: res.data });
    } catch (err) {
      dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
    }
  };

  // Add Doctor
  const addDoctor = async (doctor: Doctor) => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.post('/v1/doctors', doctor);
      dispatch({ type: ADD_DOCTOR, payload: res.data });
    } catch (err) {
      dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
    }
  };

  // Delete Doctor
  const deleteDoctor = async (id: string) => {
    try {
      await g_instance.delete(`/v1/doctors/${id}`);
      dispatch({ type: DELETE_DOCTOR, payload: id });
    } catch (err) {
      dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
    }
  };

  // Clear Doctor
  const clearDoctors = () => {
    dispatch({ type: CLEAR_DOCTORS });
  };

  // Set Current Doctor
  const setCurrentDoctor = (doctor: Doctor) => {
    dispatch({ type: SET_CURRENT_DOCTOR, payload: doctor });
  };

  // Clear Current Doctor
  const clearCurrentDoctor = () => {
    dispatch({ type: CLEAR_CURRENT_DOCTOR });
  };

  // Update Doctor
  const updateDoctor = async (doctor: Doctor) => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    try {
      const res = await g_instance.put(`/v1/doctors/${doctor._id}`, doctor, {});
      dispatch({ type: UPDATE_DOCTOR, payload: res.data });
    } catch (err) {
      dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
    }
  }
  // Filter Doctors
  const filterDoctors = (text: string) => {
    dispatch({ type: FILTER_DOCTORS, payload: text });
  };

  // Clear Filters
  const clearFilterDoctor = () => {
    dispatch({ type: CLEAR_FILTER_DOCTOR });
  };

  // Assign Doctor
  const assignDoctor = async (hospitalId: string, doctor: Doctor) => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'));
    }
    let hospital = {
      doctors: [
        doctor._id
      ]
    } as Hospital;
    try {
      const res = await g_instance.put(`/v1/hospitals/${hospitalId}`, hospital, {});
      const payload = {hospital: res.data.data.hospital, doctor: doctor };
      dispatch({ type: ASSIGN_DOCTOR, payload: payload });
    } catch (err) {
      dispatch({ type: DOCTOR_ERROR, payload: err.response.msg });
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors: state.doctors,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addDoctor,
        deleteDoctor,
        setCurrentDoctor,
        clearCurrentDoctor,
        updateDoctor,
        filterDoctors,
        clearFilterDoctor,
        getDoctors,
        clearDoctors,
        assignDoctor,
        getDoctor
      }}>
        {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorState;