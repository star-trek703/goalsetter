import { Helmet } from 'react-helmet'

const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      
      <div className='container bg-white my-5 shadow p-5 rounded'>
        <h1 className='text-xl'>
          Contact us
        </h1>
      </div>
    </>
  )
}

export default ContactUs