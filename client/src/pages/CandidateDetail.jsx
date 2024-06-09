import React from 'react'
import { useParams } from 'react-router-dom';
import Form from '../components/Form';


function CandidateDetail() {
  const {id}= useParams();
  return (
    <div className='w-screen h-screen'>
      <Form/>

    </div>
  )
}

export default CandidateDetail