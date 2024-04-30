import React, { useState } from "react";
import Message from "./Message";
import NonMessage from "./NonMessage";
import { ListProps } from "@material-tailwind/react";

interface ListChat {
    senderId: string;
    receiverId: string;
    message: string;
    listMessage: Messages[];
    userIDLogin: string;
}
interface Messages {
    messageId: number;
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
}

function SetMessage({ senderId, receiverId, listMessage, userIDLogin }: ListChat) {
    const [messages, setMessage] = useState<Messages[]>([]);

    if (senderId && receiverId && listMessage) {
        // console.log('receiverID', receiverId);
        return <Message getSenderID={senderId} getReceiverID={receiverId} listMessage={listMessage} userIDLogin={userIDLogin}/>;
    } else {

        return <NonMessage />;
    }
}

export default SetMessage;
