import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { register } from '../features/auth/authSlice'

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    // dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Confirm password doesn\'t match with password')
    } else {
      const userData = { name, email, password }

      dispatch(register(userData))
    }
  }

  if (isLoading) {
    // toast.loading('Creating an account...')
  }

  return (
    <>
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      
      <div className='container my-7'>
        <div className='xs:w-full sm:w-2/3 md:w-2/5 lg:w-1/3 mx-auto'>
          <div className='bg-white shadow p-5 rounded-md'>
            <div className='text-center pt-4 pb-7'>
              <h1 className='text-3xl text-gray-900 font-semibold'>
                Sign up
              </h1>
              <p className='text-xl text-gray-600 pt-2'>Create an account</p>
            </div>
            <div className=''>
              <form onSubmit={ onSubmit }>
                <div className='form-group'>
                  <label className='form-label' htmlFor="name">Name</label>
                  <input className='form-control' type="text" name="name" id="name" placeholder="Enter your Name" value={ name } onChange={ onChange } />
                </div>
                <div className='form-group mt-3'>
                  <label className='form-label' htmlFor="email">Email</label>
                  <input className='form-control' type="email" name="email" id="email" placeholder="Enter your Email" value={ email } onChange={ onChange } />
                </div>
                <div className='form-group mt-3'>
                  <label className='form-label' htmlFor="password">Password</label>
                  <input className='form-control' type="password" name="password" id="password" placeholder="Enter your Password" value={ password } onChange={ onChange } />
                </div>
                <div className='form-group mt-3'>
                  <label className='form-label' htmlFor="confirm_password">Confirm Password</label>
                  <input className='form-control' type="password" name="password2" id="confirm_password" placeholder="Confirm Password" value={ password2 } onChange={ onChange } />
                </div>
                <div className='form-group mt-7'>
                  <button className='btn bg-gray-800 text-white'>Sign up</button>
                </div>
              </form>
            </div>
          </div>

          <div className='text-gray-700 text-center mt-3'>
            Already have an account? 
            <Link className='font-semibold ml-1' to='/signin'>
              sign in
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp