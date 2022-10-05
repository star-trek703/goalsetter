import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { login } from '../features/auth/authSlice'

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

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

    const userData = { email, password }

    dispatch(login(userData))
  }
  
  if (isLoading) {
    // toast.loading('Signing into account...')
  }

  return (
    <>
      <Helmet>
        <title>Sign in</title>
      </Helmet>
      
      <div className='container my-7'>
        <div className='xs:w-full sm:w-2/3 md:w-2/5 lg:w-1/3 mx-auto'>
          <div className='bg-white shadow p-5 rounded-md'>
            <div className='text-center pt-4 pb-7'>
              <h1 className='text-3xl text-gray-900 font-semibold'>
                Sign in
              </h1>
              <p className='text-xl text-gray-600 pt-2'>Log into your account</p>
            </div>
            <div className=''>
              <form onSubmit={ onSubmit }>
                <div className='form-group'>
                  <label className='form-label' htmlFor="email">Email</label>
                  <input className='form-control' type="email" name="email" id="email" placeholder="Enter your Email" value={ email } onChange={ onChange } />
                </div>
                <div className='form-group mt-3'>
                  <label className='form-label' htmlFor="password">Password</label>
                  <input className='form-control' type="password" name="password" id="password" placeholder="Enter your Password" value={ password } onChange={ onChange } />
                </div>
                <div className='form-group mt-7'>
                  <button className='btn bg-gray-800 text-white'>Sign in</button>
                </div>
              </form>
            </div>
          </div>

          <div className='text-gray-700 text-center mt-3'>
            Don't have an account? 
            <Link className='font-semibold ml-1' to='/signup'>
              sign up
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn