import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import { MdDelete } from "react-icons/md";

const schema = Yup.object().shape({
  name: Yup.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at least 50 characters").required('Name is required'),
  surname: Yup.string().min(2, "Surname must be at least 2 characters").max(50, "Surname must be at least 50 characters").required('Surname is required'),
  contactInformation: Yup.object().shape({
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email').required('Email is required')
  }),
  candidateStatus: Yup.string().required('Candidate status is required'),
  interactions: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required('Type is required'),
      content: Yup.string().required('Content is required'),
      date: Yup.date().required('Date is required'),
      candidateResponded: Yup.boolean().required('Candidate responded is required')
    })
  )
});

const candidateStatuses = ['sourced', 'interviewing', 'offersent', 'hired'];
const interactionTypes = ['phone', 'mail'];

function Form() {
  const { id } = useParams();
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { register, control, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'interactions'
  });

  useEffect(() => {
    if (location.pathname !== '/createCandidate') {
      setIsEditingPage(true);
      fetchCandidateData();
    }
  }, []);

  const fetchCandidateData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8000/detail/${id}`);
      const candidate = response.data.candidate;

      const initialData = {
        name: candidate.name,
        surname: candidate.surname,
        contactInformation: {
          phone: candidate.contactInformation.phone,
          email: candidate.contactInformation.email
        },
        candidateStatus: candidate.candidateStatus,
        interactions: candidate.interactions
      };
      setInitialValues(initialData);

      Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
    } catch (error) {
      toast.error('Error fetching candidate data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
        console.log(data)
      setLoading(true);
      if (isEditingPage) {
        const response = await axios.put(`http://localhost:8000/detail/${id}`, data);
        console.log(response.data)
        toast.success(response.data.message);
      } else {
        const response = await axios.post('http://localhost:8000/candidates', data);
        toast.success(response.data.message);
        navigate("/candidates");
      }
    } catch (error) {
        console.error('Error submitting form:', error);
      //toast.error('Error submitting form');
    } finally {
      setLoading(false);
    }
  };
  const handleDelete=async()=>{
    try{
      setLoading(true)
      const response= await axios.delete(`http://localhost:8000/detail/${id}`)
      toast.success(response.data.message)
    }
    catch(e){

    }
    finally{
      setLoading(false)
      navigate('/candidates')
    }
  }
  const handleCancel = () => {
    reset(initialValues);
    setIsEdited(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto my-8">
      <div onClick={handleDelete} className='float-right relative bg-red-600 rounded p-3 text-center cursor-pointer'>
      <MdDelete className='text-white text-xl' />
      </div>
      <div className="mb-4 ">
        <label className="block mb-2 text-xl text-main font-bold">Name</label>
        <input {...register('name')} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-2 text-xl font-bold text-main">Surname</label>
        <input {...register('surname')} disabled={isEditingPage ? !isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
        {errors.surname && <p className="text-red-500">{errors.surname.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-xl font-bold text-main">Phone</label>
        <input {...register('contactInformation.phone')} disabled={isEditingPage? !isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
        {errors.contactInformation?.phone && <p className="text-red-500">{errors.contactInformation.phone.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-xl font-bold text-main">Email</label>
        <input {...register('contactInformation.email')} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
        {errors.contactInformation?.email && <p className="text-red-500">{errors.contactInformation.email.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-xl font-bold text-main">Candidate Status</label>
        <select {...register('candidateStatus')} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md">
          {candidateStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {errors.candidateStatus && <p className="text-red-500">{errors.candidateStatus.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-xl font-bold text-main">Interactions</label>
        {fields.map((item, index) => (
          <div key={item.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <div className="mb-2">
              <label className="block mb-1 text-xl font-bold text-main">Type</label>
              <select {...register(`interactions.${index}.type`)} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md">
                {interactionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.interactions?.[index]?.type && <p className="text-red-500">{errors.interactions[index].type.message}</p>}
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-xl font-bold text-main">Content</label>
              <input {...register(`interactions.${index}.content`)} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
              {errors.interactions?.[index]?.content && <p className="text-red-500">{errors.interactions[index].content.message}</p>}
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-xl font-bold text-main">Date</label>
              <input type="date" {...register(`interactions.${index}.date`)} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
              {errors.interactions?.[index]?.date && <p className="text-red-500">{errors.interactions[index].date.message}</p>}
            </div>

            <div className="mb-2">
              <label className="block mb-1 text-xl font-bold text-main">Candidate Responded</label>
              <input type="checkbox" {...register(`interactions.${index}.candidateResponded`)} disabled={isEditingPage?!isEdited:false} className="border border-gray-300 px-3 py-2 w-full rounded-md" />
              {errors.interactions?.[index]?.candidateResponded && <p className="text-red-500">{errors.interactions[index].candidateResponded.message}</p>}
            </div>

            {isEdited && <button type="button" onClick={() => remove(index)} className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md">Remove Interaction</button>}
          </div>
        ))}
        {isEdited && <button type="button" onClick={() => append({ type: '', content: '', date: '', candidateResponded: false })} className="bg-secondary text-white px-4 py-2 rounded-md">Add Interaction</button>}
      </div>
      
      <div className="flex justify-center items-center">
        {!isEditingPage && <button type="submit" className="bg-main text-white text-xl font-bold px-6 py-4 rounded-md mr-3">
          {loading ? <Loading /> : "Create"}
        </button>}
        
        {isEditingPage && <button disabled={isEditingPage?!isEdited:false} type="submit" className={`bg-main ${!isEdited ? "opacity-70" : ""} text-white text-xl font-bold px-6 py-4 rounded-md mr-3`}>
          {loading ? <Loading /> : "Save Changes"}
        </button>}
        
        {isEditingPage && <button onClick={() => {
          if (isEdited) {
            handleCancel();
          } else {
            setIsEdited(true);
          }
        }} className="z-50 bg-gray-500 text-black text-xl font-bold px-6 py-4 rounded-md">
          {isEdited ? "Cancel" : "Edit"}
        </button>}
      </div>
    </form>
  )
}

export default Form;
