import { useState } from 'react'
import { FaTrash, FaPen } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { deleteGoal, reset } from '../features/goal/goalSlice'

const SingleGoal = ({ goal, handleEdit }) => {
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteGoal(id))
    dispatch(reset())
  }

  return (
    <div className='bg-white shadow py-3 pr-3 pl-5 rounded'>
      <div className='flex items-start justify-between'>
        <p className='text-lg font-semibold w-auto'>{ goal.text }</p>
        <div className='-ml-7'>
          <button className='rounded bg-transparent hover:bg-gray-200 focus:bg-gray-200 p-1 transition-all outline-none' onClick={ () => handleEdit(goal) }>
            <FaPen />
          </button>
          <button className='rounded bg-transparent hover:bg-gray-200 focus:bg-gray-200 ml-1 p-1 transition-all outline-none' onClick={ () => handleDelete(goal._id) }>
            <FaTrash />
          </button>
        </div>
      </div>

      <div className='mt-1'>
        { new Date(goal.updatedAt).toLocaleDateString('en-IN') }
      </div>
    </div>
  )
}

export default SingleGoal