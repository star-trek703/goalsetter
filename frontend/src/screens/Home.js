import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import AddGoal from '../components/AddGoal'
import SingleGoal from '../components/SingleGoal'
import { getGoals, reset } from '../features/goal/goalSlice'
import EditGoal from '../components/EditGoal'

const Home = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const { user } = useSelector((state) => state.auth)
  const { goals, isError, message } = useSelector((state) => state.goals)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/')
    }

    if (user) {
      dispatch(getGoals())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  const handleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleEdit = ({ id, text }) => {
    setShowEditModal(!showEditModal)
  }

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      
      <div className='container bg-white my-5 shadow p-3 rounded'>
        <h1 className='text-lg'>
          { user ? (
            <>
              Hi { user.name.includes(' ') ? user.name.split(' ')[0] : user.name }!
            </>
          ) : (
            <>Welcome!</>
          ) }
        </h1>
      </div>

      <div className='container sm:px-0 mb-5'>
        <div className='flex items-center justify-between mb-4'>
          <h1 className='text-gray-800 text-xl font-semibold'>
            My Goals
          </h1>
          
          { user ? (
            <button className='bg-gray-800 text-white text-lg flex items-center px-5 py-1 rounded hover:opacity-90 transition-all' onClick={ handleAddModal }>
              <FaPlus className='mr-1.5' /> Add
            </button>
          ) : '' }
        </div>

        { goals.length ? 
        (
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start'>
            {
              goals.map(goal => (
                <SingleGoal key={ goal._id } goal={ goal } handleEdit={ handleEdit } />
              ))
            }
          </div>
        ) : (
          <div className='bg-white shadow p-5 rounded'>No Goals</div>
        ) }
      </div>

      <AddGoal showAddModal={ showAddModal } setShowAddModal={ setShowAddModal } />
      <EditGoal showEditModal={ showEditModal } setShowEditModal={ setShowEditModal } />
    </>
  )
}

export default Home