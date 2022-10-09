import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaGithubSquare, FaBars, FaTimes } from 'react-icons/fa'
import { logout, reset } from '../features/auth/authSlice'
import { reset as goalReset } from '../features/goal/goalSlice'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  
  const handleLogout = () => {
    dispatch(logout())
    dispatch(reset())
    dispatch(goalReset())
    navigate('/')
  }

  const handleHamburgerMenu = (e) => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className='bg-white h-18 shadow shadow-gray-200 py-5'>
      <div className='container flex items-center justify-between'>
        <Link className='text-2xl text-gray-900 font-semibold' to='/'>GoalSetter</Link>
        <nav className={ `bg-white absolute md:relative top-0 left-0 w-full md:w-auto mt-16 md:mt-0 md:ml-9 mx-auto pt-3 md:pt-0 shadow shadow-gray-200 md:shadow-none transition-all ${ isMenuOpen ? 'md:bloc translate-y-3 md:translate-y-0' : 'hidde md:bloc -translate-y-56 md:translate-y-0' }` }>
          <ul className='block md:flex'>
            <li>
              <Link className='menu-link' to='/'>Home</Link>
            </li>
            <li>
              <Link className='menu-link' to='/contact-us'>Contact Us</Link>
            </li>
            <li>
              <Link className='menu-link' to='/about-us'>About Us</Link>
            </li>
          </ul>
        </nav>
        <div className='flex'>
          <a className='text-3xl mr-1 md:mr-3 pt-0.5 rounded hover:opacity-90 transition-all' rel='noreferrer' href='https://github.com/star-trek703/goalsetter' target='_blank'>
            <FaGithubSquare />
          </a>

          { user ? (
            <>
              <button className='bg-gray-800 text-white text-lg px-5 py-1 rounded hover:opacity-90 transition-all' onClick={ () => handleLogout() }>Sign out</button>
            </>
          ) 
          : (
            <>
              <Link className='bg-gray-800 text-white text-lg px-5 py-1 rounded hidden md:block hover:opacity-90 transition-all' to='/signup'>Sign up</Link>
              <Link className='bg-gray-800 text-white text-lg px-5 py-1 rounded hover:opacity-90 transition-all ml-3' to='/signin'>Sign in</Link>
            </>
          ) }

          <button className='text-2xl text-gray-800 bg-white hover:bg-gray-800 hover:text-white border border-gray-800 px-2 rounded block md:hidden hover:opacity-90 transition-all ml-3' id="hamburger-menu" onClick={ () => handleHamburgerMenu() }>
            { isMenuOpen ? <FaTimes /> : <FaBars /> }
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header