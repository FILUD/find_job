import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

interface Messages {
    messageId: number;
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
}
interface UserParam {
    getSenderID: string;
    getReceiverID: string;
    listMessage: Messages[];
    userIDLogin: string;
}


function Message({ getSenderID, getReceiverID, listMessage, userIDLogin }: UserParam) {
    const [senderID, setSenderID] = useState<string>('');
    const [receiverID, setReceiverID] = useState<string>('');
    const [messages, setMessages] = useState<Messages[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');


    useEffect(() => {
        setMessages(listMessage)
        setSenderID(getSenderID)
        setReceiverID(getReceiverID)
        // scrollMessageList()
    }, [getSenderID, getReceiverID, listMessage]);


    useEffect(() => {
        scrollAfterTimeout()
    }, [getReceiverID])

    const sendMessage = () => {
        if (senderID && receiverID && messageInput && userIDLogin) {
            socket.emit('send message', { senderId: senderID == userIDLogin ? userIDLogin : userIDLogin, receiverId: receiverID == userIDLogin ? senderID : receiverID, message: messageInput });
            console.log('always get login user', senderID == userIDLogin ? userIDLogin : userIDLogin)
            console.log('always get receiver', receiverID == userIDLogin ? senderID : receiverID)
            setMessageInput('');
        }
    };

    const scrollAfterTimeout = () => {
        setTimeout(() => {
            if (messageListRef.current) {
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
        }, 500);
    };


    //scroll when send
    const messageListRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (messageInput.trim() !== '') {
            sendMessage();
            scrollAfterTimeout()
        }
    };

    // useEffect(() => {
    //     const scrollAfterTimeout = setTimeout(() => {
    //         if (messageListRef.current) {
    //             messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    //         }
    //     }, 3000); // 2 minutes

    //     return () => clearTimeout(scrollAfterTimeout);
    // }, [messages]);

    return (
        <div className='flex flex-col w-full h-full  max-h-full bg-base-100 '>
            {/* profile */}
            <div className='h-16 bg-base-300  pl-8 shadow-2xl '>
                <div className="flex    items-center gap-3 cursor-pointer hover:opacity-60 pt-2">
                    {/* avatar */}
                    <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold  pl-4">George bounthavong</div>
                    </div>
                </div>
            </div>

            {/* message */}
            <div className='flex flex-col overflow-y-auto max-h-full h-[32rem] px-6 ' ref={messageListRef}>
                {messages.map((msg, index) => (
                    <div key={msg.messageId}>
                        {msg.senderId == userIDLogin ? (
                            <div className="chat chat-end">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <div className="chat-bubble chat-bubble-info">{msg.message}</div>
                            </div>
                        ) : (
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                                <div className="chat-bubble chat-bubble-primary">{msg.message}</div>
                            </div>
                        )}
                    </div>

                ))}
            </div>
            {/* floating button and input */}
            < form onSubmit={handleSubmit} className="h-12  flex space-x-2  bottom-2 left-2 right-2 mx-6" >
                <div className='h-4'>
                    <kbd className="kbd kbd-lg btn-outline">/</kbd>
                </div>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 rounded-md rounded-l-2xl border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                    type="submit"
                    className=" btn w-36 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Send
                </button>
            </form >




        </div >
    )
}

export default Message