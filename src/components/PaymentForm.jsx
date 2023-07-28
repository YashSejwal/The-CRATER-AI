import React, { useState } from 'react';
import stripe from './Stripe';
import credit2 from "../assets/creditcard.png"
const PaymentForm = () => {
  const [cardDetails, setCardDetails] = useState({
    nameOnCard: '',
    cardNumber: '',
    expDate: '',
    cvc: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pin: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Remove any spaces from the current value
    const sanitizedValue = value.replace(/\s/g, '');
  
    // Split the sanitized value into groups of four digits
    const groups = sanitizedValue.match(/.{1,4}/g);
  
    // Join the groups with spaces
    const formattedValue = groups ? groups.join(' ') : '';
  
    setCardDetails(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };

  const handleInputChangeCard = (event) => {
    const { name, value } = event.target;

    // Remove any spaces from the current value
    const sanitizedValue = value.replace(/\s/g, '');
  
    // Split the sanitized value into groups of four digits
    const groups = sanitizedValue.match(/.{1,4}/g);
  
    // Join the groups with spaces
    const formattedValue = groups ? groups.join(' ') : '';
  
    setCardDetails(prevState => ({
      ...prevState,
      [name]: formattedValue
    }));
  };

  const formatExpDate = (value) => {
    let formattedValue = value.replace(/\D/g, '').slice(0, 4);
    if (formattedValue.length > 2) {
      formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2)}`;
    }
    return formattedValue;
  };

  const handleExpDateChange = (event) => {
    const { value } = event.target;
    const formattedValue = formatExpDate(value);
    setCardDetails((prevDetails) => ({ ...prevDetails, expDate: formattedValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Create a payment method or charge the customer using Stripe API
    try {
      const { error } = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          name: cardDetails.nameOnCard,
          number: cardDetails.cardNumber,
          exp_month: cardDetails.expDate.slice(0, 2),
          exp_year: cardDetails.expDate.slice(3),
          cvc: cardDetails.cvc,
          address_line1: cardDetails.addressLine1,
          address_line2: cardDetails.addressLine2,
          address_city: cardDetails.city,
          address_state: cardDetails.state,
          address_pin: cardDetails.pin,
        },
      });
      if (error) {
        console.log('Payment failed:', error.message);
      } else {
        console.log('Payment successful!');
        // Handle success scenario here
      }
    } catch (error) {
      console.log('Payment error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto'}}>
      
        {/* Payment Details */}
      <div style={{ marginBottom: '10px' }}>
      <img src={credit2} style={{width:"525px",height:"280px",marginLeft:"10px",display:"flex",transform:"translate(-350px,280px)" }}/>
        <div style={{ border: '10px solid #aeaeb0', borderRadius: '24px', padding: '10px', maxWidth: '600px',transform:"translate(250px,-20px)" }}>
        <label style={{ display: 'flex',flexDirection:"row", marginBottom: '5px', color:"white" }}>Card Holder's Name</label>

         <input
            type="text"
            name="nameOnCard"
            placeholder="Card Holder's Name"
            style={{ width: '100%', border: 'none', outline: 'none',fontSize:"24px",textAlign:"center", }}
            value={cardDetails.nameOnCard}
            onChange={handleInputChange}
          />
          <label style={{ display: 'flex',flexDirection:"row", marginBottom: '5px', color:"white" }}>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            style={{ width: '100%', border: 'none', outline: 'none', fontSize:"24px",textAlign:"center",}}
            value={cardDetails.cardNumber}
            onChange={handleInputChangeCard}
            maxLength={"19"}
          />
        <label style={{ display: 'flex',flexDirection:"row", marginBottom: '5px', color:"white" }}>Expiration Details</label>
        <div className='exp-cvc' style={{display:"flex"}}>       
          <input
            type="text"
            name="expDate"
            placeholder="MM/YY"
            style={{ width: '100%', border: 'none', outline: 'none',maxWidth:"125px",fontSize:"24px",textAlign:"center",marginRight:"254px", }}
            value={cardDetails.expDate}
            onChange={handleExpDateChange}
          />
         <label style={{  marginBottom: '5px', color:"white",transform:"translate(30px,-28px)"  }}>CVC</label>
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            style={{ width: '100%', border: 'none', outline: 'none',maxWidth:"70px",textAlign:"center",fontSize:"24px"}}
            value={cardDetails.cvc}
            onChange={handleInputChange}
            maxLength={"3"}
          />
                  

          </div>
           </div>
      </div>
      {/* Billing Details */}
      <div style={{ marginBottom: '10px',transform:"translate(-310px,0px)" }}>
       
        <div style={{ border: '5px solid #aeaeb0', borderRadius: '0px', padding:"20px 10px"  }}>
        <label style={{ display: 'flex',flexDirection:"row", marginBottom: '5px',color:"whitesmoke" }}>Billing Address</label>
        <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" name="sameAsShipping" id="sameAsShipping" style={{ marginRight: '5px' }} />
          <label htmlFor="sameAsShipping" style={{ marginBottom: '0', color:"whitesmoke" }}>Same as Shipping Address</label>
        </div>
          <input
            type="text"
            name="addressLine1"
            placeholder="Address Line 1"
            style={{ width: '100%', border: 'none', outline: 'none',marginTop: '13px',backgroundColor:"#bffbff" }}
            value={cardDetails.addressLine1}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="addressLine2"
            placeholder="Address Line 2"
            style={{ width: '100%', border: 'none', outline: 'none', marginTop: '10px' }}
            value={cardDetails.addressLine2}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            style={{ width: '100%', border: 'none', outline: 'none', marginTop: '10px' }}
            value={cardDetails.city}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            style={{ width: '100%', border: 'none', outline: 'none', marginTop: '10px' }}
            value={cardDetails.state}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="pin"
            placeholder="Pin Code"
            style={{ width: '100%', border: 'none', outline: 'none', marginTop: '10px' }}
            value={cardDetails.pin}
            onChange={handleInputChange}
            maxLength={"6"}
          />
        </div>
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          background: '#5469d4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          transform:"translate(-310px,0px)"
        }}
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;