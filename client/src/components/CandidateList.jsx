import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFilters, useTable } from 'react-table';
import toast, { Toaster } from 'react-hot-toast';
import Loading from './Loading'
import { FaEdit } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CandidateList = () => {
  const navigate= useNavigate()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/candidates');
        console.log(response.data)
        setData(response.data.candidates);
      } catch (error) {
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: '',
        accessor: 'edit',
        Cell: ({ row }) => (
          <button onClick={()=>{navigate(`/detail/${row.original._id}`)}}
            className="text-blue-500 hover:text-blue-700"
          >
            <FaEdit />
          </button>
        ),
      },
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Surname',
        accessor: 'surname',
      },
      {
        Header: 'Contact Information',
        columns:[
            {
                Header:"Phone",
                accessor:"contactInformation.phone"

            },
            {
                Header:"Email",
                accessor:"contactInformation.email"
            }
        ]
    },
      {
        Header: 'Status',
        accessor: 'candidateStatus',
      },
      {
        Header: 'Interactions',
        accessor: 'interactions',
        Cell: ({ cell: { value } }) => (
          <div>
            {value.map((interaction, index) => (
              <div key={index}>
                <strong>Type:</strong> {interaction.type}, <strong>Content:</strong> {interaction.content}, <strong>Date:</strong> {interaction.date}, <strong>Responded:</strong> {interaction.candidate_responded ? 'Yes' : 'No'}
              </div>
            ))}
          </div>
        )
      }
    ],
    []
  );
  const [filterInput, setFilterInput] = useState("");

  const tableInstance = useTable({ columns, data },useFilters);
  
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = tableInstance;

  if (loading) {
    return( <div className='w-full h-full flex justify-center items-center'><Loading className="text-center" color='#010153' width='8' height='8'/></div>)
  }
  const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
  setFilterInput(value);
    
  };

  return (
    <div className="container mx-auto p-4 max-w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Candidates List</h1>
      <div id='search' className='mb-2 border-4 border-main w-1/4 flex gap-x-4'>
      <FaSearch className='text-2xl text-secondary'/>
      <input
    value={filterInput} onChange={handleFilterChange}placeholder={"Search name"} className='outline-none w-full'/>
      </div>
      <table {...getTableProps()} className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className="p-2  text-center">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="hover:bg-gray-100 border-4 border-main">
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className="p-2  border-main border-2">

                    
                    {cell.render('Cell')}
                    
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
};

export default CandidateList;
