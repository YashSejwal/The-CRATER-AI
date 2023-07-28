import React from 'react';
import './CallButton.css'

const CallButton = () => {
  // const handleCall = () => {
  //   const phoneNumber = 9999569456; // Replace with your desired phone number
  //   window.location.href = `tel:${phoneNumber}`;
  // };

  return (

    <div className='wrapperButton' >

    <button className='callBtn'>
      <a href="tel: 01127531683" className='sos'>SOS</a>
    </button>
    </div>
  );
};

export default CallButton;