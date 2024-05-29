import React, { useEffect, useState } from "react";
import Message from "./Message";
import NonMessage from "./NonMessage";
import HashLoader from "react-spinners/HashLoader";

interface ListChat {
    senderId: string;
    receiverId: string;
}

function SetMessage({ senderId, receiverId}: ListChat) {
    const [messagesLoaded, setMessagesLoaded] = useState(false);
    const [oldReceiver, setOldReceiver] = useState<string>('');

    useEffect(() => {
        if (receiverId !== oldReceiver) {
            setMessagesLoaded(false);
            setOldReceiver(receiverId);
        }
        const timeout = setTimeout(() => {
            setMessagesLoaded(true);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [receiverId]);

    if (senderId && receiverId ) {
        return (
            <>
                {messagesLoaded ? (
                    <Message
                        getSenderID={senderId}
                        getReceiverID={receiverId}
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
