import './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
      <h1 className='mailTitle'>Save time, save money</h1>
      <span className='mailDesc'>Sign up and all best deals will be sent to you</span>
      <div className='mailInputContainer'>
        <input type='text' placeholder='Your Email ID'/>
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default MailList