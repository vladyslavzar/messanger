import React, { FC, useMemo, useState } from 'react';
import { Tab, Nav, Button, Modal } from 'react-bootstrap';
import Conversations from '../conversations/Conversations';
import Contacts from '../contacts/Contacts';
import NewConversationModal from '../newConversationModal/NewConversationModal';
import NewContactModal from '../newContactModal/NewContactModal'

interface SideBarProps{
    id: string
}

const conversationsKey: string = "conversations";
const contactsKey: string = "contacts";

const SideBar: FC<SideBarProps> = ({id}) => {
    const [activeKey, setActiveKey] = useState<any>('conversations');
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const closeModal = (): void => {
        setModalOpen(false);
    }

    const conversationsOpen = activeKey === conversationsKey;

    return (
        <div style={{width: '250px', position:'fixed'}} className="d-flex flex-column h-100">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={conversationsKey}>Conversations</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={contactsKey}>Contacts</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className="border-right overflow-auto flex-grow-1" style={{
                        borderRight: '1px #dee2e6 solid',
                    }}>
                    <Tab.Pane eventKey={conversationsKey}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={contactsKey}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className='p-2 border-top border-right small' style={{
                        borderRight: '1px #dee2e6 solid',
                    }}>
                    Your ID: <span className="text-muted">{id}</span>
                </div>
                <Button onClick={() => setModalOpen(true)} className='rounded-0'>
                    New {conversationsOpen ? 'Conversation' : 'Contact'}
                </Button>
            </Tab.Container>
            <Modal show={modalOpen} onHide={closeModal}>
                {conversationsOpen ?
                    <NewConversationModal closeModal={closeModal}/> :
                    <NewContactModal closeModal={closeModal}/>
                }
            </Modal>
        </div>
    );
}

export default SideBar;
