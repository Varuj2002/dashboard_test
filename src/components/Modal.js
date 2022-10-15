import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PinInput from 'react-pin-input';
import Modal from 'react-modal';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

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

  // JSON.parse(localStorage.getItem('changePasswordEmal'))
const ModalEmail = ({ openModal, email, setOpenModal, setHomeText }) => {
const CODE_URL = 'http://localhost:3000/users/register/confirm';


   const [code, setCode] = useState('')
   const onSubmit = async () => {
    console.log(code, "5555555");
    try {
      const response = await axios.post(CODE_URL,
          JSON.stringify(
              { confirmNumber: code, email },
              ),
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: false
          }
      );
      console.log(JSON.stringify(response?.data), 'response?.data');
      if(response?.data === "OK"){
        setOpenModal(false)
        setHomeText('Sign In')
        // <Link to={{
        //   pathname: "/table",
        // }}/>
      }
  } catch (err) {
    console.log(1651111);
    <Link to="/table" replace />
      console.log(err, 'eeeeee');
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
       <button onClick={onSubmit} style={{backgroundColor: 'white', borderRadius: 5, paddingLeft: 20, paddingRight: 20}}>Send</button> 
      </div>
    </Modal>
  </div>
  );
}

export default ModalEmail