import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useContacts } from '../../contexts/ContactsProvider';

interface iContact {
    id: string;
    name: string;
}

const Contacts: FC = () => {
    const { contacts } = useContacts();

    return (
        <ListGroup variant="flush">
            {contacts.map((contact: iContact) => (
                <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>
            ))}
        </ListGroup>
    );
}

export default Contacts;
