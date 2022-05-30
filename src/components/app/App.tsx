import React, { FC, useEffect, useState } from 'react';
import Login from '../login/Login';
import useLocalStorage from '../../hooks/useLocalStorage';
import Dashboard from '../dashboard/Dashboard';
import { ContactsProvider } from '../../contexts/ContactsProvider';
import { ConversationsProvider } from '../../contexts/ConversationsProvider';
import {io} from 'socket.io-client';


const App:FC = () => {
  const [id, setId] = useLocalStorage('id');
  const [socket, setSocket] = useState<any>();

  useEffect(():any => {
      const newSocket = io('https://mysterious-depths-86557.herokuapp.com/', 
          {query: {id}}
      )
      setSocket(newSocket);
  }, [id])


  const dashboard = (
    <ContactsProvider>
      <ConversationsProvider id={id} socket={socket}>
        <Dashboard id={id}/> 
      </ConversationsProvider>
    </ContactsProvider>
  )

  return (
    <>
      {id ? dashboard : <Login onIdSubmit={setId}/>}
    </>
  );
}

export default App;
