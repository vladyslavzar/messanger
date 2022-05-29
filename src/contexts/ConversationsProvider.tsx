import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';
import { useSocket } from './SocketProvider';
import {io} from 'socket.io-client';

interface iConversation {
    recipients: any[];
    messages: any[];
}

interface iContact {
    id: string;
    name: string;
}

interface iConversationsContext {
    conversations: iConversation[];
    createConversation(id: string, name: string): void;
}

const ConversationsContext = React.createContext<iConversationsContext>({
    conversations: [{
        recipients: [{
            id: 'a',
            name: 'vlad'
        }],
        messages: []
    }],
    createConversation: () => {}
});

interface ConversationsProviderProps {
    id: string;
    children?: any;
    socket?: any
}

export const useConversations = (): any => {
    return useContext(ConversationsContext);
}

export const ConversationsProvider: FC<ConversationsProviderProps> = ({ id, children, socket}) => {
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState<number>(0);
    const { contacts } = useContacts();
    console.log(socket, 'socketsocket')

    const createConversation = (recipients: any): void => {
        setConversations((prevConversations: iConversation[]) => {
            return [...prevConversations, {recipients, messages: []}]
        })
    }

    const addMessageToConversation = useCallback(({recipients, text, sender}: {recipients: any, text: string, sender: string}): void => {
        setConversations((prevConversations: any) => {
            let madeChange: boolean = false;
            const newMessage: any = { sender, text }
            const newConversations = prevConversations.map((conversation: any) => {
                if (arrayEquality(conversation.recipients, recipients)) {
                    madeChange = true;
                    return {
                        ...conversation,
                        messages: [...conversation.messages, newMessage]
                    };
                }

                return conversation;
            })

            if (madeChange) {
                return newConversations;
            } else {
                return [
                    ...prevConversations,
                    {recipients, messages: [newMessage]}
                ]
            }
        })
    }, [setConversations])

    useEffect(() => {
        if(socket === null || socket === undefined ) return;
        console.log(socket, '----------------------');

        socket.on('recieve-message', addMessageToConversation);

        return () => socket.off('recieve-message')
    }, [socket, addMessageToConversation])

    const sendMessage = (recipients: any, text: string) => {
        console.log(recipients, 'recipients on send message');

        socket.emit('send-message', {recipients, text});

        addMessageToConversation({recipients, text, sender: id});
    }

    const formattedConversations = conversations.map((conversation: iConversation, index: number) => {
        console.log(conversations, 'conversations');
        const recipients = conversation.recipients.map((recipient: any) => {
            const contact = contacts.find((contact: iContact) => {
                return contact.id === recipient
            })
            const name = (contact && contact.name) || recipient;
            return {id: recipient, name};
        })

        const messages = conversation.messages.map((message: any) => {
            const contact = contacts.find((contact: iContact) => {
                return contact.id === message.sender
            })
            const name = (contact && contact.name) || message.sender;
            const fromMe = id === message.sender;
            return { ...message, senderNane: name, fromMe }     
        })

        const selected = index === selectedConversationIndex;
        return {...conversation, messages, recipients, selected};
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations[selectedConversationIndex],
        selectConversationIndex: setSelectedConversationIndex,
        createConversation,
        sendMessage
    }

    return (
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    );
}

const arrayEquality = (a: any, b: any) => {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((e: any, i: number) => {
        return e === b[i];
    })
}