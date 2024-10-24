import React, { useEffect, useState } from 'react';
import { CurrencyDollarIcon, CalendarDaysIcon, PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid'
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useTitle from '../hooks/useTitle';

const JobDetails = () => {
    let id = {
        id: 2
    };
    console.log('iddddddd', id);

    useTitle("Job Details")

    // const notify = () => toast.success('Successfully Applied!');

    const [details, setDetails] = useState({});

    useEffect(() => {
        fetch('/company.json')
            .then(response => response.json())
            .then(data => {
                const all = data?.find(d => parseInt(d.id) === parseInt(id.id))
                setDetails(all)
            })
    }, [])


    const handleApplyBtn = (item) => {
        let newJob = {};
        let prevJob = JSON.parse(localStorage.getItem('jobs'));

        let searchedJob = prevJob?.find((data) => data.id == item.id);
        if (!searchedJob) {
            if (!prevJob) {
                newJob = [item];
                localStorage.setItem("jobs", JSON.stringify(newJob));
                toast.success('Successfully applied');
            } else {
                newJob = [...prevJob, item];
                localStorage.setItem("jobs", JSON.stringify(newJob));
                toast.success('Successfully applied');
            }
        } else {
            toast.error('Already applied');
        }
    }

    return (
        <div >
            <h4 className='text-5xl text-center bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent p-2 mb-8'>{details.company_name} - Job Details</h4>
            <div className='md:flex px-16 gap-6'>
                <div className="left w-11/12 text-lg">
                    <h4 className='tracking-wide'>
                        <span className='font-bold'>Job Description: </span>{details.job_description}</h4>
                    <h4 className='mt-4 tracking-wide'>
                        <span className='font-bold '>Job Responsibility:</span> {details.job_responsibility}
                    </h4>
                    <h4 className='font-bold mt-4 tracking-wide'>Educational Requirements:</h4>
                    <p className='tracking-wide'>{details.educational_requirements}</p>
                    <h4 className='my-4 tracking-wide'>
                        <span className='font-bold '>Experiences:</span> {details.experiences}
                    </h4>
                </div>
                <div className='md:w-2/4'>
                    <div className="right  rounded-xl border-4 p-4 leading-loose">
                        <h4 className='font-bold text-xl mb-2'>Job Details</h4>
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

                        <h4 className='font-bold text-xl mt-4 mb-2'>Contact Information</h4>
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
                    {/* <button onClick={() => handleApplyBtn(details)}
                        className='custom-btn w-full mt-4'>Apply Now
                    </button> */}
                    <Toaster />
                </div>
            </div>
        </div>
    );
};

export default JobDetails;