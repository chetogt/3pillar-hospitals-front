import { useContext, useEffect, useState } from "react";
import HospitalContext from '../../context/hospital/hospitalContext';
import { Hospital } from "../../models/hospitals/hospital.model";
import DoctorContext from '../../context/doctor/doctorContext';
import { Doctor } from '../../models/doctors/doctor.model';

const HospitalForm = () => {
  const hospitalContext = useContext(HospitalContext);
  const { addHospital, clearCurrentHospital, updateHospital, removeDoctor, current } = hospitalContext;
  const doctorContext = useContext(DoctorContext);
  const { doctors } = doctorContext;

  useEffect(() => {
    if (current != null) {
      setHospital(current);
      if (doctors && hospital) {
        let assigned = [] as Doctor[];
        current.doctors.forEach((doctor) => {
          const docFound = doctors.filter(doc => doc._id == doctor);
          assigned.push(...docFound);
        });
        setAssignedDoctors(assigned);
      } else {
        setAssignedDoctors([]);
      }
    } else {
      setHospital({
        name: '',
        address: '',
        phone: ''
      } as Hospital);
    }
  }, [hospitalContext, current]);

  const [hospital, setHospital] = useState({
    name: '',
    address: '',
    phone: ''
  } as Hospital);

  const [assignedDoctors, setAssignedDoctors] = useState([] as Doctor[]);

  const { name, address, phone } = hospital;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setHospital({ ...hospital, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (current === null) {
      addHospital(hospital);
    } else {
      updateHospital(hospital);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentHospital();
  };

  const removeDoctorFromHospital = (doctorId: string) => {
    removeDoctor(hospital._id, doctorId);
  };
  
  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? 'Edit Hospital' : 'Add Hospital'}</h2>
      <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
      <input type='text' placeholder='Address' name='address' value={address} onChange={onChange} />
      <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
      <div>
        <input
          type='submit'
          value={current ? 'Update Hospital' : 'Add Hospital'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && assignedDoctors && (
        <>
          <h3>Doctors assigned</h3>
          <ul style={{ marginBottom: '20px' }}>
            {assignedDoctors.map((doctor) => (
              <li key={doctor._id} style={{ marginBottom: '10px' }}>{doctor.name} <span className='btn btn-danger btn-sm' style={{ float: 'right' }} onClick={() => removeDoctorFromHospital(doctor._id)}>Remove</span></li>
            ))}
          </ul>
        </>
      )}
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default HospitalForm;