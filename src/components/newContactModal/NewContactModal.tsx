import React, { FC, FormEvent, useRef } from 'react';
import {Modal, Form, Button} from 'react-bootstrap';
import {useContacts} from '../../contexts/ContactsProvider';

interface iModal {
    closeModal(): void
}

const NewContactModal:FC<iModal> = ({closeModal}) => {
    const idRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const {createContact} = useContacts();

    const submitHandler = (e: FormEvent): void => {
        e.preventDefault();

        createContact(idRef.current!.value, nameRef.current!.value);
        closeModal();
    }

    return (
        <>
            <Modal.Header closeButton>Create Contact</Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control type="text" ref={idRef} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" ref={nameRef} required />
                    </Form.Group>
                    <Button type='submit'>Create</Button>
                </Form>
            </Modal.Body>
        </>
    );
}

export default NewContactModal;
