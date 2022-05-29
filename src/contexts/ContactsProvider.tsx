import React, { FC, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface iContact {
    id: string;
    name: string;
}


interface iContactsContext {
    contacts: iContact[];
    createContact(id: string, name: string): void;
}

const ContactsContext = React.createContext<iContactsContext>({
    contacts: [{
        id: '',
        name: ''
    }],
    createContact: () => {}
});


interface ContactsProviderProps {
    children?: any
}

export const useContacts = (): any => {
    return useContext(ContactsContext);
}

export const ContactsProvider: FC<ContactsProviderProps> = ({children}) => {
    const [contacts, setContacts] = useLocalStorage('contacts', []);

    const createContact = (id: string, name: string): void => {
        setContacts((prevContacts: iContact[]) => {
            return [...prevContacts, {id,name}]
        })
    }

    return (
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    );
}

