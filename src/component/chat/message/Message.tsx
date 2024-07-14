import React, { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client';
import Card_JobRequest from './card_message_show/Card_JobRequest';
import Card_JobInvitation from './card_message_show/Card_JobInvitation';
import MoonLoader from 'react-spinners/MoonLoader';
const socket = io('http://localhost:3001');

interface Messages {
    messageId: number;
    senderId: string;
    receiverId: string;
    info: InfoProps;
    message: string;
    isRead: boolean;
    type: string;
    jobRequestID: number | null,
    jobInvitation: number | null,
    additionalData: CardProps
}
interface UserParam {
    getSenderID: string;
    getReceiverID: string;
    listMessage: Messages[];
    userIDLogin: string;
    receiverName: string;
    receieverImg: string;
    senderImg: string;
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

function Message({ getSenderID, getReceiverID, listMessage, userIDLogin, receieverImg, receiverName, senderImg }: UserParam) {
    const [senderID, setSenderID] = useState<string>('');
    const [receiverID, setReceiverID] = useState<string>('');
    const [messages, setMessages] = useState<Messages[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const [profile_img, setProfile_img] = useState<string>('');
    const [profile_name, setProfile_name] = useState<string>('');
    const [profile_ownImg, setProfile_ownImg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setMessages(listMessage)
        setSenderID(getSenderID)
        setReceiverID(getReceiverID)
        setProfile_img(receieverImg)
        setProfile_name(receiverName)
        setProfile_ownImg(senderImg)
        // console.log("get or not",listMessage)
        
    }, [getSenderID, getReceiverID, listMessage, receieverImg, receiverName, senderImg]);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            scrollAfterTimeout();
            setIsLoading(false);
        }, 2000);
    }, [getReceiverID]);

    const sendMessage = () => {
        if (senderID && receiverID && messageInput && userIDLogin) {
            socket.emit('send message', { senderId: senderID == userIDLogin ? userIDLogin : userIDLogin, receiverId: receiverID == userIDLogin ? senderID : receiverID, message: messageInput });
            // console.log('always get login user', senderID == userIDLogin ? userIDLogin : userIDLogin)
            // console.log('always get receiver', receiverID == userIDLogin ? senderID : receiverID)
            setMessageInput('');
            scrollAfterTimeout();
        }

    };

    const scrollAfterTimeout = () => {
        setTimeout(() => {
            if (messageListRef.current) {
                messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
            }
        }, 2000);
    };


    //scroll when send
    const messageListRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (messageInput.trim() !== '') {
            sendMessage();
            scrollAfterTimeout();
        }
    };


    const [messagesLoaded, setMessagesLoaded] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setMessagesLoaded(true);
        }, 2000);
    }, []);



    return (
        <div className='flex flex-col w-full h-full  max-h-full bg-base-100 '>
            {/* profile */}
            <div className='h-16 bg-primary rounded-t-xl  pl-8 shadow-2xl '>
                <div className="flex  items-center gap-3 cursor-pointer hover:opacity-60 pt-2">
                    {/* avatar */}
                    <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                            {(profile_img) ?
                                (
                                    <img src={profile_img} alt="profile Img" />
                                )
                                :
                                (
                                    <img src="/Icon/user.png" alt="PostJob" />
                                )}

                        </div>
                    </div>
                    <div>
                        <div className="font-semibold pl-4  text-lg">{profile_name}</div>
                    </div>
                </div>
            </div>

            {/* message */}

            <div className='flex flex-col overflow-y-auto max-h-full h-[32rem] px-6 ' ref={messageListRef}>
                {isLoading ?
                    (
                        <div className='flex justify-center items-center w-full'>
                            <MoonLoader
                                color="#36d7b7"
                                cssOverride={{}}
                                size={30}
                                speedMultiplier={0.8}
                            />
                        </div>
                    ) : (
                        <div>
                            {messages.map((msg, index) => (
                                <div key={msg.messageId}>
                                    {msg.senderId == userIDLogin ? (
                                        // my side 
                                        <div className="chat chat-end">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full ring-ghost ring-offset-base-100 ring-offset-0 ring-2">
                                                    {(profile_ownImg) ?
                                                        (
                                                            <img src={profile_ownImg} alt="profile Img" />
                                                        )
                                                        :
                                                        (
                                                            <img src="/Icon/user.png" alt="PostJob" />
                                                        )}
                                                </div>
                                            </div>
                                            {/* message */}
                                            {msg.type == "textmessage" ? (
                                                <div className="chat-bubble chat-bubble-info max-w-80 break-words">{msg.message}</div>
                                            ) : (
                                                // card jobrequest or invitation
                                                <div className=' chat-bubble chat-bubble-info max-w-96 w-full'>
                                                    {msg.type == "jobrequest" ? (
                                                        <Card_JobRequest data={msg.additionalData} type={"jobseeker"} info={msg.info} />
                                                    ) : (
                                                        //TODO: create card Job Invitation
                                                        <Card_JobInvitation data={msg.additionalData} type={"employer"} info={msg.info} />
                                                    )}

                                                </div>

                                            )}

                                        </div>
                                    ) : (
                                        // opponent side
                                        <div className="chat chat-start">
                                            <div className="chat-image avatar">
                                                <div className="w-10 rounded-full ring-slate-400 ring-offset-base-100 ring-offset-0 ring-2">
                                                    {(profile_img) ?
                                                        (
                                                            <img src={profile_img} alt="profile Img" />
                                                        )
                                                        :
                                                        (
                                                            <img src="/Icon/user.png" alt="PostJob" />
                                                        )}
                                                </div>
                                            </div>
                                            {/* message */}
                                            {msg.type == "textmessage" ? (
                                                <div className="chat-bubble chat-bubble-info max-w-80 break-words">{msg.message}</div>
                                            ) : (
                                                // card jobrequest or invitation
                                                <div className=' chat-bubble chat-bubble-info max-w-96 w-full'>
                                                    {msg.type == "jobrequest" ? (
                                                        <Card_JobRequest data={msg.additionalData} type={"employer"} info={msg.info} />
                                                    ) : (
                                                        //TODO: create card Job Invitation
                                                        <Card_JobInvitation data={msg.additionalData} type={"jobseeker"} info={msg.info} />
                                                    )}

                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                            ))}
                        </div>
                    )}

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
                    ສົ່ງ
                </button>
            </form >




        </div >
    )
}

export default Message