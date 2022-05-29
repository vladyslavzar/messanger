import React, { FC, useContext, useEffect, useState } from 'react';
import {io} from 'socket.io-client';

interface ISocketContext {
    socket: any;
    emit: any;
    on: any;
    off: any;
}


const SocketContext = React.createContext<ISocketContext>({socket: null, emit: null, on: null, off: null});

export const useSocket = () => {
    return useContext(SocketContext);
}

interface ISocketProvider {
    id: any;
    children: any;
}

export const SocketProvider: FC<ISocketProvider> = ({id, children}) => {
    const [socket, setSocket] = useState<any>();

    useEffect(():any => {
        // const newSocket = io('http://localhost:5000', 
        //     {query: {id}}
        // )
        // console.log(io, 'io');
        // newSocket.on('connect', () => {
        //     console.log(newSocket, 'socket export')
        //     setSocket(newSocket);;
        // });
        // console.log(newSocket, 'socket false =(');
        

        // return () => newSocket.close();
    }, [id])

   

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}


