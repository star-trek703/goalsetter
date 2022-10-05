import { Helmet } from 'react-helmet'

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      
      <div className='container bg-white my-5 shadow p-5 rounded'>
        <h1 className='text-xl'>
          About us
        </h1>
      </div>
    </>
  )
}

export default AboutUs