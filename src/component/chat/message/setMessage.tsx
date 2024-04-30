import React, { useState } from "react";
import Message from "./Message";
import NonMessage from "./NonMessage";
import { ListProps } from "@material-tailwind/react";

interface ListChat {
    senderId: string;
    receiverId: string;
    message: string;
}

function SetMessage({ senderId, receiverId, message }: ListChat) {
    // const [messages, setMessage] = useState<string>(message);
    // const [receiverID, setReceiverID] = useState<string>(receiverId);
    // const [senderID, setSenderID] = useState<string>(senderId);

    if (senderId && receiverId && message) {
        // console.log('set', senderId);
        // console.log('set', receiverId);
        // console.log('set', message);
        return <Message />;
    } else {
    
        return <NonMessage />;
    }
}

export default SetMessage;
