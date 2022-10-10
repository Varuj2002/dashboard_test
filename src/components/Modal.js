import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import PinInput from 'react-pin-input';
import Modal from 'react-modal';

const customStyles = {
    content: {
        with: "25%",
        height: "50%",
    //   top: '100%',
    //   left: '50%',
    //   right: 'auto',
    //   bottom: 'auto',
    //   marginRight: '-50%',
    //   transform: 'translate(-50%, -50%)',
    },
  };

const ModalEmail = ({ openModal, setOpenModal }) => {
   const [code, setCode] = useState('')
   const onSubmit = () => {
    console.log(code, "5555555");
   }
  return (
    <div>
    <button onClick={() => setOpenModal(true)}>Open Modal</button>
    <Modal
      isOpen={openModal}
    //   onAfterOpen={afterOpenModal}
    //   onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2> */}
      <div style={{ position: 'absolute', right: 10, top: -10 }}>
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
       <button onClick={onSubmit} style={{backgroundColor: 'white', borderRadius: 15, paddingLeft: 15, paddingRight: 15}}>Send</button> 
      </div>
    </Modal>
  </div>
  );
}

export default ModalEmail