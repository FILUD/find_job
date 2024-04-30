// ChatMessage.tsx

import React from 'react';

interface ChatMessageProps {
  username: string;
  time: string;
  messages: string[];
  sender: string; // New prop to indicate the sender of the message
  status?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ username, time, messages, sender, status }) => {
  return (
    <div className={`chat ${status === 'end' ? 'chat-end' : 'chat-start'}`}>
      {/* <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Avatar" src={sender === l ? 'path_to_sender_avatar' : 'path_to_receiver_avatar'} />
        </div>
      </div> */}
      <div className="chat-header">
        {sender === username ? 'You' : sender}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      {messages.map((msg, index) => (
        <div key={index} className={`chat-bubble ${sender === username ? 'sender' : 'receiver'}`}>{msg}</div>
      ))}
      <div className="chat-footer opacity-50">
        {status === 'end' ? `Seen at ${time}` : 'Delivered'}
      </div>
    </div>
  );
};

export default ChatMessage;
