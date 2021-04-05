import { useContext } from "react";
import { Doctor } from "../../models/doctors/doctor.model";
import DoctorContext from '../../context/doctor/doctorContext';
import PropTypes from "prop-types";

interface DoctorItemProps {
  doctor: Doctor;
}

const DoctorItem = (props: DoctorItemProps) => {
  const { doctor } = props;
  const doctorContext = useContext(DoctorContext);
  const { deleteDoctor, setCurrentDoctor, clearCurrentDoctor } = doctorContext;
  const { _id, name, specialty } = doctor;

  const onDelete = () => {
    deleteDoctor(_id);
    clearCurrentDoctor();
  };
  
  return (
    <div className='card bd-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
      </h3>
      <ul className='list'>
        {specialty && (
          <li>
            {' '}
            <i className='fas fa-envelope-open' /> {specialty}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrentDoctor(doctor)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

DoctorItem.protoTypes = {
  doctor: PropTypes.object.isRequired
}

export default DoctorItem;