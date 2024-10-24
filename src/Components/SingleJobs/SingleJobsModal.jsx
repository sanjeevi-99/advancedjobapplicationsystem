import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@material-ui/core/Button";
import { CurrencyDollarIcon, CalendarDaysIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'
// import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useTitle from '../hooks/useTitle';
import { useNavigate } from "react-router-dom";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const LoginModal = (props) => {
  // const [loginModalShow, setLoginModalShow] = useState(props.showModal);
  console.log(props);

  const id = { id: props.data };
  const navigate = useNavigate();

  console.log('props', props);


  useTitle("Job Details")

  // const notify = () => toast.success('Successfully Applied!');

  const [details, setDetails] = useState({});
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    fetch('/company.json')
      .then(response => response.json())
      .then(data => {
        const all = data?.find(d => parseInt(d.id) === parseInt(id.id))
        setDetails(all)
      })
  }, [])


  // const handleApplyBtn = (item) => {
  //   let newJob = {};
  //   let prevJob = JSON.parse(localStorage.getItem('jobs'));

  //   let searchedJob = prevJob?.find((data) => data.id == item.id);
  //   if (!searchedJob) {
  //     if (!prevJob) {
  //       newJob = [item];
  //       console.log(newJob);

  //       // localStorage.setItem("jobs", JSON.stringify(newJob));
  //       toast.success('Successfully applied');
  //     } else {
  //       newJob = [...prevJob, item];
  //       console.log(newJob);
  //       // localStorage.setItem("jobs", JSON.stringify(newJob));
  //       toast.success('Successfully applied');
  //     }
  //   } else {
  //     toast.error('Already applied');
  //   }
  // }

  const applyNow = async () => {
    navigate("/apply", { state: details });
  };

  console.log("PROPS in MODAL", details);
  console.log('showLogin', showLogin);

  return (
    <>
      <button className='custom-btn w-full' onClick={() => setShowLogin(!showLogin)}>View Details</button>
      <Modal isOpen={showLogin} toggle={() => setShowLogin(!showLogin)} size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <ModalHeader>
          Job Details
        </ModalHeader>
        <ModalBody>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'end' }}>
              <img src={details.company_logo} alt="logo" style={{ height: '100px', width: 'fit-content' }} />
              <h1 className='text-5xl text-center bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent p-2 mb-8'>{details.company_name} - Job Details</h1>
            </div>
            <div className='md:flex px-16 gap-6'>
              <div className="left w-11/12 text-lg">
                <h6 className='tracking-wide'>
                  <span className='font-bold'>Job Description: </span>{details.job_description}</h6>
                <h6 className='mt-4 tracking-wide'>
                  <span className='font-bold '>Job Responsibility:</span> {details.job_responsibility}
                </h6>
                <h3 className='font-bold mt-4 tracking-wide'>Educational Requirements:</h3>
                <p className='tracking-wide'>{details.educational_requirements}</p>
                <h5 className='my-4 tracking-wide'>
                  <span className='font-bold '>Experiences:</span> {details.salary}
                </h5>
              </div>
              <div className='md:w-2/4'>
                <div className="right  rounded-xl border-4 p-4 leading-loose" style={{ fontSize: '12px' }}>
                  <h1 className='font-bold text-xl mb-2'>Job Details</h1>
                  <hr />
                  <p className='flex mt-2 items-center'> <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className='font-bold ml-2 '>Salary: </span>
                      {details.salary}
                    </div>
                  </p>
                  <p className='flex mt-2 md:items-center' >
                    <CalendarDaysIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className='font-bold ml-2'>Job Title: </span>
                      {details.job_title}
                    </div>
                  </p>

                  <h1 className='font-bold text-xl mt-4 mb-2'>Contact Information</h1>
                  <hr />
                  <p className='flex mt-2 items-center'><PhoneIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className='font-bold ml-2'>Phone: </span>
                      {details.contact_information?.phone}
                    </div>
                  </p>
                  <p className='flex mt-2 items-center'><EnvelopeIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className='font-bold ml-2'>Email: </span>
                      {details.contact_information?.email}
                    </div>
                  </p>

                  <p className='flex mt-2 items-center'> <MapPinIcon className="h-6 w-6 text-blue-500" />
                    <div>
                      <span className='font-bold ml-2'>Address:  </span>
                      {details.location}
                    </div>
                  </p>
                </div>
                <button onClick={() => applyNow(details)}
                  className='custom-btn w-full mt-4'>Apply Now
                </button>
                <Toaster />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='custom-btn  btn-sm' onClick={() => setShowLogin(false)}>Close</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default LoginModal;
