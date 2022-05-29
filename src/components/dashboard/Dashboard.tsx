import React, { FC } from 'react';
import SideBar from '../sideBar/SideBar';
import OpenConversation from '../openConversation/OpenConversation';
import {useConversations} from '../../contexts/ConversationsProvider'

interface DashboardProps{
    id: string
}

const Dashboard: FC<DashboardProps> = ({id}) => {
    const {selectedConversation} = useConversations();
    console.log(selectedConversation, "selectedConversation");

    return (
        <div className='d-flex' style={{ height: '100vh'}}>
            <SideBar id={id}/>
            {selectedConversation && <OpenConversation />}
        </div>
    )
}

export default Dashboard;