import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

interface Message {
    messageId: number;
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
}

function Message() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [receiverID, setReceiverID] = useState<string>('90');
    const [senderID, setSenderID] = useState<string>("18");

    const fetchOldMessages = () => {
        socket.emit('fetch old message', { senderId: senderID, receiverId: receiverID });
        socket.on('old messages', (oldMessages: Message[]) => {
            setMessages(oldMessages);
        });
    };
    useEffect(() => {
        if (senderID) {
            fetchOldMessages();
        }
    }, [senderID]);

    useEffect(() => {
        // Listen for new messages from the server
        socket.on('new message', (newMessage: Message) => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });
        // Clean up event listener
        return () => {
            socket.off('new message');
        };
    }, []);

    const sendMessage = () => {
        if (senderID && receiverID && messageInput) {
            socket.emit('send message', { senderId: senderID, receiverId: receiverID, message: messageInput });
            setMessageInput('');
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (messageInput.trim() !== '') {
            sendMessage();
        }
    };


    const messageListRef = useRef<HTMLDivElement>(null);
    // Scroll to the bottom of the message list when component mounts or when new messages are added
    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className='relative flex flex-col w-full bg-black bg-opacity-85'>
            {/* profile */}
            <div className='h-16 bg-base-300 p-2 pl-8 '>
                <div className="flex items-center gap-3 cursor-pointer hover:opacity-60">
                    {/* avatar */}
                    <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-white pl-4">George bounthavong</div>
                    </div>
                </div>
            </div>

            {/* message */}
            <div className='flex flex-col overflow-y-auto h-full mb-14 px-4' ref={messageListRef}>
                {messages.map((msg, index) => (
                    <div key={msg.messageId} className="bg-white rounded-md shadow-md p-4 m-2">
                        {/* {index === 0 || messages[index - 1].senderId !== msg.senderId ? (
                        <p className="text-gray-800">{msg.senderId === senderID ? 'Friend' : 'You'}</p>
                    ) : null} */}
                        <p className="text-gray-800">{msg.message}</p>
                    </div>
                ))}
            </div>


            {/* floating button and input */}
            <form onSubmit={handleSubmit} className="h-12 mt-4 flex space-x-2 absolute bottom-2 left-2 right-2 mx-6">
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
            </form>
        </div>
    )
}

export default Message