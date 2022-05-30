import React, { ChangeEvent, FC, FormEvent, useRef, useState, useEffect, useCallback } from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import { useConversations } from '../../contexts/ConversationsProvider';

const OpenConversation: FC = () => {
    const [text, setText] = useState('');
    const lastMessageRef = useRef<HTMLDivElement>();
    const setRef = useCallback(
        (node: any) => {
            if(node) {
                node.scrollIntoView();
            }
        },
        [],
    )
    const {sendMessage, selectedConversation} = useConversations();

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();

        const recipientsForm = selectedConversation.recipients.map((r: any) => r.id);

        console.log(recipientsForm, 'dada');

        sendMessage(selectedConversation.recipients.map((r: any) => r.id), text);
        setText('');
    }



    return (
        <div className="d-flex flex-column flex-grow-1" style={{marginLeft: '250px'}} >
            <div className="flex-grow-1 overflow-auto" style={{overflow: 'auto'}}>
                <div className=" d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message: any, i: number) => {
                        const lastMessage = selectedConversation.messages.length -1 === i;
                        return (
                            <div className={`my-1 d-flex flex-column ${message.fromMe ? 'align-self-end align-items-end' : 'align-self-start align-items-start'}`} ref={lastMessage ? setRef : null} key={i}>
                                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderNane}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                            style={{height: '75px', resize: 'none', margin: '10px 0px 10px 10px'}}
                        />
                        <div className="input-group-append">
                            <Button type="submit" style={{height: '75px', resize: 'none', margin: '10px 10px 10px 0px'}}>Send</Button>
                        </div>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    )
}

export default OpenConversation;
