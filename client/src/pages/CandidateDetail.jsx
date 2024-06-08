import React from 'react'
import { useParams } from 'react-router-dom';
import Formm from '../components/Form';


function CandidateDetail() {
  const {id}= useParams();
  return (
    <div className='w-screen h-screen'>
      <Formm/>

    </div>
  )
}

export default CandidateDetail