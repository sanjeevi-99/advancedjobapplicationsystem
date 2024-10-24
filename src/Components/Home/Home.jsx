import React from 'react';
import JobSection from '../JobSection/JobSection';
import useTitle from '../hooks/useTitle';

const Home = () => {
    // console.log(category);
    useTitle('Home')
    
    return (
        <div className='pt-10 px-10'>
            <JobSection />
        </div>
    );
};

export default Home;