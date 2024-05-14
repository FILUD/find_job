import React, { useEffect, useState } from "react";
import  Message from "./Message";
import NonMessage from "./NonMessage";
import HashLoader from "react-spinners/HashLoader";

interface ListChat {
    senderId: string;
    receiverId: string;
    message: string;
    listMessage: Messages[];
    userIDLogin: string;
    receiverName: string;
    receiverImg: string;
    senderImg: string;
}

interface CardProps {
    CardID: number;
    JobseekerID: number;
    EmployerID: number;
    JobID: number;
    ID: number;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
    IMG_Card: string;
    Title: string;
    OccupationID: string;
    Description: string,
    SalaryStart: string,
    SalaryMax: string,
    WorkType: string
}

interface Messages {
    messageId: number;
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
    type: string;
    jobRequestID: number | null,
    jobInvitation: number | null,
    additionalData: CardProps
}

function SetMessage({ senderId, receiverId, listMessage, userIDLogin, receiverImg, receiverName, senderImg }: ListChat) {
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [oldReceiverName, setOldReceiverName] = useState<string>('');

    useEffect(() => {
        if (receiverName !== oldReceiverName) {
            setMessagesLoaded(false);
            setOldReceiverName(receiverName);
        }
        const timeout = setTimeout(() => {
            setMessagesLoaded(true);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [receiverName]);

    if (senderId && receiverId && listMessage) {
        return (
            <>
                {messagesLoaded ? (
                    <Message
                        getSenderID={senderId}
                        getReceiverID={receiverId}
                        listMessage={listMessage}
                        userIDLogin={userIDLogin}
                        receiverName={receiverName}
                        receieverImg={receiverImg}
                        senderImg={senderImg}
                    />
                ) : (
                    <div className="flex w-full h-full max-h-screen justify-center items-center flex-col bg-base-300">
                        <HashLoader color="#36d7b7" loading={!messagesLoaded} size={50} />
                        <p className="text-xl font-semibold">Loading</p>
                    </div>
                )}
            </>
        );
    } else {
        return <NonMessage />;
    }
}

export default SetMessage;
