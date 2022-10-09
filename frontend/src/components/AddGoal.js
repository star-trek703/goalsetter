import { useState, useRef, useEffect } from "react"
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { createGoal, reset } from "../features/goal/goalSlice"

const AddGoal = ({ showAddModal, setShowAddModal }) => {
  const [goalText, setGoalText] = useState('')
  const goalTextField = useRef()

  const { isError, isSuccess, message } = useSelector(state => state.goals)

  const dispatch = useDispatch()

  useEffect(() => {
    if (showAddModal) {
      goalTextField.current.focus()
    }
  }, [showAddModal])

  const onChange = (e) => {
    setGoalText(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createGoal({ text: goalText }))

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      setGoalText('')
      setShowAddModal(false)

      toast.success('Goal added successfully')
    }

    dispatch(reset())
  }

  return (
    <div className={ `fixed top-0 left-0 h-full w-full px-5 md:px-0 ${ showAddModal ? 'scale-100' : 'scale-0' }` }>
      <div className='fixed top-0 left-0 bg-gray-500 opacity-60 h-full w-full' onClick={ () => setShowAddModal(false) }></div>

      <div className={ `bg-white w-full sm:w-1/2 md:w-1/3 relative top-1/4 mx-auto p-5 rounded-md shadow-md transition-all ${ showAddModal ? 'scale-100' : 'scale-50' }` }>
        <div className='flex items-start justify-between pb-4'>
          <h1 className='text-2xl text-gray-700 font-semibold'>
            Add Goal
          </h1>
          <button className='text-xl text-gray-500 bg-transparent hover:bg-gray-200 focus:bg-gray-200 p-2 rounded-full outline-none' onClick={ () => setShowAddModal(false) }>
            <FaTimes />
          </button>
        </div>
        <div className=''>
          <form onSubmit={ onSubmit }>
            <div className='form-group'>
              <label className='form-label' htmlFor="text">Goal</label>
              <input ref={ goalTextField } className='form-control' type="text" name="text" id="text" placeholder="Enter Goal" value={ goalText } onChange={ onChange } />
            </div>
            <div className='form-group mt-7'>
              <button className='btn bg-gray-800 text-white'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddGoal