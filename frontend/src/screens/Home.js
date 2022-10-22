import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FaPlus } from 'react-icons/fa'
import { ImSpinner8 } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import AddGoal from '../components/AddGoal'
import SingleGoal from '../components/SingleGoal'
import { getGoals, reset } from '../features/goal/goalSlice'
import EditGoal from '../components/EditGoal'

const Home = () => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  
  const [editData, setEditData] = useState({
    id: '',
    text: ''
  })

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getGoals())
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  const handleAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const handleEdit = ({ _id, text }) => {
    setEditData(prevState => {
      return {
        ...prevState,
        id: _id, 
        text: text
      };
    })
    
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

        { isLoading ? (
          <div className='bg-white shadow p-5 rounded'>
            {/* Loading... */}
            <ImSpinner8 className='animate-spin text-gray-900 text-3xl mx-auto' />
          </div>
        ) : 
        goals.length ? 
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
      <EditGoal showEditModal={ showEditModal } setShowEditModal={ setShowEditModal } editData={ editData } />
    </>
  )
}

export default Home