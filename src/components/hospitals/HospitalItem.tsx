import { useContext } from "react";
import { Hospital } from "../../models/hospitals/hospital.model";
import HospitalContext from '../../context/hospital/hospitalContext';
import PropTypes from "prop-types";

interface HospitalItemProps {
  hospital: Hospital;
}

const HospitalItem = (props: HospitalItemProps) => {
  const { hospital } = props;
  const hospitalContext = useContext(HospitalContext);
  const { deleteHospital, setCurrentHospital, clearCurrentHospital } = hospitalContext;
  const { _id, name, address, phone } = hospital;

  const onDelete = () => {
    deleteHospital(_id);
    clearCurrentHospital();
  };
  
  return (
    <div className='card bd-light'>
      <h3 className='text-primary text-left'>
        {name}{' '}
      </h3>
      <ul className='list'>
        {address && (
          <li>
            {' '}
            <i className='fas fa-envelope-open' /> {address}
          </li>
        )}
        {phone && (
          <li>
            {' '}
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
      </ul>
      <p>
        <button className='btn btn-dark btn-sm' onClick={() => setCurrentHospital(hospital)}>
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

HospitalItem.protoTypes = {
  hospital: PropTypes.object.isRequired
}

export default HospitalItem;