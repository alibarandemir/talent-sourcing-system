import React from 'react'

import CandidateList from '../components/CandidateList'

function Candidates() {
  return (
    <div className='w-screen h-screen flex flex-col relative '>
      
      <div id='liste' className=' h-full flex'>
        <CandidateList/>
      </div>
    </div>
  );
}


export default Candidates