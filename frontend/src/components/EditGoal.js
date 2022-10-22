import { useState, useRef, useEffect } from "react"
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux"
import { reset, updateGoal } from "../features/goal/goalSlice"

const EditGoal = ({ showEditModal, setShowEditModal, editData }) => {
  const [goalId, setGoalId] = useState('')
  const [goalText, setGoalText] = useState('')
  const goalTextField = useRef()

  const { isError, isSuccess, message } = useSelector(state => state.goals)

  const dispatch = useDispatch()

  useEffect(() => {
    if (showEditModal) {
      goalTextField.current.focus()
    }

    setGoalId(editData.id)
    setGoalText(editData.text)
  }, [showEditModal, editData])

  const onChange = (e) => {
    setGoalText(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateGoal({ id: goalId, text: goalText }))

    if (isError) {
      toast.error(message)
    }

    if (isSuccess) {
      setGoalText('')
      setShowEditModal(false)

      toast.success('Goal updated successfully')
    }

    dispatch(reset())
  }

  return (
    <div className={ `fixed top-0 left-0 h-full w-full px-5 md:px-0 ${ showEditModal ? 'scale-100' : 'scale-0' }` }>
      <div className='fixed top-0 left-0 bg-gray-500 opacity-60 h-full w-full' onClick={ () => setShowEditModal(false) }></div>

      <div className={ `bg-white w-full sm:w-1/2 md:w-1/3 relative top-1/4 mx-auto p-5 rounded-md shadow-md transition-all ${ showEditModal ? 'scale-100' : 'scale-50' }` }>
        <div className='flex items-start justify-between pb-4'>
          <h1 className='text-2xl text-gray-700 font-semibold'>
            Edit Goal
          </h1>
          <button className='text-xl text-gray-500 bg-transparent hover:bg-gray-200 focus:bg-gray-200 p-2 rounded-full outline-none' onClick={ () => setShowEditModal(false) }>
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
              <input type="hidden" name="id" value={ goalId } />
              <button className='btn bg-gray-800 text-white'>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditGoal