import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

 
  const getUsersTable = () => {
    axios.get(`http://localhost:3000/users/table`)
  .then(res => {
    const persons = res.data;
    setDat(persons)
    console.log(persons,'persons');
  })
  }
 useEffect(()=>{
  console.log(JSON.parse(localStorage.getItem('accessToken')));
  setInterval(()=> getUsersTable(), 1000)
 }, [])

 const config = {
  headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}` }
};

const bodyParameters = {
 key: "value"
};

 const exhort = async () => {
  axios.post( 
    'http://localhost:3000/users/dashboard/apply',
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

const confirm = () => {
  console.log("Confirm", 'Confirm');
  axios.post( 
    'http://localhost:3000/users/dashboard/approve',
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

const getCurrent = () => {
  console.log("Confirm", 'Confirm');
  axios.post( 
    'http://localhost:3000/users/current',
    bodyParameters,
    config
  )
  .then(res => {
    console.log(res.data, 'res.datares.data');
    if(res.data.user.userRoll === "ADMIN"){
      setIsAdmin(true)
      console.log('adminnnnnnn');
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
    'http://localhost:3000/users/dashboard/cancel',
    bodyParameters,
    config
  )
  .then(res => {
    console.log(res, 'resssss');
    if(res.data === 'OK') getUsersTable()   
  })
  .catch((err) => {
    console.log(err, 'rrttt');
  })
}
const logOut = () => {
  localStorage.removeItem('accessToken');
  window.onbeforeunload = function() { return "Your work will be lost."};
  navigate("/login");
}
const adminApply = async (email) => {
  try {
    const response = await axios.post('http://localhost:3000/users/dashboard/ready',
        JSON.stringify(
            {  email },
            ),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: false
        }
    );
    getUsersTable()
    console.log(JSON.stringify(response?.data));
    
} catch (err) {
    
  }
}

const [message, setMessage] = useState('');
const [isMessage, setIsMessage] = useState(true)

useEffect(()=>{
  console.log(message, 'message');
  if(!!message){
    setIsMessage(false)
    return
  }
  setIsMessage(true)
}, [message])

const sendMessage = () => {
  
  axios.post( 
    'http://localhost:3000/users/message',
    {
      message
     },
    config
  )
  .then(res => {
    if(res?.statusText === 'OK'){
      getUsersTable()
      setMessage('')
    }
  })
  .catch((err) => {
    console.log(err, 'rrttt');
  })
  console.log(message, 'message');
}
console.log('tableeeeeeeeeeeee');

  if(isLogin){
    return (
      <>
      <div style={{ position: 'absolute', top: 15, left: 15}}>
          <p>Message</p>
          <div>
          <textarea style={{resize: 'none'}} rows={4}
          cols={20} onChange={(e)=> setMessage(e.target.value)} ></textarea>
          </div>
        <button onClick={sendMessage} disabled={isMessage}>Send Message</button>

        </div>

      <div style={{ position: 'absolute', top: "10%", right: '15%'}}>
        {user?.data?.user?.breakTime === 0 ? 
           <button onClick={exhort} style={{borderWidth: 0.1, backgroundColor: 'red', borderRadius: 0, color: 'white', marginRight: 15}}>
           Extra
         </button>
        :
        <button onClick={exhort} style={{borderWidth: 0.1, backgroundColor: 'green', borderRadius: 0, color: 'white', marginRight: 15}}>
        Դիմել
      </button>
        }
       
        <button disabled={user?.data?.user?.state === 'WAITING'} onClick={confirm} style={{borderWidth: 0.1, backgroundColor: user?.data?.user?.state === 'WAITING' ? '#888C6B' : '#F7A91C', borderRadius: 0, color: 'white', marginRight: 15}}>
        Գնալ ընդմիջման
        </button>
        <button disabled={user?.data?.user?.state !== 'IN_BREAK'} onClick={confirm} style={{borderWidth: 0.1, backgroundColor: user?.data?.user?.state !== 'IN_BREAK' ? '#888C6B' : '#F7A91C', borderRadius: 0, color: 'white', marginRight: 15}}>
        Վերադառնալ ընդմիջումից
        </button>
        <button onClick={cancel} style={{borderWidth: 0.1, backgroundColor: 'red', borderRadius: 0, color: 'white'}}>
        Չեղարկել
        </button>
        
      </div>
      <div style={{position: 'absolute', right: 15, top: 5}}>
        <button onClick={logOut} style={{borderWidth: 0, cursor: 'pointer', marginLeft: 15, backgroundColor: '#d9cfcd', borderRadius: 0, color: 'white'}}>
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
        // highlightOnHover
        // provide data
        records={dat}
        // define columns
        columns={[
          // {
          //   accessor: 'name',
          //   // this column has a custom title
          //   // title: '#',
          //   // right-align column
          //   color: 'blue'
          //   // textAlignment: 'center',
          // },
          {
            accessor: 'nameSurname',
            render: ({ lastName, name }) => (
              <Text weight={700} style={ { padding: 10}} color={'black'}>
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
          
          // {
          //   accessor: 'email',
          //   render: ({ email }) => (
          //     <Text weight={700} style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 20, paddingRight: 20 }} color={'black'}>
          //       {email}
          //     </Text>
          //   ),
          // },
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
            {user?.data?.user?.id === user?.data?.messageId?.userId && message}
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
      // applyDate
        ]}
        onRowClick={({ email }) => {
          if(isAdmin){
            console.log('fsdfsdfsdfsdfsdfsd');
            adminApply(email)
          }
        } 
          // alert(`You clicked on ${name}, president born in ${email}.`)
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