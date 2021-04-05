import { Fragment, useContext, useEffect } from "react";
import HospitalContext from '../../context/hospital/hospitalContext';
import DoctorContext from '../../context/doctor/doctorContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HospitalItem from './HospitalItem';
import Spinner from "../layout/Spinner";
import HospitalForm from '../hospitals/HospitalForm';
import HospitalFilter from '../hospitals/HospitalFilter';

const Hospitals = () => {
  const hospitalContext = useContext(HospitalContext);
  const { hospitals, filtered, getHospitals, loading } = hospitalContext;
  const doctorContext = useContext(DoctorContext);
  const { getDoctors } = doctorContext;

  useEffect(() => {
    getHospitals();
    getDoctors();
  }, []);

  if (hospitals !== null && hospitals.length === 0) {
    return <h4>Please add a hospital</h4>;
  }
  
  return (
    <div className='grid-2'>
      <div>
        <HospitalForm />
      </div>
      <div>
        <HospitalFilter />
        <Fragment>
          <h1>Hospitals</h1>
          {hospitals !== null && !loading ? (
            <TransitionGroup>
              {filtered !== null
              ? filtered.map((hospital) => (
                <CSSTransition key={hospital._id} timeout={500} classNames='item'>
                  <HospitalItem hospital={hospital} />
                </CSSTransition>
              )) : hospitals.map((hospital) => (
                <CSSTransition key={hospital._id} timeout={500} classNames='item'>
                  <HospitalItem hospital={hospital} />
                </CSSTransition>
              ))}
            </TransitionGroup>
          ) : (
            <Spinner />
          )}
        </Fragment>
      </div>
    </div>
  );
};

export default Hospitals;