import { useContext, useEffect, useState } from "react";
import DoctorContext from '../../context/doctor/doctorContext';
import { Doctor } from "../../models/doctors/doctor.model";
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from "../../models/hospitals/hospital.model";

const DoctorForm = () => {
  const doctorContext = useContext(DoctorContext);
  const { addDoctor, clearCurrentDoctor, updateDoctor, assignDoctor, current } = doctorContext;
  const hospitalContext = useContext(HospitalContext);
  const { hospitals, getHospitals, loading } = hospitalContext;

  useEffect(() => {
    if (current != null) {
      setDoctor(current);
      getHospitals();
    } else {
      setDoctor({
        name: '',
        specialty: ''
      } as Doctor);
    }
  }, [doctorContext, current]);

  const [doctor, setDoctor] = useState({
    name: '',
    specialty: ''
  } as Doctor);

  const [hospital, setHospital] = useState('');

  const { name, specialty } = doctor;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDoctor({ ...doctor, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (current === null) {
      addDoctor(doctor);
    } else {
      updateDoctor(doctor);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentDoctor();
  };

  const assignToHospital = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    assignDoctor(hospital, doctor);
  };
  
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Doctor' : 'Add Doctor'}</h2>
      <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
      <input type='text' placeholder='Specialty' name='specialty' value={specialty} onChange={onChange} />
      <div>
        <input
          type='submit'
          value={current ? 'Update Doctor' : 'Add Doctor'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (hospitals !== null && hospitals.length > 0) && (
        <select
          onChange={e => setHospital(e.currentTarget.value)}
          defaultValue={'-'}>
          <option disabled value={'-'}>Select a hospital</option>
          {hospitals.map((hospital) => (
            <option value={hospital._id} key={hospital._id}>{hospital.name}</option>
          ))}
        </select>
      )}
      {current && (
        <div>
          <button className='btn btn-success btn-block' onClick={assignToHospital}>
            Assign to hospital
          </button>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default DoctorForm;