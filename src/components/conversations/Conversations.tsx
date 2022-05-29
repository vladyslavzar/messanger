import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useConversations } from '../../contexts/ConversationsProvider';

interface iConversation {
    recipients: any[];
    messanges: any[];
    selected: boolean;
}

const Conversations: FC = () => {
    const { conversations, selectConversationIndex } = useConversations();
    
    return (
        <ListGroup variant="flush">
            {conversations.map((conversation: iConversation, index: number) => {
                return (
                    <ListGroup.Item
                    key={index}
                        action
                        onClick={() => selectConversationIndex(index)}
                        active={conversation.selected}
                        >
                        {conversation.recipients.map((r, i) => {
                            if (i === conversation.recipients.length - 1) return r.name

                            return `${r.name}, `
                        })}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    );
}

export default Conversations;
