import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from '../api/axios';



const getStyleForState = (state) => {
  if(state === 'WAITING'){
    return(
      {backgroundColor: '#888C6B', textAlign : 'center' , paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }
    )
  }
  if(state === 'READY'){
    return(
      {backgroundColor: '#FDDA0D', textAlign : 'center' , paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }
    )
  }
  if(state === 'IN_BREAK'){
    return(
      {backgroundColor: 'green', textAlign : 'center' , paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }
    )
  }
}

export default function TableBreak() {
  const navigate = useNavigate();
  const [dat, setDat] = useState([]);
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const isLogin = !!JSON.parse(localStorage.getItem('accessToken'));
  const [extraIsSuccess, setExtraIsSuccess] = useState(true);
 
  const getUsersTable = () => {
    axios.get(`https://digitain-coffee-break.herokuapp.com/users/table`)
  .then(res => {
    const persons = res.data;
    setDat(persons)
  })
  }
 useEffect(()=>{
  setInterval(()=>{
    getUsersTable()
    getCurrent()
  } , 1000)
 }, [])

 const config = {
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
};

const bodyParameters = {
 key: "value"
};

 const exhort = async () => {
  axios.post( 
    'https://digitain-coffee-break.herokuapp.com/users/dashboard/apply',
    bodyParameters,
    config
  )
  .then(res => {
    if(res.data === 'OK') getUsersTable()
  })
  .catch((err) => {
    console.log(err, 'errgetUsersTable');
  })
}

const confirmGoBreak = () => {
  axios.post( 
    'https://digitain-coffee-break.herokuapp.com/users/dashboard/go_break',
    bodyParameters,
    config
  )
  .then(res => {
    if(res.data === 'OK') getUsersTable()
  })
  .catch((err) => {
    console.log(err, 'confirmGoBreakErr');
  })
}

const confirmCancelBreak = () => {
  axios.post( 
    'https://digitain-coffee-break.herokuapp.com/users/dashboard/return_break',
    bodyParameters,
    config
  )
  .then(res => {
    if(res.data === 'OK') getUsersTable()
    cancel()
  })
  .catch((err) => {
    console.log(err, 'rrttt');
  })
}

const getCurrent = () => {
  axios.post( 
    'https://digitain-coffee-break.herokuapp.com/users/current',
    bodyParameters,
    config
  )
  .then(res => {
    if(res.data.user.userRoll === "ADMIN"){
      setIsAdmin(true)
    } ;
    setUser(res)
  })
  .catch((err) => {
    console.log(err, 'rrttt');
  })
}

useEffect(()=> {
  getCurrent();
}, [])

const cancel = () => {
  axios.post( 
    'https://digitain-coffee-break.herokuapp.com/users/dashboard/cancel',
    bodyParameters,
    config
  )
  .then(res => {
    if(res.data === 'OK') getUsersTable()   
  })
  .catch((err) => {
    console.log(err, 'rrttt');
  })
}
const logOut = () => {
  cancel();
  localStorage.removeItem('accessToken');
  window.onbeforeunload = function() { return "Your work will be lost."};
  navigate("/login");
}
const adminApply = async (email) => {
  try {
    const response = await axios.post('https://digitain-coffee-break.herokuapp.com/users/dashboard/ready',
        JSON.stringify(
            {  email },
            ),
        {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
            withCredentials: false
        }
    );
    getUsersTable()    
} catch (err) {
    
  }
}

const adminCancelReady = async (email) => {
  try {
    const response = await axios.post('https://digitain-coffee-break.herokuapp.com/users/dashboard/cancel_ready',
        JSON.stringify(
            {  email },
            ),
        {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Credentials': true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true },
            withCredentials: false
        }
    );
    getUsersTable()    
} catch (err) {
    
  }
}


const [message, setMessage] = useState('');
const [isMessage, setIsMessage] = useState(true)
const messageRef = useRef();

useEffect(()=>{
  if(!!message){
    setIsMessage(false)
    return
  }
  setIsMessage(true)
}, [message])

const sendMessage = () => {
  
  axios.post( 
    'https://digitain-coffee-break.herokuapp.com/users/message',
    {
      message
     },
    config
  )
  .then(res => {
    if(res?.statusText === 'OK'){
      getUsersTable()
      setExtraIsSuccess(false)
      setMessage('')
      messageRef.current.value = ''
    }
  })
  .catch((err) => {
    console.log(err, 'rrttt');
  })
}
const  exhortDisabled = user?.data?.user?.state !== null;
const cancelBreakDisabled = user?.data?.user?.state !== 'IN_BREAK';
const cancelBreakDis = user?.data?.user?.state !== 'WAITING';

const goBreakDisabled = user?.data?.user?.state === 'WAITING' || user?.data?.user?.state === null || user?.data?.user?.state === 'IN_BREAK'
const inBreak = () => {}
  const isAdminOrYourMessage = user?.data?.user?.id === user?.data?.messageId?.userId || isAdmin
  if(isLogin){
    return (
      <>
      {!isAdmin && <div style={{ position: 'absolute', top: 15, left: 15}}>
          <p>Message</p>
          <div>
          <textarea ref={messageRef} style={{resize: 'none'}} rows={4}
          cols={20} onChange={(e)=> setMessage(e.target.value)} ></textarea>
          </div>
        <button onClick={sendMessage} disabled={isMessage}>Send Message</button>

        </div>}
      {!isAdmin && <div style={{ position: 'absolute', top: "10%", right: '15%'}}>
        {user?.data?.user?.breakTime <= 0 ? 
           <button disabled={extraIsSuccess} onClick={exhort} style={{borderWidth: 0.1, backgroundColor: extraIsSuccess ? '#c7c7c2' : 'green', borderRadius: 0, color: 'white', marginRight: 15}}>
           Extra
         </button>
        :
        <button disabled={exhortDisabled} onClick={exhort} style={{borderWidth: 0.1, backgroundColor: exhortDisabled ? '#c7c7c2' : 'green', borderRadius: 0, color: 'white', marginRight: 15}}>
        Դիմել
      </button>
        }
       
        <button disabled={goBreakDisabled} onClick={confirmGoBreak} style={{borderWidth: 0.1, backgroundColor:  goBreakDisabled ? '#c7c7c2' : '#F7A91C', borderRadius: 0, color: 'white', marginRight: 15}}>
        Գնալ ընդմիջման
        </button>
        <button disabled={cancelBreakDisabled} onClick={confirmCancelBreak} style={{borderWidth: 0.1, backgroundColor: cancelBreakDisabled ? '#c7c7c2' : '#F7A91C', borderRadius: 0, color: 'white', marginRight: 15}}>
        Վերադառնալ ընդմիջումից
        </button>
        <button disabled={cancelBreakDis} onClick={cancel} style={{borderWidth: 0.1, backgroundColor: cancelBreakDis ? '#c7c7c2' : 'red', borderRadius: 0, color: 'white'}}>
        Չեղարկել
        </button>
        
      </div>
      }
      <div style={{position: 'absolute', right: 15, top: 5}}>
        <button onClick={logOut} style={{borderWidth: 0, cursor: 'pointer', marginLeft: 15, backgroundColor: '#FDDA0D', borderRadius: 25, color: 'white'}}>
          Log Out
        </button>
        </div>
      <DataTable
        withBorder
        style={{
          width: '70%'
        }}
        borderRadius="sm"
        withColumnBorders
        striped
        records={dat}
        columns={[
          {
            accessor: 'nameSurname',
            render: ({ lastName, name, jobType }) => (
              <Text weight={700} style={ { padding: 10}} color={jobType === 'CALL' ? 'blue' : '#955c23'}>
                {name[0].toUpperCase() + name.slice(1)} {lastName  && lastName[0].toUpperCase() + lastName.slice(1)}
              </Text>
            ),
          },
          {
            accessor: 'status',
            render: ({ state }) => (
              <Text weight={700} style={getStyleForState(state)} color={'white'}>
                {state}
              </Text>
            ),
          },
          { accessor: 'time',
          render: ({ breakTime }) => (
            <Text weight={700} color={breakTime < 25 ? 'red' : 'green'}>
              {breakTime} minute
            </Text>
          ),
        },
        { accessor: 'message',
        render: ({ message }) => (
          <Text weight={700}>
            {isAdmin && message} 
          </Text>
        ),
        },
        { accessor: 'applyDate',
          render: ({ applyDate }) => (
            <Text weight={700}>
              {applyDate}
            </Text>
          ),
        },
        { accessor: 'breakDate',
          render: ({ inBreakDate }) => (
            <Text weight={700}>
              {inBreakDate}
            </Text>
          ),
        },
        ]}
        onRowClick={({ email, state }) => {
          if(isAdmin){
            if(state === 'WAITING'){
            adminApply(email)
            }
            if(state === 'READY'){        
              adminCancelReady(email)
            }
            if(state === 'IN_BREAK'){
              inBreak()
            }
          }
        } 
        }
      />
      </>
  );

  }
  
  return(
    <>
       <div style={{ display: 'flex', justifyContent: 'space-between'}}>
        <p>You are not authorized user</p>
      </div>
    </>
  )
      
    
}