import { Fragment, useContext, useEffect } from "react";
import DoctorContext from '../../context/doctor/doctorContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import DoctorItem from './DoctorItem';
import Spinner from "../layout/Spinner";
import DoctorForm from './DoctorForm';
import DoctorFilter from './DoctorFilter';

const Doctors = () => {
  const doctorContext = useContext(DoctorContext);
  const { doctors, filtered, getDoctors, loading } = doctorContext;

  useEffect(() => {
    getDoctors();
  }, []);

  if (doctors !== null && doctors.length === 0) {
    return <h4>Please add a doctor</h4>;
  }
  
  return (
    <div className='grid-2'>
      <div>
        <DoctorForm />
      </div>
      <div>
        <DoctorFilter />
        <Fragment>
          <h1>Doctors</h1>
          {doctors !== null && !loading ? (
            <TransitionGroup>
              {filtered !== null
              ? filtered.map((doctor) => (
                <CSSTransition key={doctor._id} timeout={500} classNames='item'>
                  <DoctorItem doctor={doctor} />
                </CSSTransition>
              )) : doctors.map((doctor) => (
                <CSSTransition key={doctor._id} timeout={500} classNames='item'>
                  <DoctorItem doctor={doctor} />
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

export default Doctors;