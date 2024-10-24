import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
// import SingleJobs from '../SingleJobs/SingleJobs';
import LoginModal from '../SingleJobs/SingleJobsModal';

const JobSection = () => {
    const [jobs, setJobs] = useState([]);
    const [seeAll, setAll] = useState(false);
    // const [showLogin, setShowLogin] = useState(false);

    const [columns,] = useState(['S.No', 'Company Name', 'Job title', 'Location', 'Work Site', 'Salary', 'Action']);

    useEffect(() => {
        axios
            .get(`/company.json`)
            .then((res) => {
                console.log(res);
                seeAll ? setJobs(res.data) : setJobs(res.data.slice(0, 4));
            })
            .catch((err) => {
                console.log(err);
            });
    }, [seeAll]);

    // console.log("jobssssssss", jobs);


    return (
        <div className='text-center my-6'>
            <h1 className='text-5xl custom-text p-4'>Featured Jobs </h1>
            <p className='text-lg my-4'>Explore thousands of job opportunities with all the information you need. Its your future</p>
            {/* <div className="grid md:grid-cols-2 gap-4 md:w-3/4 mx-auto"> */}
            {/* featured job card */}
            {
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            {columns.map((row) => {
                                return <th style={{ padding: '1.5rem' }}>{row}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((row) => {
                            return (
                                <tr key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.company_name}</td>
                                    <td>{row.job_title}</td>
                                    <td>{row.location}</td>
                                    <td>{row.remote_or_onsite}</td>
                                    <td>{row.salary}</td>
                                    <td>
                                        <LoginModal data={row.id} />

                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            }
            {/* </div> */}
            {
                seeAll ?
                    // seeAll === true ?
                    <button onClick={() => setAll(!seeAll)} className='custom-btn mt-6'>Show Less</button>
                    : <button onClick={() => setAll(!seeAll)} className='custom-btn mt-6'>Show All</button>
            }
        </div>
    );
};

export default JobSection;