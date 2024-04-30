import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface Message {
  messageId: number;
  senderId: string;
  receiverId: string;
  message: string;
  isRead: boolean;
}

const ChatMessage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [receiverID, setReceiverID] = useState<string>('90');
  const [senderID, setSenderID] = useState<string>('');
  const [senderIDSet, setSenderIDSet] = useState<boolean>(false); // New state variable

  // Function to fetch old messages
  const fetchOldMessages = () => {
    socket.emit('fetch old message', { senderId: senderID, receiverId: receiverID });
    socket.on('old messages', (oldMessages: Message[]) => {
      setMessages(oldMessages);
    });
  };

  useEffect(() => {
    const getSenderID = localStorage.getItem('UserID');
    if (getSenderID) {
      setSenderID(getSenderID);
      setSenderIDSet(true); // Update senderIDSet when senderID is set
    }
  }, []);

  useEffect(() => {
    if (senderIDSet) { // Only fetch old messages when senderID is set
      fetchOldMessages();
    }
  }, [senderIDSet]);

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

  return (
    <div className="container mx-auto my-4">
      {/* Display chat messages */}
      {messages.map((msg, index) => (
        <div key={msg.messageId} className="bg-white rounded-md shadow-md p-4 m-2">
          {index === 0 || messages[index - 1].senderId !== msg.senderId ? (
            <p className="text-gray-800">{msg.senderId === senderID ? 'You' : 'Friend'}</p>
          ) : null}
          <p className="text-gray-800">{msg.message} {msg.receiverId}</p>
        </div>
      ))}



      {/* Form for sending new messages */}
      <form onSubmit={handleSubmit} className="mt-4 flex space-x-4">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div >
  );
};

export default ChatMessage;
