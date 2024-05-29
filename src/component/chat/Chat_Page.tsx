import React, { useState, useEffect, useRef } from 'react';
import SetNavbar from '../navbar/SetNavbar'
import io from 'socket.io-client';
import SetMessage from './message/setMessage';
import { ThemeToggle, useTheme } from '../../theme/theme'
import MoonLoader from 'react-spinners/MoonLoader';
const socket = io('http://localhost:3001');

interface ListChatProps {
    senderId: string;
    receiverId: string;
    message: string;
    isRead: boolean;
    receiverInfo: UserInfoProps;
    senderInfo: UserInfoProps;
    type: string;
}

interface UserInfoProps {
    ID: number;
    Name: string;
    Title: string;
    Email: string;
    Tel: string;
    Profile_IMG: string;
}


interface Messages {
    messageId: number;
    senderId: string;
    receiverId: string;
    info: InfoProps
    message: string;
    isRead: boolean;
    receiverInfo: UserInfoProps;
    senderInfo: UserInfoProps;
    type: string;
    jobRequestID: number | null;
    jobInvitation: number | null;
    additionalData: CardProps
}


interface InfoProps {
    ID: number;
    UserID: number;
    Name: string;
    Title: string;
    AddressID: number;
    Tel: string;
    Profile_IMG: string;
    VillageName: string;
    DistrictName: string;
    ProvinceName: string,
    Email: string,
    Role: string
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
    OccupationID: number;
    Description: string,
    SalaryStart: number,
    SalaryMax: number,
    WorkType: string,
    OccupationName: string,
    CategoryName: string,
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
    const [sendName, setSendName] = useState<string>('');
    const [sendImg, setSendImg] = useState<string>('');
    const [sendOwnImg, setSendOwnImg] = useState<string>('');
    //  list message
    const [messages, setMessages] = useState<Messages[]>([]);
    const [userIDLogin, setUserLogin] = useState<string>('');
    //theme
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchChatList = async () => {
        socket.emit('fetch list user', { senderId: senderID });
        socket.on('Get ChatList', (chatlistuser: ListChatProps[]) => {
            // console.log(chatlistuser)
            setListChat(chatlistuser);
        });
    };
    useEffect(() => {
        const userID = localStorage.getItem('UserID');
        setIsLoading(true);
        if (userID) {
            setSenderID(userID);
            setSenderIDSet(true);
            setUserLogin(userID);

            const timeout = setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [senderID, userIDLogin]);


    useEffect(() => {
        if (senderIDSet) {
            fetchChatList();
        }
    }, [senderIDSet, messages]);

    const handleListChat = async (senderId: string, receiverId: string, message: string, img: string, name: string, ownImg: string) => {
        setSendSender(senderId)
        setSendMsg(message)
        setSendReceiver(receiverId)
        setSendCheck(true)
        setSendImg(img)
        setSendName(name)
        setSendOwnImg(ownImg)
        // fetchOldMessages()
        // const newUrl = `/Chat_Page/${receiverId}`;
        // window.history.pushState({ path: newUrl }, '', newUrl);
    };

    const fetchOldMessages = async () => {
        socket.emit('fetch old message', { senderId: sendSender, receiverId: sendReceiver });
        socket.on('old messages', (getMessages: Messages[]) => {
            setMessages(getMessages);
            // console.log("test", getMessages)
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
                        <div className='flex flex-col h-full max-h-full bg-base-200 shadow-xl'>
                            <div className='basis-full max-h-full snap-y overflow-y-scroll bg-base-200 bg-opacity-65 shadow-xl m-2'>
                                <div>
                                    <div className='bg-black bg-opacity-5 h-16 flex justify-center shadow-lg my-2'>
                                        <p className='text-xl font-bold self-center'>Message</p>
                                    </div>
                                </div>
                                <table className="table bg-base-200 rounded-lg 1">
                                    {/* list chat */}
                                    <tbody className=''>
                                        {isLoading ? (
                                            <div className='flex justify-center items-center w-full h-96 max-h-full bg-base-200 flex-col'>
                                                <MoonLoader
                                                    color="#36d7b7"
                                                    cssOverride={{}}
                                                    size={30}
                                                    speedMultiplier={0.8}
                                                />
                                                <p className='text-md'>Loading</p>
                                            </div>

                                        ) : (
                                            listChat.map((msg, index) => {
                                                const profile_img = msg.receiverId == userIDLogin ? msg.senderInfo.Profile_IMG : msg.receiverInfo.Profile_IMG;
                                                const receiverName = msg.receiverId == userIDLogin ? msg.senderInfo.Name : msg.receiverInfo.Name;
                                                const receiverID = msg.receiverId == userIDLogin ? msg.senderId : msg.receiverId;
                                                const own_img = msg.senderId == userIDLogin ? msg.senderInfo.Profile_IMG : msg.receiverInfo.Profile_IMG;

                                                return (
                                                    <tr key={index} onClick={() => handleListChat(msg.senderId, msg.receiverId, msg.message, profile_img, receiverName, own_img)}>
                                                        <td>
                                                            <div className="flex items-center gap-3 cursor-pointer hover:bg-base-100" >
                                                                {/* avatar */}
                                                                <div className="avatar">
                                                                    <div className="w-12 rounded-full ring-ghost ring-offset-base-100 ring-offset-0 ring-2">
                                                                        {(profile_img) ? (
                                                                            <img src={profile_img} alt="Avatar Profile" />
                                                                        ) : (
                                                                            <img src="/Icon/user.png" alt="PostJob" />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className="font-bold text-md"> {receiverName} (userID: {receiverID}) </div>
                                                                    <div className="text-sm opacity-50 break-words line-clamp-1">{msg.senderId == userIDLogin ? "You" : "Your friend"}:  {!msg.message ? "sent " + " " + msg.type + " " + " card" : msg.message}</div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}



                                    </tbody>

                                </table>

                            </div>
                        </div>
                    </div>

                    {/* chat right side*/}
                    <div className="basis-full h-full max-h-full bg-base-100 flex">
                        {/* right-side */}
                        {(sendCheck === true) ? (
                            <SetMessage userIDLogin={userIDLogin} senderId={sendSender} receiverId={sendReceiver} message={sendMsg} listMessage={messages} receiverName={sendName} receiverImg={sendImg} senderImg={sendOwnImg} />
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