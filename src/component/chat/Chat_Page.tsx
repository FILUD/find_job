import React, { useState, useEffect, useRef } from 'react';
import SetNavbar from '../navbar/SetNavbar'
import ChatMessage from './test/ChatMessage'
import io from 'socket.io-client';
import SetMessage from './message/setMessage';
import Message from './message/Message';
import { ThemeToggle, useTheme } from '../../theme/theme'
const socket = io('http://localhost:3001');

interface ListChatProps {
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
}

interface Messages {
    messageId: number;
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
}

function Chat_Page() {
    const [receiverID, setReceiverID] = useState<string>('');
    const [senderID, setSenderID] = useState<string>('');
    const [senderIDSet, setSenderIDSet] = useState<boolean>(false);
    const [listChat, setListChat] = useState<ListChatProps[]>([]);
    // send param
    const [sendSender, setSendSender] = useState<string>('');
    const [sendReceiver, setSendReceiver] = useState<string>('');
    const [sendMsg, setSendMsg] = useState<string>('');
    const [sendCheck, setSendCheck] = useState<boolean>(false);
    //  list message
    const [messages, setMessages] = useState<Messages[]>([]);
    const [userIDLogin, setUserLogin] = useState<string>('');
    //theme
    const { theme } = useTheme();

    const fetchChatList = async () => {
        socket.emit('fetch list user', { senderId: senderID });
        socket.on('Get ChatList', (chatlistuser: ListChatProps[]) => {
            setListChat(chatlistuser);
        });
    };

    useEffect(() => {
        const userID = localStorage.getItem('UserID');
        if (userID) {
            setSenderID(userID);
            setSenderIDSet(true);
            setUserLogin(userID);
        }
    }, [senderID, userIDLogin]);

    useEffect(() => {
        if (senderIDSet) {
            fetchChatList();
        }
    }, [senderIDSet, messages]);

    const handleListChat = async (senderId: string, receiverId: string, message: string) => {
        setSendSender(senderId)
        setSendMsg(message)
        setSendReceiver(receiverId)
        setSendCheck(true)
        // fetchOldMessages()
    };

    const fetchOldMessages = async () => {
        socket.emit('fetch old message', { senderId: sendSender, receiverId: sendReceiver });
        socket.on('old messages', (getMessages: Messages[]) => {
            setMessages(getMessages);
        });
    };

    useEffect(() => {
        if (sendSender && sendReceiver) {
            fetchOldMessages();
        }
    }, [sendSender, sendReceiver, messages]);




    return (
        <html data-theme={theme} >
            <div className='flex flex-col max-h-screen h-screen bg-base-100'>
                <div className='basis-1/12 top-0 right-0 left-0 '>
                    {/* Navbar */}
                    <SetNavbar />
                </div>

                {/* body */}
                <div className='basis-full max-h-full flex flex-row pt-2 shadow-xl'>
                    <div className="basis-2/4">
                        {/* left-side */}
                        <div className='flex flex-col h-full max-h-full bg-base-300 shadow-xl'>
                            <div className='basis-full max-h-full snap-y overflow-y-scroll bg-base-300 bg-opacity-65 shadow-xl m-2'>
                                <div>
                                    <div className='bg-base-300 h-16 flex justify-center shadow-lg my-2'>
                                        <p className='text-xl font-bold self-center'>Message</p>
                                    </div>
                                </div>
                                <table className="table bg-base-300 rounded-lg 1">
                                    {/* list chat */}
                                    <tbody className=''>
                                        {/* person1 */}
                                        {listChat.map((msg, index) => (
                                            <tr key={index} onClick={() => handleListChat(msg.senderId, msg.receiverId, msg.message)}>
                                                <td>
                                                    <div className="flex items-center gap-3 cursor-pointer hover:bg-base-100" >
                                                        {/* avatar */}
                                                        <div className="avatar">
                                                            <div className="mask mask-circle w-12 h-12">
                                                                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="Avatar Tailwind CSS Component" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-md">George bounthavong (userID: {msg.receiverId == userIDLogin ? msg.senderId : msg.receiverId}) </div>
                                                            <div className="text-sm opacity-50">{msg.senderId == userIDLogin ? "You" : "Your friend"}: {msg.message}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>

                    {/* chat right side*/}
                    <div className="basis-full h-full max-h-full bg-base-100 flex">
                        {/* right-side */}
                        {(sendCheck === true) ? (
                            <SetMessage userIDLogin={userIDLogin} senderId={sendSender} receiverId={sendReceiver} message={sendMsg} listMessage={messages} />
                        ) : (
                            <div className='relative flex flex-col w-full bg-base-300 bg-opacity-100 shadow-xl'>
                                <div className='flex justify-center flex-col place-content-center h-5/6 mt-12 '>
                                    <div className='self-center rounded-xl shadow-xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-12 h-12">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
                                        </svg>
                                    </div>
                                    <div className='text-center'>Your Message</div>
                                    <div className='text-xs text-center'>Send private messages to friend or other</div>
                                    <button className='btn btn-outline btn-info m-4 w-32 self-center rounded-2xl'>Send Message</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </html>
    )
}

export default Chat_Page