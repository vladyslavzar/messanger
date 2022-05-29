import React, { FC, FormEvent, useRef, useState } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useContacts} from '../../contexts/ContactsProvider';
import {useConversations} from '../../contexts/ConversationsProvider';


interface iModal {
    closeModal(): void
}

interface iContact {
    id: any;
    name: string;
}

const NewConversationModal:FC<iModal> = ({closeModal}) => {
    const [selectedContactIds, setSelectedContactIds] = useState<iContact[]>([]);
    const {contacts} = useContacts();
    const {createConversation} = useConversations();

    const submitHandler = (e: FormEvent): void => {
        e.preventDefault();

        createConversation(selectedContactIds);
        closeModal();
    }

    const changeHandler = (contactId: string): void => {
        setSelectedContactIds((prevSelectedContactIds: any[]): any[] => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter((prevId) => {
                    return contactId === prevId
                })
            } else {
                return [...prevSelectedContactIds, contactId]
            }
        })
    }

   

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    {contacts.map((contact: iContact) => {
                            console.log(contact, 'contact');
                            return (
                                <Form.Group controlId={contact.id} key={contact.id}>
                                    <Form.Check
                                        type="checkbox"
                                        checked={selectedContactIds.includes(contact.id)}
                                        onChange={() => changeHandler(contact.id)}
                                        label={contact.name}
                                    />
                                </Form.Group>
                            )
                        }
                    )}
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewConversationModal;
