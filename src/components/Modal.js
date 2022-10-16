import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PinInput from 'react-pin-input';
import Modal from 'react-modal';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
// /users/register/confirm /users/confirm_forgot_password
  // JSON.parse(localStorage.getItem('changePasswordEmal'))
const ModalEmail = ({ openModal, email, setOpenModal, setHomeText }) => {
const CODE_URL_FORGOT = 'https://digitain-coffee-break.herokuapp.com/users/confirm_forgot_password';
const CODE_URL = 'https://digitain-coffee-break.herokuapp.com/users/register/confirm';
const emailForgot = localStorage.getItem('changePasswordEmal');
const navigate = useNavigate();


   const [code, setCode] = useState('')
   const onSubmit = async () => {
    try {
      const response = await axios.post(CODE_URL,
          JSON.stringify(
              { confirmNumber: code, email },
              ),
          {
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
              withCredentials: false
          }
      );
      if(response?.data === "OK"){
        setOpenModal(false)
        setHomeText('Sign In')
      }
  } catch (err) {
      console.log(err, 'eeeeee');
  }
   }

   const onSubmitForgot = async () => {
    try {
      const response = await axios.post(CODE_URL_FORGOT,
          JSON.stringify(
              { confirmNumber: code, email: emailForgot },
              ),
          {
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
              withCredentials: false
          }
      );
      if(response?.data === "OK"){
        setOpenModal(false)
        navigate("/newPassword", { replace: true });
        setHomeText('Sign In')
      }
  } catch (err) {

  }
   }
   
  return (
    <div>
    <Modal
      isOpen={openModal}
    //   onAfterOpen={afterOpenModal}
    //   onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <div style={{ position: 'absolute', right: 10, top: -15 }}>
      <button style={{backgroundColor: 'transparent', border: 0}} onClick={() => setOpenModal(false)}>X</button>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '10%'}}>
      <PinInput
        length={4}
        initialValue=""
        onChange={(value, index) => {setCode(value)}}
        type="numeric"
        inputMode="number"
        style={{padding: '10px'}}
        inputStyle={{borderColor: 'black'}}
        inputFocusStyle={{borderColor: 'blue'}}
        onComplete={(value, index) => {}}
        autoSelect={true}
        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
       <button onClick={!!emailForgot ? onSubmitForgot : onSubmit} style={{backgroundColor: 'white', borderRadius: 5, paddingLeft: 20, paddingRight: 20}}>Send</button> 
      </div>
    </Modal>
  </div>
  );
}

export default ModalEmail